# Bonus Human

A new way to build pet-sharing relationships in your community.

I built Bonus Human as an AI-assisted working prototype for ongoing pet-sharing relationships, not paid pet care.

<p align="center">
  <img src="visual-review/screenshots/01-discover-neutral.png" alt="Bonus Human Discover screen showing Haley and Ari with compatibility details and profile actions" width="320">
</p>

## Why this exists

When Zuki turned 16, it was getting harder to find the care she needed.

Her physical and mental needs were changing: she had trouble being alone, and struggled with other dogs at our regular sitter. I wanted to mirror the special care she got from me, while still finding the freedom to live my own life.

As I talked to people in my community, I realized many of them were excited about the idea of a part-time pet. They loved animals, but couldn't make the financial, daily, or long-term commitment of ownership.

**The lightbulb went off! What if we just shared?**

I made posts on Facebook and Nextdoor, put up flyers, and interviewed over a dozen people. Through those conversations, I kept coming back to the same questions:

- How could I make it easier to connect with people nearby?
- How could we manage scheduling and other details?
- How would we build trust with someone new?

**How could I find Zuki a "bonus human"?**

## Product model

- Users connect based on unique preferences.
- Interactions are guided as the relationship grows.
- Everyone involved sees details and updates over time.
- Mutual requests create a connection.
- One connection persists as trust progresses through **Meet & Greet → Trial Visit → Bonus Human**.
- The intended outcome is an ongoing pet-sharing relationship, not a one-time transaction.

## Prototype flow

**Discover → mutual request → connection → Meet & Greet → Trial Visit → Bonus Human**

### Discover

**Compatibility before commitment.**

- Look for new connections by reviewing profiles nearby.
- Filter using distance, schedule, experience, and environment.
- Mutual requests create a connection.

<p align="center">
  <img src="visual-review/screenshots/05-group-profile-haley-ari.png" alt="Haley and Ari’s profile showing compatibility, availability, and pet-care experience" width="320">
</p>
<p align="center"><em>Discover nearby people based on compatibility.</em></p>

### Connection

**Building trust over time**

- Meet & Greet: get to know each other.
- Trial Visit: try some time together.
- Bonus Human: a new type of pet-sharing relationship.

## Core experiences

### Scheduling

**Plan time together.**

- Get into a rhythm with recurring visits.
- Or, schedule a one-off when things line up.
- View the plan for the current week.

<p align="center">
  <img src="visual-review/screenshots/16a-schedule-one-off-recurring-sections.png" alt="Haley and Ari’s connection schedule showing upcoming visits and recurring time together" width="320">
</p>
<p align="center"><em>Scheduling supports recurring and one-off visits.</em></p>

### Care

**Critical information, easy to scan.**

- Keep track of their daily routine.
- Detailed instructions for food and medicine.
- Easily access veterinary and emergency info.

### Pet Feed + Chat

**Stay connected between visits**

- Share photos and updates in the Pet Feed.
- Work out the details in the Pet Chat.

## Implementation

### Prototyping to drive decision making

I used React Native, Expo SDK 54, React, and mocked local state to turn the product decisions into a working prototype.

I used OpenAI Codex for AI-assisted implementation while I directed the product model, scope, UX decisions, review cycles, and quality bar.

Validation includes 42 automated regression tests with Jest and React Native Testing Library, repeated physical-iPhone QA in Expo Go, and a repeatable Playwright-based visual-review workflow that produces consistent review artifacts.

The current product and visual decisions are documented in [PRODUCT_DESIGN.md](PRODUCT_DESIGN.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), and [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md).

## What changed through testing

Prototyping helped me make structural product decisions rather than just polish individual screens:

- I removed a separate Relationship object in favor of one long-lived connection whose stage changes over time.
- I separated one-off visits from recurring schedules so occasional and ongoing time remain distinct.
- I limited Previous/Next profile browsing to Discover; known-profile and established-connection contexts use scoped navigation.
- I clarified request and lifecycle behavior so one request remains pending and only mutual intent creates a connection.

## Deliberate boundaries

I deliberately kept this prototype focused. It does not include:

- production authentication and backend services
- payments
- a full calendar visualization
- scheduling conflict detection
- full pet-record creation and editing
- production messaging or notifications
- location tracking

Data is mocked locally and state resets when the app reloads.

## Running locally

Install Node.js 20.19 or newer and Expo Go, then run:

```bash
npm install
npx expo start --clear
```

On Windows PowerShell, use `npm.cmd install` and `npx.cmd expo start --clear` if script aliases are unavailable. Scan the QR code with Expo Go or press `w` for the web preview.

Regenerate the visual-review artifacts with:

```bash
npm run visual-review
```

## Tests

Run all 42 regression tests with:

```bash
npm test
```

On Windows PowerShell, use `npm.cmd test` and `npm.cmd run visual-review`.

© 2026 Mike Vais. All rights reserved.
