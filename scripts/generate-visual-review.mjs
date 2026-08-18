import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright-core';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '..');
const reviewDirectory = path.join(projectDirectory, 'visual-review');
const screenshotsDirectory = path.join(reviewDirectory, 'screenshots');
const svgDirectory = path.join(reviewDirectory, 'svg');
const viewport = { width: 390, height: 844 };
const captures = [];

function findBrowserExecutable() {
  const configured = process.env.VISUAL_REVIEW_BROWSER;
  const platformCandidates = process.platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        ]
      : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'];
  const executable = [configured, ...platformCandidates].filter(Boolean).find(existsSync);
  if (!executable) throw new Error('No supported Chrome or Edge browser was found. Set VISUAL_REVIEW_BROWSER to the browser executable path.');
  return executable;
}

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url, serverProcess, serverLog) {
  const deadline = Date.now() + 90000;
  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) throw new Error(`Expo stopped before it became ready.\n${serverLog()}`);
    try {
      await new Promise((resolve, reject) => {
        const request = http.get(url, response => {
          response.resume();
          response.statusCode === 200 ? resolve() : reject(new Error(`HTTP ${response.statusCode}`));
        });
        request.on('error', reject);
        request.setTimeout(1500, () => request.destroy(new Error('timeout')));
      });
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timed out waiting for Expo.\n${serverLog()}`);
}

async function prepareOutput() {
  await mkdir(screenshotsDirectory, { recursive: true });
  await mkdir(svgDirectory, { recursive: true });
  for (const name of await readdir(screenshotsDirectory)) {
    if (name.endsWith('.png')) await rm(path.join(screenshotsDirectory, name));
  }
  for (const name of await readdir(svgDirectory)) {
    if (name.endsWith('.svg')) await rm(path.join(svgDirectory, name));
  }
}

function htmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

async function imageDataUrl(filePath) {
  return `data:image/png;base64,${(await readFile(filePath)).toString('base64')}`;
}

function pngDimensions(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') !== signature || buffer.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Visual review screenshot is not a valid PNG.');
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function buildSvgArtifacts() {
  const items = await Promise.all(captures.map(async capture => {
    const png = await readFile(capture.path);
    return {
      ...capture,
      ...pngDimensions(png),
      dataUrl: `data:image/png;base64,${png.toString('base64')}`,
      svgFile: capture.file.replace(/\.png$/i, '.svg'),
    };
  }));

  for (const item of items) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${item.width}" height="${item.height}" viewBox="0 0 ${item.width} ${item.height}" role="img" aria-labelledby="title description">
  <title id="title">${htmlEscape(item.label)}</title>
  <desc id="description">Actual Bonus Human prototype state: ${htmlEscape(item.section)} - ${htmlEscape(item.label)}. Rendered at ${item.width} by ${item.height} pixels.</desc>
  <image width="${item.width}" height="${item.height}" preserveAspectRatio="none" href="${item.dataUrl}" />
</svg>
`;
    await writeFile(path.join(svgDirectory, item.svgFile), svg, 'utf8');
  }

  const columns = 4;
  const tileWidth = 420;
  const tilePadding = 18;
  const imageWidth = 360;
  const imageHeight = Math.round(imageWidth * viewport.height / viewport.width);
  const headingHeight = 82;
  const tileHeight = headingHeight + imageHeight + 2 * tilePadding;
  const rows = Math.ceil(items.length / columns);
  const boardWidth = columns * tileWidth + 56;
  const boardHeaderHeight = 150;
  const boardHeight = boardHeaderHeight + rows * tileHeight + 42;
  const tiles = items.map((item, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = 28 + column * tileWidth;
    const y = boardHeaderHeight + row * tileHeight;
    const imageX = x + (tileWidth - imageWidth) / 2;
    const imageY = y + headingHeight;
    return `
  <g>
    <rect x="${x}" y="${y}" width="${tileWidth - 18}" height="${tileHeight - 18}" rx="22" fill="#ffffff" stroke="#ddd8cf" />
    <text x="${x + 18}" y="${y + 27}" fill="#c86f52" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.2">${htmlEscape(item.section.toUpperCase())}</text>
    <text x="${x + 18}" y="${y + 53}" fill="#27332d" font-family="Arial, sans-serif" font-size="17" font-weight="700">${htmlEscape(item.label)}</text>
    <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" preserveAspectRatio="none" href="${item.dataUrl}" />
  </g>`;
  }).join('');
  const contactSheet = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${boardWidth}" height="${boardHeight}" viewBox="0 0 ${boardWidth} ${boardHeight}" role="img" aria-labelledby="title description">
  <title id="title">Bonus Human visual review contact sheet</title>
  <desc id="description">${items.length} actual Expo prototype states shown in user-flow order.</desc>
  <rect width="100%" height="100%" fill="#eee9e1" />
  <rect width="100%" height="122" fill="#fbf8f2" />
  <text x="38" y="55" fill="#27332d" font-family="Arial, sans-serif" font-size="36" font-weight="700">Bonus Human - Visual Review</text>
  <text x="38" y="88" fill="#667169" font-family="Arial, sans-serif" font-size="16">Actual Expo prototype states at ${viewport.width} x ${viewport.height} CSS pixels</text>${tiles}
