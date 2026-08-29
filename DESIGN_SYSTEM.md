# Bonus Human Design System

Warm, trustworthy, adult, pet-first, and calm. Avoid gig-marketplace urgency, dating-game signals, corporate filler, and excessive cuteness.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FBF8F2` | App background and sheets |
| White | `#FFFFFF` | Object cards, inputs, selected surfaces |
| Ink | `#27332D` | Titles and primary copy |
| Muted | `#667169` | Body, metadata, helper text |
| Sage | `#507363` | Primary actions, active states, links |
| Sage light | `#E8F0EA` | Secondary, selected, confirmed surfaces |
| Clay | `#C86F52` | Warm emphasis, active underline, destructive actions |
| Clay light | `#F7E9E2` | Warm tags and Emergency background |
| Gold | `#E3B562` | Stage connectors and checklist emphasis |
| Navy | `#314B5A` | Care checklist |
| Line | `#E6E3DC` | Dividers and borders |

## Typography and brand

- H1/screen title: 30/35, 800, ink. H2: 23/28, 800. H3/object: 17/22, 800.
- Body: 14/21 muted. Bio: 15–16/22–24 ink. Metadata: 10–13 muted.
- Eyebrows: 11/800 clay, uppercase, tracked. They add context rather than repeat the title.
- Screen titles and actions use sentence case. Structural terms retain canonical capitalization.
- The lowercase `bonus human` wordmark is 13/800 sage and sits quietly at the top of top-level scroll content. It is branding, not a button or toolbar.

## Navigation and headers

Bottom navigation is **Discover, Connections, Pets, Feed, Account**, using 22px Ionicons and a clay active dot. Top-level screens do not use a global toolbar. Their order is: wordmark → page heading/context → subtabs when present → content.

Detail screens use a compact back header. Back always returns to the immediate prior screen. Long nested content keeps key subtabs outside the scrolling body.

## Subtabs

Use one underline/navigation treatment for:

- Connected / Requests / Passed
- Overview / Chat
- Profile / Care Guide
- Mike / Zuki

Subtabs have a line baseline, 46px minimum height, muted inactive labels, ink active labels, and a 3px clay active underline. Do not use large segmented-toggle boxes for navigation.

## Buttons and states

- Primary: sage/white, 48px minimum, 14px radius.
- Secondary: sage-light/sage. Outline: white with sage border. Destructive: clay/white.
- **Connect** includes a link/people motif. Pressed state scales to 97% with slight opacity; Request sent and You’re connected use a calm confirmed-green state.
- Discover decisions stay in a fixed bar above bottom navigation. After an action, the card advances immediately and a dark, non-blocking banner sits above the decision area for four seconds. It pairs **Request sent** or **Not now** with **Undo**, and **You’re connected** with **Open connection**.
- **Not now** is secondary and reversible. **Reconsider pass** in Connections restores the profile to Discover. Avoid hearts for the primary connection action.
- Text actions are used for low-emphasis reversible controls such as stage movement, Edit, and Remove.
- Disabled controls use 45% opacity. Visible controls must act, navigate, or explain the prototype limit.

## Cards and photos

Cards represent objects or actionable units: Discover profiles, pets, connections, Feed posts, and requested visits. Sections use typography, spacing, and dividers rather than nested cards.

Discover images are 300px high; person details 330px; pet heroes 300px; Feed images 245px. The same fixed heights are retained on web to match the approved mobile composition; the desktop presentation frame stays close to mobile width so cover crops do not drift excessively. Use cover crops and keep faces in the central safe area. Photo tap advances; a white strip with subtle dots shows position. The Discover card body opens the profile; horizontal swipe visibly tracks the finger, reveals an adjacent card whose gallery stays mounted through promotion, animates out after threshold, and springs back at boundaries. Image and profile metadata transition as one unit. Photo interactions never trigger profile navigation or a connection request.

## Filters and profile tags

Discover categories form a horizontal rail: Distance, Schedule, Visit type, Experience, Home. The partially visible next chip communicates scrolling; do not add a nonfunctional arrow. Tapping opens a bottom sheet. Done is the only visible apply/close action; the scrim discards staged changes. Do not add a redundant circular X.

