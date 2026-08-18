# Bonus Human Design System

This document describes the visual language implemented in the Expo prototype. It is a practical source of truth, not a proposal for a new brand. Update it after substantial visual changes.

## Visual character

Warm, trustworthy, modern, calm, and adult. The interface uses warm neutral backgrounds, deep green structure, restrained clay accents, candid photography, rounded object cards, and readable mobile layouts. Avoid marketplace urgency, overly cute styling, decorative complexity, and nested card stacks.

## Color palette

### Backgrounds and surfaces

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FBF8F2` | App background and warm inset surfaces |
| White | `#FFFFFF` | Object cards, inputs, selected segments, navigation, and bottom sheets |
| Sage light | `#E8F0EA` | Positive/selected tint, secondary buttons, confirmations |
| Clay light | `#F7E9E2` | Warm highlights, milestone tags, profile avatar tint |
| Navy | `#314B5A` | High-contrast Care checklist surface |
| Warm gray | `#EEECE6` | Segmented-control and neutral-status backgrounds |
| Emergency surface | `#FFF9F6` | Emergency and veterinary Care rows |

### Text, accents, and borders

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#27332D` | Titles, primary copy, active labels |
| Muted | `#667169` | Secondary copy, metadata, helper text |
| Sage | `#507363` | Primary actions, active states, links, positive status |
| Clay | `#C86F52` | Warm emphasis, decisions, reactions, destructive actions |
| Gold | `#E3B562` | Relationship connectors and Care checklist emphasis |
| Line | `#E6E3DC` | Object-card, input, row, sheet, and navigation borders |
| Disabled gray | `#CCD2CE` | Disabled/off switch track |

### State rules

- **Selected/active:** sage fill with white text, or sage-light fill with sage text.
- **Unselected:** paper or white fill, line border, muted text.
- **Positive/confirmed:** sage or sage light; never clay.
- **Pending/attention:** warm gold tint with dark gold text.
- **Destructive:** clay fill with white text. Reserve for removal or irreversible actions, not Pass.
- **Disabled:** preserve the base style at 45% opacity and prevent interaction.

## Typography

The prototype uses the platform system sans-serif; no custom font is installed.

| Role | Current treatment |
| --- | --- |
| Screen title / H1 | 30/35, weight 800, ink, slightly tight tracking |
| Section title / H2 | 23/28, weight 800, ink |
| Object title / H3 | 17/22, weight 800, ink |
| Discover person name | 25, weight 800, ink |
| Body | 14/21, muted |
| Emphasized body / bio | 15–16/22–24, ink |
| Field and row label | 13–15, weight 700–800 |
| Eyebrow | 11, weight 800, clay, uppercase, wide tracking |
| Metadata / location | 13/20, muted |
| Helper / safety text | 10–12/18, muted |

Use sentence case for titles and actions. Uppercase is reserved for short eyebrows, role badges, day abbreviations, and compact status labels.

## Buttons

- **Primary:** sage fill, white 14px/800 text, 48px minimum height, 14px radius.
- **Secondary:** sage-light fill with sage text for reversible alternatives such as Pass or Clear filters.
- **Outline:** white fill, 1.5px sage border, sage text for navigation-like actions.
- **Destructive:** clay fill and white text only for true removal/destruction.
- **Disabled:** 45% opacity with interaction disabled.
- **Small:** 42px minimum height for compact object-level actions.
- **Icon buttons:** 32–44px target with an accessibility label.
- **Pressed:** 76% opacity; meaning and color family do not change.

## Cards and section hierarchy

Cards represent objects or actionable units. Use white surfaces, `#E6E3DC` borders, and restrained elevation only for the primary Discover card.

- **Person profile card:** 24px radius, clipped photo, role badge, 18px content padding.
- **Pet card:** 17px radius, 12px padding, 74px rounded photo, title/body/link stack.
- **Connection card:** 18px radius, 13px padding, people image, state, preview, and unread count.
- **Feed card:** 18px radius, 16px padding, optional full-width photo at 13px radius.
- **Upcoming Visit card:** 16px radius, compact date block, time, and Availability owner.
- **Care checklist:** actionable navy surface with 18px radius.
- **Empty state:** 18px radius, centered explanation and recovery actions.

Do not wrap section introductions, Relationship stages, Care subsections, profile metadata, or settings groups in decorative cards. Use section headings, whitespace, subtle dividers, and grouped rows. Relationship stages use top/bottom dividers; profile metadata and prompts use stacked divider rows; notification settings use a simple row.

## Tags, chips, and filters

- Informational tags use sage-light with sage text.
- Warm/milestone tags use clay-light with clay text.
- Filter-category chips appear in one horizontally scrollable Discover row: Distance, Schedule, Experience, Home.
- Category chips use white/line/sage when inactive and sage/white when active.
- Active chips show concise state, such as `Distance · 10 mi` or `Schedule · 4`.
- Tapping a category opens a mobile bottom sheet focused on that category.
- Option chips are pill-shaped with a line border when unselected and sage fill when selected.
- Multiple Schedule, Experience, and Home options may remain selected simultaneously.
- Bottom sheets use a dimmed scrim, 24px top corners, drag indicator, clear close action, and fixed Clear/Done actions.
- Status labels share the pill silhouette but use stronger 800-weight text.

## Icons and symbols

Bottom navigation uses Expo-compatible Ionicons with consistent 22px sizing. Inactive icons use outlines and muted gray; active icons use filled equivalents and sage.

