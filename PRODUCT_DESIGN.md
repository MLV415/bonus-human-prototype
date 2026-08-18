# Bonus Human — Product Design Source of Truth

## Product purpose

Bonus Human helps pet owners and animal-loving people form ongoing, non-transactional pet-sharing relationships. The owner remains responsible for the pet; a bonus human becomes one of the pet's trusted people through repeated, mutually beneficial time together. This is not a paid pet-sitting marketplace.

## Target users

- **Pet owners** who want to thoughtfully widen their pet's circle of trusted people.
- **Bonus humans** who want a meaningful animal relationship but cannot or do not currently want to own a pet.
- The current prototype is dog-focused, while the concept may later support other companion animals.

## Core user modes

- **Pet Owner mode:** discovers potential bonus humans.
- **Bonus Human mode:** discovers pet owners and their pets.
- The current mode is visible and switchable from a compact control on Discover and can also be managed from Profile.

## Key product principles

1. Relationships, not transactions: no payments or marketplace framing.
2. Pet wellbeing first: owners retain responsibility and care information remains clear.
3. Trust grows gradually: interest leads to conversation, meet-and-greet, trial visits, then a regular relationship.
4. Both people benefit: bonus humans volunteer for meaningful time with a pet.
5. Reversible early choices: Interested and Pass decisions can be reviewed and undone.
6. Useful over exhaustive: profiles and care details should be visual and easy to scan.
7. Privacy by default: shared feeds and care details belong to a pet's trusted circle.

## Current information architecture

- **Discover**: mode-aware profile browsing, filters, profile cards, and person profile details.
- **Pets**: owned pets and pets connected through a bonus-human relationship.
  - Pet profile
  - Relationship stage and scheduling
  - Care information
- **Matches**: established connections, Interested profiles, Passed profiles, and local prototype chat.
- **Feed**: private pet-centered updates, posting, photos, and reactions.
- **Profile**: account information, photos, preferences, user mode, and development-only access to the UI Gallery.

## Main user journey

1. Choose Pet Owner or Bonus Human mode.
2. Browse role-appropriate profiles, optionally filtering by radius, schedule, care experience, and home environment.
3. Open a profile and mark Interested or Pass.
4. Revisit those choices under Matches; mutual interest can become a connection.
5. Use the connection to plan a meet-and-greet and build trust through trial visits.
6. Move into a Regular Bonus Human relationship.
7. Coordinate volunteered pet time, consult care information, and share private feed updates.

## Current top-level navigation

1. Discover
2. Pets
3. Matches
4. Feed
5. Profile

Care is intentionally nested under the relevant pet and relationship rather than occupying a top-level tab.

## Major features currently implemented

- Mocked, role-aware profile discovery with previous/next browsing.
- A 1–100 mile distance slider with a visible radius.
- Multi-select availability by weekday and AM/PM.
- Multi-select dog-care experience and home-environment filters.
- Direct no-results recovery through Increase distance and Clear filters.
- Visual person and pet profiles with tap-to-advance photo galleries.
- Interested, Pass, undo, and reconsider flows housed under Matches.
- Mocked connection between Mike, Zuki, Haley, and Ari with local chat.
- Multi-pet information architecture with owned and bonus-pet associations.
- Relationship stages: Meet & Greet → Trial Visits → Regular Bonus Human.
- Lightweight availability request and owner confirmation.
- Zuki's private feed with local posting and reversible reactions.
- Scannable routine, medication, behavior, emergency, and veterinary details.
- Editable local account details, mocked photo management, notification preference, and mode switching.
- Development-only UI Gallery for reviewing reusable visual patterns in one scrollable screen.
- Behavioral Jest tests for the main prototype flows.

## Important design decisions

- Discover is kept focused on one profile at a time; decision history lives in Matches.
- Filters use AND logic: a profile must satisfy every selected schedule, experience, and home requirement.
- Same-role profiles are hidden from Discover according to the active mode.
- Photo galleries advance by tapping the image. Small indicators sit below images so controls do not cover faces.
- A bonus human volunteers for available pet time; the owner confirms instead of requesting unpaid care.
- All data and interactions are local and mocked to keep this prototype easy to understand and iterate.
- Visual implementation and terminology follow `DESIGN_SYSTEM.md`; substantial visual changes must update that document and the UI Gallery.

## Known open questions

- Whether filters within a category should use AND or OR logic in a production product.
- How mutual interest should be communicated and when chat should unlock.
- Whether availability belongs primarily to a pet, a relationship, or both.
- What identity, reference, background-check, and safety tools are appropriate.
- How multiple owners or multiple bonus humans should share permissions.
- Which care updates should require acknowledgement or an audit trail.

## Deferred ideas

- Authentication, persistent accounts, and cloud storage.
- Real matching, ranking, messaging, push notifications, and calendars.
- Precise location, maps, and travel-time estimates.
- Verification, references, safety reporting, and emergency workflows.
- Additional pet species, multiple complete pet profiles, and configurable permissions.
- Production accessibility, analytics, moderation, and privacy controls.

## Current prototype limitations

- All people, pets, distances, availability, messages, decisions, and posts are mocked.
- Changes reset when the app reloads; there is no backend or persistent storage.
- The slider and filters demonstrate interaction but do not use real location data.
- Chat, scheduling, account editing, photo management, and notifications are local demonstrations only.
- Mochi has an association placeholder rather than a complete pet and care profile.
- There is no authentication, payment, real messaging, location tracking, or matching algorithm.
- Physical-device layout, gestures, keyboard behavior, and screen-reader behavior still require iPhone review.

## Maintenance rule

Update this document after every substantial product or workflow change so it continues to describe the current prototype. Update `DESIGN_SYSTEM.md` after every substantial visual-system change.
