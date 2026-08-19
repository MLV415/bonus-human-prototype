# Bonus Human

Bonus Human is an AI-assisted mobile product prototype exploring ongoing, trusted pet-sharing relationships between Pet Owners and people who want meaningful pet companionship without full ownership.

## The problem

Pet Owners sometimes need a broader circle of trusted people, while many animal lovers want a real bond with a pet but cannot or do not want to own one. Existing pet-care products usually frame time with a pet as a paid transaction. Bonus Human instead explores a lasting, mutually valuable relationship in which the Pet Owner remains responsible and a Bonus Human becomes one of the pet’s familiar people.

## The product

The Expo prototype demonstrates:

- Discover browsing and filters across Pet Owner and Bonus Human modes
- connection requests, reversible Not now choices, and mutual Connections
- Meet & Greet → Trial Visits → Bonus Human progression
- one-off visits plus recurring schedules
- Pet Profiles, operational Care Guides, and Emergency access
- a private Feed of pet-centered updates

## My role

I independently led the product concept, strategy, workflow design, UX iteration, prototype scope, and quality bar. The project demonstrates product judgment, hands-on prototyping, AI-assisted implementation, device QA, regression testing, and deliberate scope management.

## How I built it

I translated the product model into focused mobile flows, implemented them with OpenAI Codex, and repeatedly evaluated the result in Expo Go on a physical iPhone. Each review cycle combined observed device behavior, automated regression tests, and a Playwright-based visual-review workflow that captures consistent mobile states for comparison. The Git history records the iterative decisions and fixes.

## Selected product decisions

- **One long-lived Connection:** avoided separate pre-Connection and active-relationship objects that would fragment the mental model.
- **Two scheduling rhythms:** separated one-off visits from recurring windows so occasional and ongoing time remain understandable.
- **Role modes remain scaffolding:** Pet Owner and Bonus Human modes are intentional foundations for future differentiated experiences, not another Discover filter.
- **Care stays close to the pet:** Pet Profiles link directly to Care Guides and Emergency information.
- **Scope stays explicit:** lower-priority redesigns are documented in the backlog instead of being rushed into the prototype.

## Prototype scope

This is a portfolio prototype with mocked, local data. It intentionally has no production backend, payments, real authentication, commercial deployment, live messaging, or location tracking. State resets when the app reloads.

## Tech

React Native, Expo SDK 54, React, Jest, React Native Testing Library, and Playwright-based visual-review tooling.

## Quality / validation

- 42 automated regression tests covering core product behavior
- repeated physical-iPhone QA in Expo Go
- reproducible 390 × 844 visual-review captures in PNG, SVG, contact-sheet, and PDF formats
- iterative Git history documenting product and implementation changes

## Product backlog

[PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md) captures product and UX opportunities deliberately deferred from this prototype freeze.

## Run locally

Install Node.js 20.19 or newer and Expo Go, then run:

```bash
npm install
npx expo start --clear
```

On Windows PowerShell, use `npm.cmd install` and `npx.cmd expo start --clear` if script aliases are unavailable. Scan the QR code with Expo Go or press `w` for the web preview.

Run tests:

```bash
npm test
```

Regenerate the visual review:

```bash
npm run visual-review
```

On Windows PowerShell, the equivalents are `npm.cmd test` and `npm.cmd run visual-review`.