| Destination | Inactive | Active |
| --- | --- | --- |
| Discover | `search-outline` | `search` |
| Pets | `paw-outline` | `paw` |
| Connections | `people-outline` | `people` |
| Feed | `images-outline` | `images` |
| Profile | `person-outline` | `person` |

Other compact symbols remain limited to established in-content meanings:

| Symbol/icon | Meaning |
| --- | --- |
| `B` | Bonus Human brand mark |
| `M` | Mike/account avatar |
| `‹` | Back navigation |
| `↑` | Send/post action |
| `♥` / `♡` | Selected/unselected Feed reaction |
| `⌖` | General, non-precise location |
| `◷` | Routine/time |
| `✚` | Health/medical information |
| `⌂` | Home or physical limits |
| `✓` | Completed or confirmed state |
| `›` / `→` | Forward navigation |

Do not assign a new meaning to an existing symbol without updating this table.

## Navigation patterns

- Five persistent tabs: Discover, Pets, Connections, Feed, Profile.
- Icon size, label spacing, active color, and selected-state dot are consistent across all five tabs.
- Top bars use the brand mark or Back on the left, centered title, and account avatar on the right when appropriate.
- Full-screen details temporarily hide bottom navigation and provide Back.
- Care remains nested under a pet/Relationship.
- Connections contains Connected, Interested, and Passed.
- Interested and Passed never appear as primary Discover sections.
- `UI Gallery (Dev)` is available from Profile in development builds.
- Segment controls use white for the active choice on a warm-gray track.

## Photo treatment

- Use candid, natural photography with consistent identity throughout each gallery.
- Discover photo: full card width × 300px.
- Person profile hero: full width × 330px.
- Pet hero: full width × 300px with 22px radius.
- Feed photo: full card width × 245px with 13px radius.
- List thumbnails: 58–76px with 14–16px radius.
- Use `cover` cropping and keep faces within the central safe area.
- Galleries advance by tapping the photo; do not overlay arrows or instructions.
- Position dots sit in a white strip below the photo.

## Empty states

- Use a white bordered object with concise H3 copy, one explanatory sentence, and one or two recovery actions.
- Name the actual reason, for example: “No profiles fit these filters.”
- Prefer an immediate primary recovery action and a secondary reset action.
- Never refer to unavailable concepts such as saved lists.

## Form controls

- Inputs use white fill, 1px line border, 12px radius, 44px minimum height, and ink text.
- Labels sit above inputs in 11px bold muted text.
- Multiline inputs use an 82px minimum height and top-aligned text.
- Switches use disabled gray when off and sage when on, with a white knob.
- Distance uses an accessible adjustable slider with a visible value and 1–100 mile endpoints.
- Schedule pairs each weekday with independent AM and PM chips.

## Status and Relationship language

- **Confirmed/complete:** sage family.
- **Pending/awaiting:** gold family.
- **Neutral/information:** warm gray and muted text.
- **Interested/Passed badge:** clay for visibility on photography; both remain reversible.
- Canonical Relationship stages are exactly: **Meet & Greet → Trial Visits → Regular Bonus Human**.

## Spacing and radius

- Screen horizontal padding: 20px.
- Top-level section spacing: generally 26px before and 14px after.
- Object-card padding: 12–18px.
- Compact gaps: 7–10px for chips and tightly related controls.
- Standard action gap: 12px.
- Bottom content breathing room: 34px.
- Pills/chips/status: 99px radius.
- Inputs and compact controls: 10–14px radius.
- Standard object cards: 14–18px radius.
- Hero cards/images: 22–24px radius.

## Interaction states

- **Pressed:** 76% opacity for standard buttons.
- **Selected:** sage fill/white text or white active segment on gray.
- **Disabled:** 45% opacity and disabled accessibility state.
- **Active tab:** filled sage Ionicon, sage label, small clay dot.
- **Photo tap:** advances one image and wraps.
- **Reaction:** outline heart becomes filled clay heart; count and copy update reversibly.
- **Decision:** action changes to Undo interested or Reconsider pass.
- **Filter category:** opens one bottom sheet; Done applies the current local state immediately.

## Terminology rules

- **Discover:** browse people or pets who could become a Connection.
- **Interested:** interest expressed but not yet mutual; reverse with **Undo interested**.
- **Passed:** reversible choice not to pursue a profile; action is **Pass**, reversal is **Reconsider pass**.
- **Connection:** mutual-interest, pre-Relationship state where messaging and meeting begin.
- **Relationship:** active bond between a specific pet and Bonus Human after connecting.
- **Relationship stage:** **Meet & Greet → Trial Visits → Regular Bonus Human**.
- **Pet Circle:** Pet Owners and Bonus Humans with active Relationships to a pet.
- **Pet Owner:** person responsible for the pet.
- **Bonus Human:** person building an ongoing, non-ownership Relationship with the pet.
- **Availability:** times the Pet Owner offers for pet time.
- **Visit:** a proposed or confirmed period of pet time.
- **Care:** instructions and information needed to safely care for the pet.
- **Feed:** private pet-centered updates and photos for the Pet Circle.

Avoid marketplace terms such as provider, customer, booking, job, and free care.

## Known visual constraints

- In-content Unicode symbols can still vary slightly across platforms; bottom navigation no longer depends on them.
- Some object-card radii differ by hierarchy and density within the documented ranges.
- System-font metrics vary slightly by platform because no custom font is installed.

## Maintenance rule

Update this document after substantial changes to colors, typography, spacing, reusable controls, imagery, interactions, or terminology. Verify new patterns in `UI Gallery (Dev)` before considering the change complete.