- Distance uses the 1–100 mile slider and **Reset** to 10 miles.
- Availability combines All AM/All PM/Weekdays/Weekends/Clear all with individual weekday cells.
- Home requirements use single-choice Any states and only meaningful constraints, never opposing chip sprawl.
- Filterable profile tags use sage-light pills. Informational tags use the same quiet visual but appear under a named contextual group. Derived values are plain metadata or summaries, not editable chips.

## Care, emergency, and status

The Care checklist is navy with gold completed checkboxes and one task per row. Reference instructions are flat divider rows. Emergency is a compact, absolutely positioned clay action with a medical icon plus the word **Emergency**; it floats above the lower edge with matching content inset and has no full-width background, dock, or divider. The Emergency sheet prioritizes contact, veterinarian, and critical notes.

Connection stage labels are 11/14, 700, with sage active nodes and gold/gray connectors. The sequence is Meet & Greet → Trial Visits → Bonus Human. Backward and forward/skip controls are subtle underlined text links in one compact horizontal row immediately below the diagram: backward on the left, forward on the right. Both remain secondary to the stage-specific scheduling action. Connection headers name the connected Bonus Human without appending the owner’s pet; the participant diagram carries pet context.

## Feed and forms

Feed filters for Pet, Connection, and Author live behind a compact Filters control with an active count. Every card displays author, pet, Connection, category, and time. The composer starts collapsed and progressively reveals category and Connection-context controls. Edit is inline. Remove replaces the current user’s card with a muted Restore placeholder.

Inputs are white with a 1px line border, 12px radius, and 44px minimum. Scheduling sheets are scrollable with fixed, safe-area-aware action footers. Dates and times use platform-appropriate pickers rather than free text; on iOS, the visible field contains one native compact control and never inserts a duplicate picker beneath it. Schedule summaries use labeled **Upcoming visits** and **Recurring schedule** groups with similarly weighted compact cards. Recurring day summaries use Mon–Sun calendar order and abbreviations. Edit Profile grouping order is Photos → Profile basics → Location/Connection hope → Availability → Visit types → Experience → Home/Household → Story prompts.

## Terminology and voice

Canonical structural terms: **Connect, Request sent, Undo request, Wants to connect, You’re connected, Connected, Connection, Pet Owner, Bonus Human, Meet & Greet, Trial Visits, Profile, Care Guide, Feed, Account**. Use lowercase “connection” in normal prose and capitalize literal UI labels such as **Connections** or **Connection stage**. The final stage is **Bonus Human**, never “Regular Bonus Human.” Use **Bonus Humans** only as the plural role label for multiple people. Do not use Interest sent, Interested, Interested profiles, or Undo interested for connection requests. Avoid Match, Relationship, Association, and Pet Circle as competing objects. Use plain contextual wording such as “Zuki’s people.”

System copy should be warm, relationship-oriented, pet-first, neighborly, concise, trustworthy, and non-transactional. Use `&` within same-type groups and `+` between human and pet sides.

## Web prototype presentation

At widths below 768px, the browser demo fills the viewport and follows the approved 390px mobile composition without a decorative shell. At tablet and desktop widths, it uses a centered 430px app frame on a warm neutral canvas with a subtle border, rounded corners, and shadow. The frame is no taller than 844px, its content scrolls internally, and bottom navigation remains attached to it. Sheets and dialogs are constrained to the same frame on larger screens and remain full-viewport on mobile. Web-native date and time inputs use border-box sizing so their 100% width stays inside sheet padding. The top-level wordmark is identical on web and iPhone; no extra prototype label is appended to it.

## Spacing and constraints

Screen horizontal padding: 20px. Section spacing: about 26px before/14px after. Object padding: 12–18px. Bottom breathing room: 34px. Pills are fully rounded; inputs/compact controls 10–14px; object cards 14–18px; heroes 22–24px.

System font metrics and physical-iPhone safe areas, keyboard, gestures, and screen-reader behavior require device review. Update this document after substantial reusable visual or interaction changes.
