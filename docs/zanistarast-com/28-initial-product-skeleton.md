# Zanistarast.com — Initial Product Skeleton

Status: LOCKED — Roadmap item 28

## Goal

Turn the governance and product rules from items 1–27 into the first buildable zanistarast.com product boundary. This skeleton is deliberately separate from the existing .org scientific site and must not repurpose current working articles as .com published content.

## Product surface

The initial .com application should be implemented as its own application/site boundary with these public routes:

- `/` — Home
- `/discover` — Discover
- `/search` — Search
- `/work/:workId` — canonical Work/Watch page
- `/values/:value` — value/theme discovery
- `/collections/:collectionId` — curated collection
- `/library` — saved/liked/history surfaces when available
- `/source/:workId` — deeper public provenance/source view, or an equivalent expandable route/panel

Exact route syntax may evolve, but WORK identity must remain canonical.

## Design-system foundation

Before page proliferation, create a small reusable .com design system:

- typography scale optimized for public reading;
- spacing/layout tokens;
- responsive containers;
- buttons and icon controls;
- chips/tags for values, format and language;
- WorkCard;
- MediaPlayerShell;
- SourceSummary;
- ExpandableReading;
- RelatedWorks;
- loading/empty/error states;
- accessible focus and interaction states.

The .com visual identity must be its own public-media identity. It must not simply copy the .org academic presentation or another platform's proprietary design.

## Home

Home should provide a clear first visit without requiring knowledge of Zanistarast terminology.

Initial sections may include:
- a restrained featured work/collection;
- Continue where you left off when user state exists;
- values/themes;
- selected films/stories/audio/reading;
- family/age-appropriate collections where applicable;
- recently added approved works.

Every row is populated only from admitted/published content.

## Discover

Discover is the broad browsing surface. It should support combinations of:
- values/themes;
- media format;
- audience;
- language;
- cultural context;
- curated collections.

Filters describe approved works; they do not perform publication admission.

## Work / Watch page

The canonical Work page is the center of the product.

Desktop/wide:
- large primary player/media area;
- related works rail to the right where space permits;
- title and concise public explanation;
- Like / Save / Share;
- language/media controls;
- expandable “Oku / Konuyu Anla” section;
- source/provenance summary;
- deeper source/review details.

Mobile/narrow:
- primary media first;
- title/actions;
- expandable reading/source;
- related works below;
- touch-friendly controls.

A non-video work uses the same WORK page with the representation appropriate to its medium rather than forcing a fake video player.

## Player shell

The first player contract should reserve support for:
- play/pause;
- seek/timeline;
- volume where platform permits;
- playback speed;
- captions/subtitles;
- quality selection when renditions exist;
- fullscreen;
- picture-in-picture where supported;
- progress/resume;
- keyboard and touch accessibility.

The shell may initially operate on placeholder/demo-safe media during implementation. Placeholder content must never be presented as an approved Zanistarast publication.

## Expandable public reading

Below the primary representation, provide a compact summary and an expandable “Oku / Konuyu Anla” reading layer.

Expansion must not reset playback or navigation state. The text is a governed LANGUAGE_VARIANT/REPRESENTATION, not an untracked HTML note.

## Source and trust

Each Work page reserves a plain-language source area showing, as applicable:
- Source / Adapted from / Inspired by / Mira original production;
- source/creator;
- culture/period;
- scientific source link when eligible;
- Mira/AI involvement;
- correction/withdrawal notice;
- deeper provenance action.

Do not expose a universal trust score.

## Search

Initial search should accept ordinary public language and return eligible works.

The UI contract should support later:
- language-aware matching;
- title/summary/transcript matching;
- value/theme filters;
- format/audience filters;
- culture/source filters.

No result may appear merely because a search index contains it; current eligibility remains authoritative.

## Likes and recommendations

The first skeleton should include stable UI/data boundaries for Like and Save even if account persistence is implemented later.

Recommendation surfaces consume:
`eligible candidate pool -> ranking -> presentation`.

They must never call ranking first and attempt to filter prohibited content afterward.

## Mobile/PWA

The application skeleton is mobile-first and responsive, with Android and Windows first-class as defined in Item 22.

Initial PWA-ready boundary should reserve:
- manifest metadata;
- application icons;
- standalone-safe layout;
- service-worker integration point;
- safe application update strategy.

Do not add aggressive install prompts or notifications to the initial experience.

## Data contracts

The first implementation should introduce explicit public-facing view models rather than binding components directly to repository files.

Minimum conceptual contracts:

`WorkSummary`
- workId
- localizedTitle
- localizedSummary
- primaryRepresentation
- values/themes
- format
- language availability
- audience
- publication eligibility summary

`WorkDetail`
- WorkSummary fields
- representations
- reading variant
- source summary
- related eligible works
- correction state
- user actions/state

`RepresentationView`
- representationId
- version
- media type
- language
- media/source locator
- captions/tracks
- accessibility metadata

The actual API/schema may refine these names while preserving their responsibilities.

## Demo fixtures

Until real .com content has completed the required gates, development fixtures must be unmistakably marked as demo/placeholder data and isolated from production eligibility.

Current .org working/reference articles must not be bulk-imported into these fixtures as if they were published .com works.

## Implementation sequence

Build item 28 in this order:

1. separate .com application directory/build boundary;
2. design tokens and reusable primitives;
3. app shell/navigation;
4. Home and Discover;
5. canonical Work/Watch page;
6. expandable reading and source panel;
7. values/categories and Search;
8. Like/Save state interface;
9. eligible-related/recommendation interface;
10. responsive Android/Windows behavior;
11. PWA manifest/installable shell;
12. accessibility and basic route/render tests.

This sequence may be split into focused commits while Item 28 remains open.

## Definition of done

Item 28 is GREEN only when a runnable separate .com skeleton exists and basic tests/build checks are green. This architecture document alone does not close the item.

The runnable skeleton must demonstrate:
- Home;
- Discover;
- Search;
- one demo-safe Work page;
- responsive wide/narrow layout;
- expandable reading/source area;
- related-work placement;
- Like/Save UI boundary;
- no .org working article falsely represented as .com publication;
- governance-aware eligibility boundary;
- PWA-ready manifest/application shell;
- basic accessibility semantics.

## Non-goals for the skeleton

- no fake DOI or publication records;
- no automatic import of current .org drafts;
- no real external publication action;
- no production-scale recommendation ML yet;
- no premature native Android/Windows fork;
- no weak mass-generated content to make the site look populated;
- no bypass of Rasterast, rights, cultural/moral review or Müdebbir.
