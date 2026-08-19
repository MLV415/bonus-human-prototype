# Bonus Human — Product Design Source of Truth

## Purpose and users

Bonus Human helps Pet Owners and animal-loving people form ongoing, non-transactional Connections centered on a pet. Pet Owners remain responsible; Bonus Humans build meaningful, repeated bonds without ownership or payment. The current prototype is dog-focused, local-only, and has two switchable modes: **Pet Owner** and **Bonus Human**.

## Product model and principles

- **Connection** is the one long-lived object created when both sides choose to connect. It progresses through **Meet & Greet → Trial Visits → Bonus Human**.
- Expressing intent is **Connect**. Before mutual choice the state is **Request sent**; mutual choice becomes **You’re connected** or **Connected**.
- Incoming (**Wants to connect**) and outgoing (**Request sent**) requests remain distinct until mutual.
- **&** joins people or pets of the same group; **+** separates the human side from the pet side: `Haley & Ari`, `Mike + Zuki`, `Mike & Ari + Zuki & Nacho`.
- Pet wellbeing comes first. Care information and emergency contacts must be quick to reach.
- The experience is relationship-oriented, neighborly, concise, and never framed as paid work, a gig marketplace, or dating.
- Reversible choices and stage progression should lower pressure.

## Information architecture

Persistent bottom navigation:

1. **Discover** — role-appropriate profiles and filters.
2. **Connections** — Connected, Requests, Passed, plus a lightweight Past connections archive. Requests is divided into **Wants to connect** and **Request sent**.
3. **Pets** — role-specific pet Profile and Care Guide access.
4. **Feed** — global private updates across pets and Connections.
5. **Account** — profile, mode, pet management, settings, Help, and About.

The initial tab is state-aware: no active Connections → Discover; active Connection → Connections. Top-level surfaces use a quiet lowercase `bonus human` wordmark instead of a global header.

## Main journey

1. Browse 30 local mock profiles by tapping or interactively swiping cards. Adjacent cards and their images stay mounted before and after a gesture commits so the destination transitions without a blank-image remount. The active card tracks the finger, commits beyond a threshold, and springs back at either end. Photo taps remain independent and a recognized swipe never opens a profile.
2. Filter by Distance, Availability, Visit Type, Experience, and Home & Household. Draft changes apply only with Done; tapping outside discards them. Filter sheets intentionally have no redundant close icon.
3. Tap the card body for a detailed profile. Pet Owner tabs are data-driven (for example **Mike | Zuki** and **Priya | Mochi**). Grouped humans use a joint summary plus individual tabs, such as **Haley & Ari | Haley | Ari**.
4. Choose **Connect** or **Not now** from the sticky decision bar. The profile leaves Discover immediately and a non-blocking four-second banner provides **Request sent / Undo**, **Not now / Undo**, or **You’re connected / Open connection** while the next profile remains browsable. Incoming requests read **Wants to connect** beside the profile name.
5. Requested, connected, and passed profiles stay out of Discover across tab changes. **Undo request** and **Reconsider pass** in Connections restore profiles to the active queue. Mutual choice moves a profile into Connected and enables a profile-specific Connection Overview/Chat; Open connection never falls back to another person’s Connection.
6. Move through Connection stages using subtle underlined back/forward text links in one row directly beneath the stage diagram, use picker-backed scheduling, review multiple visits and recurring windows in the compact Schedule summary, or open Connection settings to end the Connection.
7. Use the canonical Zuki Profile/Care Guide, floating one-tap Emergency information, the operational Care checklist, and the global Feed.

Profile navigation is context-scoped: Previous/Next browsing exists only for profiles launched from Discover. Profiles launched from Connections, Requests, Passed, Pets, history, or Connection participants use Back only and cannot browse unrelated profiles. Pet entry points converge on one canonical full pet profile.

Connection titles name the connected person or people, not the owner’s pet (for example **Haley & Ari**). A Pet Owner and their own pet may remain combined as profile identity (for example **Mike + Zuki**). Pets remain visible in Connection participants and context.

## Discover taxonomy and profile tags

All visible profile attributes belong to one explicit class and reuse the same underlying profile data.

- **Filterable:** broad Availability (weekday AM/PM), Visit Type, dog-care Experience, and Home/Household requirements.
- **Informational:** personality and context such as Quiet home or Former dog parent.
- **Derived:** distance, profile completeness, and summarized availability.

Filters:

- **Distance:** 1–100 miles; Reset returns to 10 miles.
- **Availability:** individual AM/PM cells plus All AM, All PM, Weekdays, Weekends, and Clear all.
- **Visit Type:** Walks, Drop-in visits, Daycare, Sleepovers, House sitting.
- **Experience:** puppy, senior, medication, injections, diets, mobility, separation anxiety, behavioral needs.
- **Home & Household:** Home type (Any/House/Apartment), Has yard, Dogs (Any/Has dogs/No dogs), Cats (Any/No cats). Defaults show everyone unless a requirement is selected.

## Care and emergency model

- **Profile | Care Guide** subtabs stay available above pet content.
- Emergency is a compact, truly floating medical action positioned over the pet screen with no full-width dock or frame.
- The Emergency sheet contains owner contact, veterinarian, phone/address, and critical medical notes.
- The Care checklist is the canonical daily operational view. Each checkbox records one task only: Breakfast, Heart medicine, Short sniff walk, Dinner, Joint chew, Final bathroom break.
- Food, Medication, Bathroom, Behavior & comfort, Emergency contacts, and Veterinary information remain reference instructions below.

## Global Feed

Every post has an author, pet, Connection, category, timestamp, and optional photo. The current single-pet composer defaults to Zuki. Filters for Pet, Connection, and Author live in a sheet. The compact composer expands only after interaction. Current-user posts can be created and edited inline; Remove leaves a restorable author-only placeholder. Categories are Update, Care update, Little moment, and Milestone.

## Scheduling and chat

- One-off visits have independent IDs, date, start/end times, and requested/confirmed/declined status. Creating another visit never overwrites an existing one; every saved visit can be edited/rescheduled or canceled, with corresponding Chat activity.
- Meet & Greet, Trial Visit, one-off, and reschedule flows share one scrollable, safe-area-aware scheduling sheet with fixed actions.
- On iOS each date/time field is one native compact control; its system picker updates that same visible value without rendering a second inline control.
- Recurring schedules open in a dedicated focused sheet and contain one or more windows. Each window supports multiple weekdays, start/end time pickers, and add/edit/delete. Leaving Bonus Human closes the editor UI without deleting saved windows.
- The Connection Schedule keeps the lightweight planned-day week preview, then separates **Upcoming visits** from **Recurring schedule**. Recurring summaries use calendar-sorted short day labels (Mon–Sun) and preserve Weekdays, Weekends, and Every day group labels.
- Scheduling activity messages always include the relevant date and time. Human chat bubbles support a local double-tap heart reaction; system activity does not.

## Implemented prototype boundaries

All state is mocked and resets on reload. There is no authentication, backend, payment, production messaging, notification delivery, reporting system, or onboarding. Scheduling uses native date/time pickers and local state only. Help, About, and serious-report controls disclose their prototype limits instead of silently doing nothing. Physical-iPhone safe areas, gesture feel, picker presentation, keyboard behavior, and screen-reader behavior still require device review.

## Maintenance

Update this file after substantial product/workflow changes, update `DESIGN_SYSTEM.md` after visual-system changes, and regenerate `visual-review/` after substantial UI changes.
