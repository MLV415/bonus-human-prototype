# Bonus Human

A clickable Expo SDK 54 prototype for ongoing, non-transactional pet-sharing relationships.

## Run it

1. Install Node.js 20.19 or newer and the current Expo Go app on your iPhone.
2. In this folder, run `npm install`.
3. Run `npx expo start --clear`.
4. Scan the QR code with Expo Go, or press `w` for a browser preview.

All data and interactions are local and reset when the app reloads.

## Run the automated tests

```bash
npm test
```

The Jest suite exercises the main prototype flows without launching a simulator or phone.

## Regenerate the visual review package

```bash
npm run visual-review
```

This starts a temporary local Expo web server, captures the actual prototype at a consistent 390 × 844 mobile viewport, and rebuilds the PNG screenshots, self-contained SVG versions, PNG/SVG contact sheets, PDF, and manifest in `visual-review/`. Each SVG embeds the corresponding rendered screenshot at its native pixel dimensions, preserving the actual UI state exactly while remaining a portable UTF-8 SVG file. It uses an installed Chrome or Microsoft Edge browser; set `VISUAL_REVIEW_BROWSER` to a browser executable path if neither is found automatically.
