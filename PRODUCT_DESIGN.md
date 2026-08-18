# Bonus Human — Product Design Source of Truth

## Product purpose

Bonus Human helps Pet Owners and animal-loving people form ongoing, non-transactional pet-sharing Relationships. The Pet Owner remains responsible for the pet; a Bonus Human becomes part of the pet's Pet Circle through repeated, mutually beneficial time together. This is not a paid pet-sitting marketplace.

## Target users

- **Pet Owners** who want to thoughtfully grow their pet's Pet Circle.
- **Bonus Humans** who want a meaningful animal Relationship but cannot or do not currently want to own a pet.
- The current prototype is dog-focused, while the concept may later support other companion animals.

## Core user modes

- **Pet Owner mode:** discovers potential Bonus Humans.
- **Bonus Human mode:** discovers Pet Owners and their pets.
- The current mode is visible and switchable from a compact Discover control and from Profile.

## Key product principles

1. Relationships, not transactions: no payments or marketplace framing.
2. Pet wellbeing first: Pet Owners retain responsibility and Care information remains clear.
3. Trust grows gradually: Interested can become a Connection; a Connection can progress into a pet-specific Relationship.
4. Both people benefit: Bonus Humans volunteer for meaningful time with a pet.
5. Reversible early choices: Interested and Passed decisions can be reviewed and undone.
6. Useful over exhaustive: profiles and Care details should be visual and easy to scan.
7. Privacy by default: the Feed and Care details belong to a pet's Pet Circle.

## Current information architecture

- **Discover:** mode-aware browsing of people and pets who could become a Connection, with compact category filters and profile details.
- **Pets:** owned pets and pets connected through a Bonus Human Relationship.
  - Pet profile and Pet Circle
  - Relationship stage
  - Availability and Visits
  - Care information
- **Connections:** Connected, Interested, and Passed profiles plus local prototype chat.
- **Feed:** private pet-centered updates, photos, posting, and reactions for the Pet Circle.
- **Profile:** account information, photos, preferences, user mode, and development-only access to the UI Gallery.

## Main user journey

1. Choose Pet Owner or Bonus Human mode.
2. Use Discover to browse role-appropriate profiles and optionally filter by Distance, Schedule, Experience, or Home.
3. Open a profile and mark Interested or Pass.
4. Revisit Interested and Passed choices under Connections.
5. Mutual interest creates a Connection where messaging and a Meet & Greet can begin.
6. Create a pet-specific Relationship and progress through Meet & Greet → Trial Visits → Regular Bonus Human.
7. Review Availability, propose and confirm a Visit, consult Care, and share private Feed updates with the Pet Circle.

## Current top-level navigation

1. Discover
2. Pets
3. Connections
4. Feed
5. Profile

Care remains nested under the relevant pet and Relationship rather than occupying a top-level tab.

## Major features currently implemented

- Mocked, role-aware Discover browsing with previous/next navigation.
- Horizontally scrollable Distance, Schedule, Experience, and Home filter-category chips.
- Mobile bottom sheets for editing one filter category at a time.
- A 1–100 mile Distance slider with a visible radius.
- Multi-select Schedule by weekday and AM/PM.
- Multi-select dog-care Experience and Home filters.
- AND filtering logic and direct no-results recovery through Increase distance and Clear filters.
- Visual person and pet profiles with tap-to-advance photo galleries.
- Interested, Pass, undo, and reconsider flows housed under Connections.
- Mocked Connection between Mike, Zuki, Haley, and Ari with local chat.
- Multi-pet information architecture for owned pets and pet Connections.
- Relationship stages: Meet & Greet → Trial Visits → Regular Bonus Human.
- Lightweight Availability, Visit proposal, and Pet Owner confirmation.
- Zuki's private Feed with local posting and reversible reactions.
- Scannable routine, medication, behavior, emergency, and veterinary Care details.
- Editable local account details, mocked photo management, notification preference, and mode switching.
- Development-only UI Gallery for reusable visual patterns.
- Behavioral Jest tests for the main prototype flows.

## Important design decisions

- Discover stays focused on one profile at a time; decision history lives in Connections.
- Filter categories use compact horizontal chips and focused bottom sheets to preserve browsing space.
- Filters use AND logic: a profile must satisfy every selected Schedule, Experience, and Home requirement.
- Same-role profiles are hidden from Discover according to the active mode.
- Cards represent objects or actionable units: people, pets, Connections, Feed posts, and upcoming Visits.
- Section introductions, Relationship stages, Care subsections, profile metadata, and settings prefer headings, spacing, rows, and dividers over nested cards.
- Photo galleries advance by tapping the image. Indicators sit below images so controls do not cover faces.
- A Bonus Human proposes a Visit from Pet Owner-provided Availability; the Pet Owner confirms it.
- All data and interactions are local and mocked to keep the prototype easy to understand and iterate.
- Visual implementation and terminology follow `DESIGN_SYSTEM.md`; substantial visual changes must update that document and the UI Gallery.

## Canonical terminology

- **Discover:** browse people or pets who could become a Connection.
- **Interested:** interest expressed but not yet mutual.
- **Passed:** a reversible choice not to pursue a profile.
- **Connection:** mutual interest; messaging and meeting can begin before an active Relationship.
- **Relationship:** an active bond between a specific pet and Bonus Human after connecting.
- **Relationship stage:** Meet & Greet → Trial Visits → Regular Bonus Human.
- **Pet Circle:** active Pet Owners and Bonus Humans around a pet.
- **Availability:** times a Pet Owner offers for a Bonus Human to spend with the pet.
- **Visit:** a proposed or confirmed period of pet time.
- **Care:** information needed to safely care for a pet.
- **Feed:** private pet-centered updates and photos shared with the Pet Circle.

## Known open questions

- Whether filters within a category should use AND or OR logic in production.
- How mutual interest should be communicated and when chat should unlock.
- Whether Availability belongs primarily to a pet, a Relationship, or both.
- What identity, reference, background-check, and safety tools are appropriate.
- How multiple Pet Owners or Bonus Humans should share permissions.
- Which Care updates should require acknowledgement or an audit trail.

## Deferred ideas

- Authentication, persistent accounts, and cloud storage.
- Real recommendations, ranking, messaging, push notifications, and calendars.
- Precise location, maps, and travel-time estimates.
- Verification, references, safety reporting, and emergency workflows.
- Additional pet species, multiple complete pet profiles, and configurable permissions.
- Production accessibility, analytics, moderation, and privacy controls.

## Current prototype limitations

- All people, pets, distances, Availability, messages, decisions, Visits, and posts are mocked.
- Changes reset when the app reloads; there is no backend or persistent storage.
- The slider and filters demonstrate interaction but do not use real location data.
- Chat, scheduling, account editing, photo management, and notifications are local demonstrations only.
- Mochi has a Connection placeholder rather than a complete pet and Care profile.
- There is no authentication, payment, real messaging, location tracking, or recommendation algorithm.
- Physical-device layout, gestures, keyboard behavior, and screen-reader behavior still require iPhone review.

## Maintenance rule

Update this document after every substantial product or workflow change. Update `DESIGN_SYSTEM.md` after every substantial visual-system change.
