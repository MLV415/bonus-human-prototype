# Bonus Human Design System

This documents the visual and interaction language implemented in the Expo prototype. Preserve the warm, calm identity and update this file after substantial visual changes.

## Visual character and palette

Warm, trustworthy, modern, adult, and pet-centered without marketplace urgency or excessive cuteness.

| Token | Value | Primary use |
| --- | --- | --- |
| Paper | `#FBF8F2` | App background, sheets |
| White | `#FFFFFF` | Object cards, inputs, selected segments, navigation |
| Ink | `#27332D` | Titles and primary copy |
| Muted | `#667169` | Body, metadata, helper text |
| Sage | `#507363` | Primary actions, active states, links |
| Sage light | `#E8F0EA` | Secondary/selected/confirmed surfaces |
| Clay | `#C86F52` | Warm emphasis, reactions, destructive actions |
| Clay light | `#F7E9E2` | Warm tags and avatar tint |
| Gold | `#E3B562` | Progress connectors and checklist emphasis |
| Navy | `#314B5A` | Care checklist |
| Line | `#E6E3DC` | Borders and dividers |

Selected/active uses sage/white or sage-light/sage. Confirmed uses sage. Pending uses warm neutral/gold. Destructive uses clay/white. Disabled controls use 45% opacity.

## Typography

Platform system sans-serif, no custom font.

| Role | Treatment |
| --- | --- |
| H1 / screen title | 30/35, 800, ink |
| H2 / section title | 23/28, 800, ink |
| H3 / object title | 17/22, 800, ink |
| Discover name | 25, 800, ink |
| Body | 14/21, muted |
| Bio/emphasis | 15–16/22–24, ink |
| Eyebrow | 11, 800, clay, uppercase, tracked |
| Metadata/helper | 10–13, muted |

Use sentence case for titles/actions. Uppercase is reserved for eyebrows, compact statuses, and day abbreviations.

## Buttons and controls

- **Primary:** sage, white 14/800 text, 48px minimum, 14px radius.
- **Secondary:** sage light/sage for reversible alternatives.
- **Outline:** white, 1.5px sage border, sage text.
- **Destructive:** clay/white only for confirmed destructive actions.
- **Small:** 42px minimum. **Pressed:** 76% opacity.
- Icon controls require clear accessibility labels and 32–44px targets.
- Inputs use white, 1px line border, 12px radius, 44px minimum.
- Switches use gray off, sage on, white knob.

## Cards and hierarchy

Cards represent objects or actionable units: Discover people, pets, Connections, Feed posts, upcoming/requested events, and the actionable Care checklist. Use white, line borders, 14–24px radii, and restrained elevation only on the primary Discover card.

Section introductions, stage explanations, Care subsections, metadata, settings, and Account groups use headings, spacing, divider rows, and flat grouped surfaces instead of nested cards.

## Tags, filters, and staged editing

- Informational tags: sage light/sage. Warm tags: clay light/clay.
- Discover filter categories form one horizontal row: Distance, Schedule, Experience, Home.
- Category chips show applied state only, such as `Distance · 10 mi` or `Schedule · 4`.
- Tapping opens a bottom sheet with a dim scrim, 24px top corners, handle, close/cancel, Clear, and Done.
- Changes inside the sheet are temporary. **Done applies**; close, scrim, or system dismissal **discards**.
- Distance uses a stable finger-tracking 1–100 mile slider.
- Schedule uses independent weekday AM/PM choices plus reassurance that specifics come after connecting.
- Schedule, Experience, and Home are multi-select.

## Connection patterns

- Connection list cards show participants, relevant pet, current stage, and recent context.
- Opening a card lands on **Overview**, with **Chat** one tap away in a two-option segment.
- Overview uses tappable participant/pet portraits, a flat stage timeline, one prominent stage-aware next action, event cards, profile/Care links, and a quiet End Connection action.
- Stages are exactly **Meet & Greet → Trial Visits → Regular Bonus Human**.
- Skipping and backtracking use secondary/outline actions and remain reversible.
- Scheduling uses a bottom sheet with Date, Start time, End time, Cancel, and Send request.
- Chat activity is centered on a sage-light system bubble; human messages retain left/right chat bubbles.
- Requested events expose Confirm, Decline, and Reschedule. Confirmed events use sage status styling.
- End Connection uses a centered confirmation dialog, optional reason chips, separate serious-problem link, and clay destructive confirmation.

## Navigation

Four persistent bottom destinations, in order:

| Destination | Inactive | Active |
| --- | --- | --- |
| Discover | `search-outline` | `search` |
| Connections | `people-outline` | `people` |
| Pets | `paw-outline` | `paw` |
| Feed | `images-outline` | `images` |

Ionicons are 22px; inactive is muted, active is sage with a clay position dot. Account is accessed from the top-right avatar, not a bottom tab. Back appears at top left on full-screen details. Existing users may land on Connections; new users may land on Discover.

## Account and Pets patterns

- Account first opens a hub of divider rows: Mode, Edit profile, Manage pets (Pet Owner only), Settings, Help, About.
- Development tools never appear in the user-facing Account experience.
- Expanded profile editing reuses the same Schedule, Experience, and Home chip patterns used by Discover.
- Pets shows one role-specific group at a time.
- Pet detail uses **Profile | Care Guide**. Connection management never appears as a pet sub-tab.

## Photos

- Discover: full card width × 300px. Person detail: full width × 330px. Pet hero: × 300px, 22px radius. Feed: × 245px, 13px radius.
- Use cover cropping and keep faces inside the central safe area.
- Never place role text or navigation arrows over faces.
- Tap advances photos; small position dots sit in a white strip below.

## Empty states

White bordered 18px-radius object, concise H3, one explanation, and immediate recovery. Name the actual cause. Filter empty states offer Increase distance and Clear filters.

## Spacing and radius

- Screen horizontal padding: 20px.
- Section spacing: generally 26px before, 14px after.
- Object padding: 12–18px; compact gaps 7–10px; action gap 12px.
- Bottom breathing room: 34px.
- Pills/chips: 99px radius; inputs/compact controls: 10–14px; object cards: 14–18px; heroes: 22–24px.

## Interaction states

- Decision: Interested/Passed changes to Undo/Reconsider and persists during detailed Previous/Next browsing.
- Photo: tap advances and wraps.
- Feed reaction: outline heart becomes clay filled and reverses.
- Active tab: filled sage Ionicon, sage label, clay dot.
- Connection Overview and Chat read/write one shared mocked state.
- Meaningful Connection changes append activity to Chat.

## Terminology

- **Connection** is the only long-lived structural relationship concept.
- **Connection stage** is Meet & Greet, Trial Visits, or Regular Bonus Human.
- **Interested** and **Passed** are reversible pre-Connection decisions.
- **Pet Owner**, **Bonus Human**, **Availability**, **Visit**, **Care Guide**, and **Feed** use the meanings in `PRODUCT_DESIGN.md`.
- **Pet Circle** may appear only as occasional warm brand copy, not a status, object, or navigation label.
- Avoid Match/Matches, Association, and structural uses of Relationship.

## Known constraints

- In-content Unicode symbols can vary by platform; bottom navigation uses Ionicons.
- System-font metrics vary slightly across platforms.
- Date/time inputs are intentionally lightweight prototype fields.
- Physical-iPhone touch, safe-area, keyboard, and screen-reader behavior require manual review.

## Maintenance rule

Update this document after changes to reusable visuals, navigation, components, states, terminology, or interaction patterns. Regenerate the visual-review package after substantial UI changes.
