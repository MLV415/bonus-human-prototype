# Bonus Human Design System

This document describes the visual language currently implemented in the Expo prototype. It is a practical source of truth for review and iteration, not a proposal for a new brand. Update it after substantial visual changes.

## Visual character

Warm, trustworthy, modern, calm, and adult. The interface uses warm neutral backgrounds, deep green structure, restrained clay accents, candid photography, rounded surfaces, and dense-but-readable mobile layouts. Avoid marketplace urgency, overly cute pet styling, and decorative complexity.

## Color palette

### Backgrounds and surfaces

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FBF8F2` | App background and warm inset surfaces |
| White | `#FFFFFF` | Cards, inputs, selected segments, and navigation |
| Sage light | `#E8F0EA` | Positive/selected tint, secondary buttons, confirmations |
| Clay light | `#F7E9E2` | Warm highlights, milestone tags, profile avatar tint |
| Navy | `#314B5A` | High-contrast care checklist surface |
| Warm gray | `#EEECE6` | Segmented-control and neutral-status backgrounds |
| Emergency surface | `#FFF9F6` | Emergency and veterinary rows |

### Text, accents, and borders

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#27332D` | Titles, primary copy, and active labels |
| Muted | `#667169` | Secondary copy, metadata, and helper text |
| Sage | `#507363` | Primary actions, active states, links, and positive status |
| Clay | `#C86F52` | Warm emphasis, decisions, reactions, and destructive actions |
| Gold | `#E3B562` | Relationship connectors and care checklist emphasis |
| Line | `#E6E3DC` | Default card, input, and navigation borders |
| Disabled gray | `#CCD2CE` | Disabled/off switch track |

### State rules

- **Selected/active:** sage fill with white text, or sage-light fill with sage text.
- **Unselected:** paper or white fill, line border, muted text.
- **Positive/confirmed:** sage or sage light; never clay.
- **Pending/attention:** warm gold tint with dark gold text.
- **Destructive:** clay fill with white text. Reserve for removal or irreversible actions—not Pass, which is reversible.
- **Disabled:** preserve the base style at 45% opacity and prevent interaction.

## Typography

The prototype uses the platform system sans-serif; no custom font dependency is installed.

| Role | Current treatment |
| --- | --- |
| Screen title / H1 | 30/35, weight 800, ink, slightly tight tracking |
| Section title / H2 | 23/28, weight 800, ink |
| Card title / H3 | 17/22, weight 800, ink |
| Discovery person name | 25, weight 800, ink |
| Body | 14/21, muted |
| Emphasized body / bio | 15–16/22–24, ink |
| Field and card label | 13–15, weight 700–800 |
| Eyebrow | 11, weight 800, clay, uppercase, wide tracking |
| Metadata / location | 13/20, muted |
| Helper / safety text | 10–12/18, muted |

Use sentence case for titles and actions. Uppercase is reserved for short eyebrows, role badges, day abbreviations, and compact status labels.

## Buttons

- **Primary:** sage fill, white 14px/800 text, 48px minimum height, 14px radius. Use once per decision area for the preferred next action.
- **Secondary:** sage-light fill with sage text. Use for reversible alternatives such as Pass, Clear filters, or Reconsider.
- **Outline:** white fill, 1.5px sage border, sage text. Use for navigation-like actions such as View profile.
- **Destructive:** clay fill and white text. Use only for true removal/destruction.
- **Disabled:** 45% opacity with interaction disabled.
- **Small:** 42px minimum height; use for compact card-level actions.
- **Icon buttons:** circular or compact controls with a minimum 32–44px visual target. Every icon-only action requires an accessibility label.
- **Pressed:** reduce opacity to 76%; do not change the meaning or color family.

## Cards

Cards use white surfaces, `#E6E3DC` borders, and restrained elevation only for the primary Discover card.

- **Profile card:** 24px radius, clipped full-width photo, role badge over the top-left, 18px content padding, optional decision badge top-right.
- **Person profile sections:** 14–16px radius with 14–16px padding.
- **Pet card:** 17px radius, 12px padding, 74px square rounded photo, title/body/link stack.
- **Relationship card:** 18px radius, 17px padding, with canonical stage title and horizontal progression.
- **Feed card:** 18px radius, 16px padding, optional full-width photo at 13px radius.
- **Care checklist:** 18px radius on navy; care detail rows remain flatter for fast scanning.
- **Empty-state card:** 18px radius, 22px padding, centered copy and recovery actions.

Avoid introducing a new card treatment when one of these patterns fits.

## Tags, chips, and filters

- Informational tags use sage-light with sage text.
- Warm/milestone tags use clay-light with clay text.
- Filter chips are pill-shaped with a 1px line border when unselected and a sage fill with white text when selected.
- Multiple filters may remain selected simultaneously.
- Status labels share the pill silhouette but use stronger 800-weight text.
- Pills are content-sized; do not stretch them to card width.

## Icons and symbols

The prototype currently uses Unicode symbols rather than an icon library.

| Symbol | Meaning and placement |
| --- | --- |
| `B` | Bonus Human brand mark in the top bar |
| `M` | Mike/account avatar and Profile access |
| `‹` | Back navigation only |
| `↑` | Send/post action only |
| `⌕` | Discover tab |
| `♥` | Pet circle, trusted relationship, or selected reaction |
| `♡` | Unselected reaction; currently also used for comfort in pet-care summaries |
| `◇` | Matches tab |
| `▤` | Feed tab |
| `○` | Profile tab |
| `⌖` | General, non-precise location |
| `◷` | Routine/time |
| `✚` | Health/medical information |
| `⌂` | Home or physical limits |
| `✓` | Completed or confirmed state |
| `›` / `→` | Forward navigation; use only when opening another view |

