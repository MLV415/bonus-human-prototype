# Bonus Human Product Backlog

These are deliberately deferred opportunities beyond the frozen portfolio prototype.

## Product decisions reflected in the prototype

- **One long-lived connection** — A separate Relationship object duplicated lifecycle state, so one connection now persists and changes stage from Meet & Greet through Trial Visit to Bonus Human.
- **Two scheduling models** — One-off visits have their own date, time, and status. Recurring schedules store ongoing windows separately rather than treating every occurrence as the same kind of record.
- **Contextual profile navigation** — Previous/Next browsing belongs to Discover. Profiles opened from requests, passed profiles, pets, or an established connection stay within that known context.
- **Mutual requests create a connection** — One outgoing request remains pending. A connection begins only when interest is mutual; incoming and outgoing requests remain visibly distinct until then.

## Product / UX backlog

- **Richer connection cards and clearer notifications** — Current cards communicate stage and one preview, but notification meaning is limited. Explore clearer visit, message, and care signals after real usage establishes priority; deferred to avoid inventing an unvalidated notification system.
- **Larger, richer Pet cards** — Pet summaries could surface more personality and high-value context. Test denser cards only after learning what people need before opening a Pet Profile; deferred to preserve a focused overview.
- **Deeper role-specific experiences** — Pet Owner and Bonus Human modes currently act mainly as Discover lenses. Build differentiated dashboards and actions when role-specific needs are validated; deferred because the modes are intentional scaffolding.
- **True pet management and editing** — Account → Manage pets currently leads to the Pets area. Add create/edit/archive flows when persistent data exists; deferred because local mocked state cannot represent safe pet-record management.

## Scheduling improvements

- **Fuller weekly/monthly calendar** — The compact week strip shows planned days but not detailed availability. Explore a calendar after schedule density justifies it; deferred to keep light scheduling understandable.
- **Clearer recurring-schedule editing** — Existing add/edit/delete works but could better communicate saved versus draft state. Revisit with real recurring patterns; deferred to avoid redesigning a functional prototype flow.
- **Recurring-window conflict detection** — Overlapping windows are currently allowed. Add warnings and resolution after time-zone and multi-person rules are defined; deferred because no production scheduling model exists.
- **Scheduling quality-of-life** — Consider reminders, copy-previous, cancellation reasons, and visit notes after the core visit lifecycle is validated; deferred to protect scope.

## Pet care improvements

- **Emergency versus veterinary/contact architecture** — Critical contacts and broader Care information overlap. Test whether Emergency should be a dedicated mode or a prioritized Care section; deferred because the current floating action is fast and usable.
- **Multi-pet Care checklist** — Multiple pets may need one combined operational view. Explore grouping by time and pet when multi-pet households are supported; deferred because the prototype centers on Zuki.
- **Surface high-value Care information earlier** — Pet cards could show medication or routine signals. Define privacy and urgency rules first; deferred to avoid cluttering browsing with sensitive detail.

## Discovery improvements

- **Revisit filter-category visibility** — The horizontal category rail is compact but some categories can sit off-screen. Test alternatives with a larger catalog; deferred because the current navigation is functional and familiar.
- **Production-scale filtering** — Add saved preferences, ranking, pagination, and clearer result counts when real data and geography exist; deferred because the prototype uses local mocked profiles and simple AND logic.