</svg>
`;
  await writeFile(path.join(reviewDirectory, 'bonus-human-contact-sheet.svg'), contactSheet, 'utf8');
  return items;
}

async function buildReviewArtifacts(browser) {
  const svgItems = await buildSvgArtifacts();
  const items = await Promise.all(captures.map(async capture => ({ ...capture, dataUrl: await imageDataUrl(capture.path) })));
  const generatedAt = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  const board = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 1 });
  const tileMarkup = items.map(item => `
    <article class="tile">
      <div class="tile-heading"><span>${htmlEscape(item.section)}</span><strong>${htmlEscape(item.label)}</strong></div>
      <img src="${item.dataUrl}" alt="${htmlEscape(item.label)}">
    </article>`).join('');
  await board.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box} body{margin:0;background:#eee9e1;color:#27332d;font-family:Arial,sans-serif}
    header{padding:34px 38px 24px;background:#fbf8f2;border-bottom:1px solid #d9d4ca}
    h1{margin:0;font-size:34px} header p{margin:8px 0 0;color:#667169;font-size:15px}
    main{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding:28px}
    .tile{background:#fff;border:1px solid #ddd8cf;border-radius:20px;padding:14px;box-shadow:0 8px 22px rgba(39,51,45,.08)}
    .tile-heading{min-height:54px;margin-bottom:10px}.tile-heading span{display:block;color:#c86f52;font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase}.tile-heading strong{display:block;margin-top:5px;font-size:15px;line-height:1.25}
    img{display:block;width:100%;height:auto;border:1px solid #e6e3dc;border-radius:14px}
  </style></head><body><header><h1>Bonus Human - Visual Review</h1><p>Actual Expo prototype states at ${viewport.width} x ${viewport.height} CSS pixels - generated ${htmlEscape(generatedAt)}</p></header><main>${tileMarkup}</main></body></html>`, { waitUntil: 'load' });
  await board.screenshot({ path: path.join(reviewDirectory, 'bonus-human-contact-sheet.png'), fullPage: true });
  await board.close();

  const pdfPage = await browser.newPage({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 1 });
  const pages = items.map((item, index) => `
    <section class="page">
      <div class="page-heading"><div><span>${htmlEscape(item.section)}</span><h2>${htmlEscape(item.label)}</h2></div><b>${String(index + 1).padStart(2, '0')} / ${items.length}</b></div>
      <div class="phone"><img src="${item.dataUrl}" alt="${htmlEscape(item.label)}"></div>
    </section>`).join('');
  await pdfPage.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    @page{size:A4 portrait;margin:0} *{box-sizing:border-box} body{margin:0;background:#fbf8f2;color:#27332d;font-family:Arial,sans-serif}
    .cover,.page{width:210mm;height:297mm;page-break-after:always;overflow:hidden}
    .cover{display:flex;flex-direction:column;justify-content:center;padding:24mm;background:#27332d;color:#fff}
    .cover .mark{width:18mm;height:18mm;border-radius:6mm;display:flex;align-items:center;justify-content:center;background:#507363;font-size:28pt;font-weight:800;margin-bottom:14mm}
    .cover h1{font-size:34pt;line-height:1.05;margin:0;max-width:150mm}.cover p{font-size:13pt;line-height:1.5;color:#dce6df;max-width:145mm;margin:8mm 0 0}.cover small{margin-top:auto;color:#e3b562;font-size:9pt;letter-spacing:.8pt;text-transform:uppercase}
    .page{padding:12mm 15mm;background:#fbf8f2}.page-heading{height:25mm;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:.35mm solid #e6e3dc;margin-bottom:7mm}
    .page-heading span{color:#c86f52;font-size:8pt;font-weight:800;letter-spacing:1pt;text-transform:uppercase}.page-heading h2{font-size:20pt;line-height:1.15;margin:2.5mm 0 0}.page-heading b{color:#667169;font-size:8pt;font-weight:700}
    .phone{height:239mm;display:flex;align-items:flex-start;justify-content:center}.phone img{display:block;height:232mm;width:auto;border:.35mm solid #d8d4cc;border-radius:5mm;box-shadow:0 3mm 9mm rgba(39,51,45,.12)}
  </style></head><body><section class="cover"><div class="mark">B</div><h1>Bonus Human<br>Visual Review</h1><p>Actual prototype screens and interaction states, arranged in user-flow order for visual critique.</p><small>${items.length} captured states - ${htmlEscape(generatedAt)}</small></section>${pages}</body></html>`, { waitUntil: 'load' });
  await pdfPage.pdf({ path: path.join(reviewDirectory, 'bonus-human-visual-review.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await pdfPage.close();

  await writeFile(path.join(reviewDirectory, 'manifest.json'), `${JSON.stringify({
    viewport,
    renderedPixelDimensions: svgItems.length ? { width: svgItems[0].width, height: svgItems[0].height } : null,
    generatedAt,
    captures: svgItems.map(({ section, label, file, svgFile }) => ({
      section,
      label,
      file: `screenshots/${file}`,
      png: `screenshots/${file}`,
      svg: `svg/${svgFile}`,
    })),
    contactSheets: {
      png: 'bonus-human-contact-sheet.png',
      svg: 'bonus-human-contact-sheet.svg',
    },
    pdf: 'bonus-human-visual-review.pdf',
  }, null, 2)}\n`);
}

async function main() {
  await prepareOutput();
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const expoCli = path.join(projectDirectory, 'node_modules', 'expo', 'bin', 'cli');
  let output = '';
  const expo = spawn(process.execPath, [expoCli, 'start', '--web', '--offline', '--port', String(port)], {
    cwd: projectDirectory,
    env: { ...process.env, BROWSER: 'none', CI: '1', EXPO_NO_DOCTOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const remember = chunk => { output = `${output}${chunk}`.slice(-12000); };
  expo.stdout.on('data', remember);
  expo.stderr.on('data', remember);

  let browser;
  try {
    await waitForServer(baseUrl, expo, () => output);
    browser = await chromium.launch({ executablePath: findBrowserExecutable(), headless: true });
    const context = await browser.newContext({ viewport, deviceScaleFactor: 2, colorScheme: 'light' });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);

    const reset = async () => {
      await page.goto(`${baseUrl}?visualReview=${Date.now()}`, { waitUntil: 'domcontentloaded' });
      await page.getByText('People you’re building with', { exact: true }).waitFor();
      await page.waitForTimeout(200);
    };
    const capture = async (file, section, label) => {
      const outputPath = path.join(screenshotsDirectory, file);
      await page.waitForTimeout(150);
      await page.screenshot({ path: outputPath });
      captures.push({ file, section, label, path: outputPath });
      process.stdout.write(`Captured ${file}\n`);
    };
    const clickTab = label => page.getByRole('button', { name: new RegExp(`${label}(?: tab)?$`) }).click();
    const scrollToText = async (text, exact = true) => {
      const locator = page.getByText(text, { exact }).first();
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      return locator;
    };

    await reset();
    await capture('01-connections-list.png', 'Connections', 'Connections list - Meet & Greet');
    await page.getByRole('button', { name: 'Open Haley and Ari Connection' }).click();
    await capture('02-connection-overview-meet-greet.png', 'Connections', 'Overview - Meet & Greet stage');
    await page.getByRole('button', { name: 'Chat Connection tab' }).click();
    await capture('03-connection-chat.png', 'Connections', 'Chat and activity history');

    await reset();
    await page.getByRole('button', { name: 'Open Haley and Ari Connection' }).click();
    await page.getByText('Schedule Meet & Greet', { exact: true }).click();
    await capture('04-meet-greet-scheduling.png', 'Connections', 'Meet & Greet scheduling');

    await reset();
    await page.getByRole('button', { name: 'Open Haley and Ari Connection' }).click();
    await page.getByText('Skip to Trial Visits', { exact: true }).click();
    await capture('05-connection-trial-visits.png', 'Connections', 'Trial Visits stage');
    await page.getByText('Move to Regular Bonus Human', { exact: true }).click();
    await capture('06-connection-regular-scheduling.png', 'Connections', 'Regular Bonus Human scheduling options');

    await reset();
    await clickTab('Discover');
    await capture('07-discover-default.png', 'Discover', 'Default profile');
    await page.getByText('Next →', { exact: true }).click();
    await capture('08-discover-another-profile.png', 'Discover', 'Another profile - Jordan');

    await reset();
    await clickTab('Discover');
    await page.getByRole('button', { name: /Distance · 10 mi filter/ }).click();
    await capture('09-discover-filter-sheet.png', 'Discover', 'Distance filter sheet');
    await page.getByText('Done', { exact: true }).click();
    await page.getByRole('button', { name: /^Schedule filter$/ }).click();
    await page.getByRole('button', { name: 'Thursday PM' }).click();
    await page.getByRole('button', { name: 'Saturday PM' }).click();
    await page.getByText('Done', { exact: true }).click();
    await page.getByRole('button', { name: /^Experience filter$/ }).click();
    await page.getByRole('button', { name: 'Senior dog care' }).click();
    await page.getByRole('button', { name: 'Medication / pills' }).click();
    await page.getByText('Done', { exact: true }).click();
    await capture('10-discover-filters-applied.png', 'Discover', 'Applied multi-select filters');

    await reset();
    await clickTab('Discover');
    await page.getByRole('button', { name: /^Home filter$/ }).click();
    await page.getByRole('button', { name: 'Has dogs' }).click();
    await page.getByText('Done', { exact: true }).click();
    await capture('11-discover-no-results.png', 'Discover', 'No-results recovery');

    await reset();
    await clickTab('Discover');
    await page.getByText('View profile', { exact: true }).click();
    await capture('12-person-profile-main.png', 'Person Profile', 'Detailed profile');
    await page.getByRole('button', { name: 'Next photo' }).click();
    await capture('13-person-profile-photo.png', 'Person Profile', 'Alternate photo');
    await scrollToText('Next →');
    await page.getByText('Next →', { exact: true }).click();
    await capture('14-person-profile-next.png', 'Person Profile', 'Next detailed profile');

    await reset();
    await clickTab('Pets');
    await capture('15-pets-owner.png', 'Pets', 'Pet Owner pet access');
    await page.getByText('Zuki', { exact: true }).click();
    await capture('16-pet-profile.png', 'Pets', 'Zuki Profile');
    await page.getByText('Care Guide', { exact: true }).click();
    await capture('17-pet-care-guide.png', 'Pets', 'Zuki Care Guide');

    await reset();
    await clickTab('Feed');
    await capture('18-feed.png', 'Feed', 'Private pet Feed');
    await page.getByPlaceholder('Share a Zuki update…').fill('Zuki settled in with her tan blanket.');
    await page.getByText('↑', { exact: true }).click();
    await capture('19-feed-new-post.png', 'Feed', 'New Feed post');

    await reset();
    await page.getByLabel('Open account').click();
    await capture('20-account-hub.png', 'Account', 'Account hub');
    await page.getByRole('button', { name: 'Mode' }).click();
    await capture('21-account-mode.png', 'Account', 'Mode selection');

    await reset();
    await page.getByLabel('Open account').click();
    await page.getByRole('button', { name: 'Edit profile' }).click();
    await capture('22-profile-editing.png', 'Account', 'Expanded profile editing');

    await buildReviewArtifacts(browser);
    await context.close();
    process.stdout.write(`\nCreated ${captures.length} PNG screenshots, ${captures.length} self-contained SVGs, PNG/SVG contact sheets, PDF, and manifest in ${reviewDirectory}\n`);
  } finally {
    if (browser) await browser.close();
    if (expo.exitCode === null) expo.kill('SIGTERM');
  }
}

main().catch(error => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
