# Bonus Human

Bonus Human is an AI-assisted working prototype for building pet-sharing relationships between pet owners and people who want animals in their lives without taking on full-time ownership. It explores ongoing relationships rather than paid pet care.

<p align="center">
  <img src="visual-review/screenshots/01-discover-neutral.png" alt="Bonus Human Discover screen showing Haley and Ari with compatibility details and profile actions" width="320">
</p>

## Why this exists

When Zuki turned 16, it was getting harder to find the care she needed. Her physical and mental needs were changing, and I wanted to find a way to mirror the special care she got from me while still finding the freedom to live my own life.

As I talked to people in my community, I realized many of them were excited about the idea of a part-time pet. They loved animals, but couldn't make the financial, daily, or long-term commitment of ownership.

I made posts on Facebook and Nextdoor, put up flyers, and interviewed over a dozen people. Through those conversations, I kept coming back to the same questions: how could I make it easier to connect with people nearby, manage scheduling and care details, build trust with someone new, and ultimately find Zuki a “bonus human”?

## Product model

- People discover nearby Pet Owners or Bonus Humans using compatibility details and filters.
- Sending a request records one person's intent; mutual requests create a connection.
- One connection persists as trust progresses through **Meet & Greet → Trial Visit → Bonus Human**.
- Messaging, scheduling, care information, and pet updates stay in the pet and connection context.
- The intended outcome is an ongoing pet-sharing relationship, not a one-time transaction.

## Prototype flow

**Discover → mutual request → connection → Meet & Greet → Trial Visit → Bonus Human**

Discover includes Pet Owner and Bonus Human modes, profile browsing, compatibility filters, reversible requests, and reversible **Not now** choices. Once interest is mutual, the connection provides a shared place to coordinate and advance through the trust stages.

<p align="center">
  <img src="visual-review/screenshots/05-group-profile-haley-ari.png" alt="Haley and Ari’s profile showing compatibility, availability, and pet-care experience" width="320">
</p>
<p align="center"><em>Discover nearby people based on compatibility.</em></p>

## Core experiences

- **Scheduling:** recurring schedules, one-off visits, and a compact current-week view.
- **Care:** routine, food, medication, veterinary details, and emergency information stay easy to find.
- **Pet Feed + Chat:** photos and updates live in the Pet Feed, while Pet Chat handles coordination and details.

<p align="center">
  <img src="visual-review/screenshots/16a-schedule-one-off-recurring-sections.png" alt="Haley and Ari’s connection schedule showing upcoming visits and recurring time together" width="320">
</p>
<p align="center"><em>Scheduling supports recurring and one-off visits.</em></p>

## Implementation

I used React Native, Expo SDK 54, React, and mocked local state to turn the product decisions into a working prototype.

I used OpenAI Codex for AI-assisted implementation while I directed the product model, scope, UX decisions, review cycles, and quality bar.

Validation includes 42 automated regression tests with Jest and React Native Testing Library, repeated physical-iPhone QA in Expo Go, and a repeatable Playwright-based visual-review workflow that produces consistent PNG, SVG, contact-sheet, and PDF artifacts.

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
