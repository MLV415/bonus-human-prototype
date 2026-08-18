# Bonus Human — Product Design Source of Truth

## Product purpose

Bonus Human helps Pet Owners and animal-loving people form ongoing, non-transactional Connections centered on a pet. Pet Owners remain responsible; Bonus Humans build meaningful, repeated bonds without ownership or payment. This is not a pet-sitting marketplace.

## Target users and modes

- **Pet Owner:** owns and remains responsible for a pet; discovers potential Bonus Humans.
- **Bonus Human:** wants an ongoing animal bond without current pet ownership; discovers Pet Owners and pets.
- A user operates primarily in one mode at a time. Mode switching lives in Account, not Discover.
- The current prototype is dog-focused.

## Core product model

- Mutual interest creates a **Connection** between people, with a relevant pet as supporting context.
- Connection is the single long-lived relationship object. It does not become a differently named object later.
- A Connection may progress through: **Meet & Greet → Trial Visits → Regular Bonus Human**.
- Progression is guided but optional and reversible.
- **Pet Circle** is optional warm copy only, never a navigation concept, data type, or status.

## Key principles

1. Connections, not transactions: no payments, jobs, bookings, or marketplace urgency.
2. Pet wellbeing first: the Pet Owner stays responsible and Care remains easy to find.
3. Trust grows gradually through chat, meetings, and time together.
4. Both sides benefit from the Connection.
5. Early choices and Connection stages remain reversible.
6. People can reach pet and Care information quickly without entering Connection management.
7. Mocked state should stay internally consistent across every surface.

## Information architecture and navigation

Persistent navigation, in journey order:

1. **Discover** — browse role-appropriate people/pets and filter the current result set.
2. **Connections** — Connected, Interested, Passed; open a Connection home.
3. **Pets** — role-specific quick access to pet Profile and Care Guide.
4. **Feed** — private pet-centered updates, photos, posting, and reactions.

The top-right avatar opens an **Account hub** with Mode, Edit profile, Manage pets (Pet Owner mode), Settings, Help, and About.

The default landing screen is state-aware: users without Connections land on Discover; users with an active Connection land on Connections. The current Mike demo therefore lands on Connections.

## Main journey

1. Choose Pet Owner or Bonus Human mode in Account.
2. Browse Discover; optionally stage and apply Distance, Schedule, Experience, and Home filters.
3. Open detailed profiles, browse Previous/Next within the filtered results, and mark Interested or Passed.
4. Mutual interest creates a Connection.
5. Open the Connection home. Overview is the default; Chat is one tap away.
6. Use stage-aware next actions to schedule a Meet & Greet, trial visit, one-off visit, or recurring schedule.
7. Scheduling actions appear in both Overview and Chat history and can be confirmed, declined, or rescheduled locally.
8. Use Pets for direct pet Profile/Care Guide access and Feed for private updates.
9. If needed, end the Connection with confirmation, optional feedback, and an optional serious-problem report path.

## Major implemented features

- Role-aware Discover browsing with tap galleries and card/detail Previous/Next controls.
- Compact horizontal filter categories and focused bottom sheets.
- Smooth 1–100 mile slider; multi-select weekday AM/PM, experience, and home filters.
- Filter changes remain temporary until Done; cancel/scrim dismissal discards them.
- AND filtering plus Increase distance and Clear filters recovery.
- Shared profile data for display, filtering, and expanded Account profile editing.
- Four-tab navigation and deterministic Connections landing for the current demo.
- Connections list with Connected, Interested, and Passed (no lifetime counters).
- Connection Overview/Chat toggle and tappable people/pet links.
- Stage-aware, reversible Connection workflow.
- Local date/start/end scheduling for Meet & Greet, trial, and one-off visits.
- Simplified recurring schedule editing at Regular Bonus Human stage.
- Human chat plus scheduling/activity history using shared Connection state.
- Role-specific Pets hub and pet **Profile | Care Guide** tabs.
- Zuki Feed with posting and reversible reactions.
- Account hub, mode switching, expanded profile editor, pet management link, and settings.
- Confirmed End Connection flow with optional reason and serious-problem path.

## Primary demo state

- Mike and Haley & Ari are connected around Zuki.
- Current stage: **Meet & Greet**.
- They are planning their first Meet & Greet.
- Trial Visits and Regular Bonus Human have not been reached.
- Later stages exist as interactive review states, not contradictory default data.

## Important design decisions

- Connection management belongs under Connections, never as a pet sub-tab.
- Pets is present in both modes, but shows only owned pets in Pet Owner mode or connected pets in Bonus Human mode.
- Pet Profile is descriptive; Care Guide is practical and safety-oriented.
- Discover has no mode banner or photo-role overlay; role control belongs in Account.
- Filter sheets separate draft state from applied state.
- Cards represent objects or actionable units; explanatory sections use spacing and dividers.
- All current behavior is local and mocked for learnability.

## Canonical terminology

- **Connection:** the single long-lived people-to-people object created by mutual interest.
- **Connection stage:** Meet & Greet, Trial Visits, or Regular Bonus Human.
- **Interested / Passed:** reversible pre-Connection profile decisions.
- **Availability:** broad times offered for pet time.
- **Visit:** a proposed or confirmed period of pet time.
- **Care Guide:** practical instructions needed to care safely for a pet.
- **Feed:** private pet-centered updates and photos.
- Avoid Match/Matches, Association, and structural uses of Relationship or Pet Circle.

## Open questions

- Production permissions for multiple Pet Owners or Bonus Humans.
- Identity, references, background checks, moderation, and serious-report handling.
- Notification rules and ownership of scheduling responses.
- Whether filter options within one category should remain AND-based in production.
- Recurring schedule exceptions and timezone behavior.

## Deferred ideas

- Onboarding, authentication, cloud persistence, real messaging, push notifications, and calendar sync.
- Real recommendations, precise location, maps, and travel time.
- Production reporting, blocking, verification, privacy, analytics, and accessibility audits.
- Multiple complete pets/species and complex mixed-role accounts.

## Prototype limitations

- Data resets on reload; there is no backend.
- Scheduling inputs accept local text rather than a production date/time picker.
- Reporting, Help, About, photos, and notifications are mocked or placeholder flows.
- The demo has one complete Connection and one complete pet.
- Physical-device gestures, keyboard behavior, safe areas, and screen-reader behavior still require iPhone review.

## Maintenance rule

Update this file after substantial product/workflow changes and `DESIGN_SYSTEM.md` after substantial visual or interaction-system changes.