Do not assign a new meaning to an existing symbol without updating this table. Unicode rendering varies by platform, so icon consistency remains a future migration candidate.

## Navigation patterns

- Five persistent bottom tabs: Discover, Pets, Matches, Feed, Profile.
- Top bars use the brand mark or Back on the left, centered title, and account avatar on the right when appropriate.
- Full-screen details temporarily hide the bottom tabs and provide Back.
- Care remains nested under a pet/relationship.
- Interested and Passed lists remain inside Matches, not Discover.
- `UI Gallery (Dev)` is available from Profile only in development builds.
- Segment controls use white for the active choice on a warm-gray track.

## Photo treatment

- Use candid, natural photography with the subject identity consistent throughout a gallery.
- Discover profile image: full card width × 300px, approximately 4:3 within the mobile layout.
- Person profile hero: full width × 330px.
- Pet hero: full width × 300px with a 22px radius.
- Feed image: full card width × 245px with a 13px radius.
- List thumbnails: 58–76px, 14–16px radius.
- Use `cover` cropping and keep faces within the central safe area.
- Galleries advance by tapping the photo. Do not overlay arrows or instructions.
- Photo-position dots sit in a white strip below the photo so they do not obscure the image.

## Empty states

- Use a white bordered card with a concise H3, one explanatory body sentence, and one or two recovery actions.
- Name the actual reason: for example, “No profiles match these filters.”
- Prefer an immediate primary recovery action and a secondary reset action.
- Never refer to unavailable concepts such as saved lists.

## Form controls

- Inputs use white fill, 1px line border, 12px radius, 44px minimum height, and ink text.
- Labels sit above inputs in 11px bold muted text.
- Multiline inputs use an 82px minimum height and top-aligned text.
- Switches use disabled gray when off and sage when on, with a white knob.
- The distance control is an accessible adjustable slider with a visible numeric value and 1–100 mile endpoints.
- Schedule selectors pair each weekday with independent AM and PM filter chips.

## Status labels and relationship language

- **Confirmed/complete:** sage family.
- **Pending/awaiting:** gold family.
- **Neutral/information:** warm gray and muted text.
- **Interested/Passed decision badge:** clay for visibility on photography; both decisions remain reversible.
- Canonical relationship stages are exactly: **Meet & Greet → Trial Visits → Regular Bonus Human**.

## Spacing and padding

- Screen horizontal padding: 20px.
- Top-level section spacing: generally 26px before, 14px after.
- Card padding: 12–18px depending on density.
- Compact gaps: 7–10px for chips and tightly related controls.
- Standard action gap: 12px.
- Bottom content breathing room: 34px.
- Prefer existing spacing values before adding a new one.

## Border radius

- Pills/chips/status: 99px.
- Inputs and compact controls: 10–14px.
- Standard cards: 14–18px.
- Hero cards/images: 22–24px.
- Circular avatars and icon buttons: 50% of width/height.

## Interaction states

- **Pressed:** 76% opacity for standard buttons; feedback should be immediate.
- **Selected:** sage fill/white text or white active segment on gray track.
- **Disabled:** 45% opacity and `disabled` accessibility state.
- **Active tab:** sage icon/label plus a small clay dot; inactive tabs are muted.
- **Photo tap:** advance one image and wrap to the first.
- **Reaction:** outlined heart becomes filled clay heart; count and copy update reversibly.
- **Decision:** action label changes to Undo interested or Reconsider pass.

## Terminology rules

- **Pet Owner:** a user mode and role; title case in prose, uppercase only in compact role badges.
- **Bonus Human:** singular role and canonical relationship-stage term. Use **Bonus Humans** only for multiple people, such as Haley & Ari.
- **Interested:** the canonical positive discovery decision. Use **Undo interested** to reverse it.
- **Pass / Passed:** action is **Pass**; saved-list label and badge use **Passed**; reversal is **Reconsider pass**.
- **Matches:** the top-level navigation area containing Connections, Interested, and Passed.
- **Connection:** a mutual-interest relationship that can support conversation and trust-building.
- **Meet & Greet**, **Trial Visits**, and **Regular Bonus Human:** canonical stage capitalization and wording.
- **Pet circle / trusted people:** people connected to a pet; avoid marketplace terms such as provider, customer, booking, or job.
- **Availability / Zuki time:** volunteered time offered by a Bonus Human and confirmed by the Pet Owner; avoid free-care request language.

## Known visual inconsistencies and constraints

- Unicode symbols can render differently across iOS, Android, and web; a dedicated icon system is deferred.
- The heart symbol carries related but distinct meanings—pet circle, trust, and feed reaction. This is acceptable for the prototype but should be tested with users.
- Some card radii differ by hierarchy and density. These differences are intentional within the ranges above, not separate design languages.
- System-font metrics vary slightly by platform because no custom font is installed.

## Maintenance rule

Update this document after every substantial change to colors, typography, spacing, reusable controls, imagery, interaction states, or visual terminology. Verify new patterns in `UI Gallery (Dev)` before considering the change complete.
