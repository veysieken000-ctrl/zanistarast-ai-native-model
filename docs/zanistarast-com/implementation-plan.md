# Zanistarast.com — Implementation Plan After Roadmap 32/32

Status: ACTIVE IMPLEMENTATION

The 32-item product/governance roadmap is closed. This document does not create a new conceptual phase. It translates the locked architecture into implementation packages.

## Package A — Production-ready public application foundation

Goal: evolve the current static runnable skeleton without weakening its simple deployment model.

Work:
- split presentation, routing, state and eligibility responsibilities into explicit modules;
- retain a dependency-light browser/PWA implementation until complexity justifies a framework;
- add canonical view-model validation for WORK and REPRESENTATION;
- make demo fixtures impossible to confuse with production-admitted content;
- establish reusable components for WorkCard, source disclosure, actions and work layout;
- strengthen route/error/empty/loading behavior;
- extend smoke tests around eligibility and demo isolation.

Acceptance:
- existing Home/Discover/Search/Work behavior remains functional;
- ineligible work cannot render through a public route;
- demo fixtures remain visibly and structurally non-production;
- CI stays green.

## Package B — Canonical content and governance boundary

Goal: replace fixture-only assumptions with an API-ready domain boundary.

Work:
- define WorkSummary, WorkDetail, RepresentationView and publication eligibility contracts;
- define correction/withdrawal state in public contracts;
- define source/provenance summary contract;
- define rights/Rasterast/Müdebbir eligibility inputs without exposing private review material;
- provide an adapter interface so static fixtures can later be replaced by API data without rewriting pages.

Acceptance:
- UI depends on contracts/adapters rather than raw repository content;
- public rendering requires exact-version eligibility;
- withdrawn/blocked/pending candidates fail closed.

## Package C — Media and accessibility foundation

Goal: prepare real governed media delivery.

Work:
- replace the demo media box with a representation-aware player shell;
- support captions/subtitles and transcript/read alternatives;
- define media rendition/quality metadata;
- preserve keyboard/touch behavior and reduced-motion accessibility;
- keep media asset identity/version traceable.

Acceptance:
- player can consume an approved representation contract;
- missing/unsupported media degrades to an accessible alternative;
- no media-processing success implies publication approval.

## Package D — User state without governance coupling

Goal: make Like/Save/progress persistent-ready.

Work:
- define anonymous local state adapter first;
- define future authenticated state interface;
- keep user state separate from canonical publication records;
- ensure recommendations consume preferences only after eligibility filtering.

Acceptance:
- likes/saves survive navigation locally;
- clearing user state does not alter work eligibility;
- no preference signal can expose an ineligible work.

## Package E — Search and recommendation boundary

Goal: evolve local search into a replaceable discovery service.

Work:
- define search query/result contracts;
- filter against current eligibility before presentation;
- define related/recommendation provider interface;
- retain deterministic eligible fallback when personalization is unavailable.

Acceptance:
- stale/ineligible IDs are rejected at render boundary;
- recommendation outage cannot block direct access to an eligible work;
- ranking never becomes admission.

## Package F — First pilot production package

Goal: run one candidate through the complete production workflow without pretending it is published.

Work:
- choose a justified pilot brief;
- research provenance and rights;
- perform culture/history and psychology/sociology/psychosociology analysis as applicable;
- create original script/treatment/storyboard;
- prepare continuity and visual/moral constraints;
- produce candidate assets;
- run source/similarity/rights/cultural/accessibility reviews;
- run Rasterast;
- prepare Müdebbir exact-version decision package.

Acceptance:
- every material artifact is traceable;
- unresolved issues remain visible;
- no candidate enters the public admitted pool before all required gates.

## Package G — Production deployment readiness

Goal: prepare the .com application for its eventual real domain and production services.

Work:
- select/attach production API, database and object storage only when required by implemented features;
- configure environment separation and secrets;
- establish backup/restore and observability;
- run load/performance/accessibility checks;
- acquire/configure zanistarast.com domain only when the product/deployment is ready;
- verify HTTPS, PWA, caching and withdrawal propagation.

Acceptance:
- deployment does not depend on fabricated content or identifiers;
- secrets are not committed;
- restore and withdrawal paths are tested;
- production domain activation occurs only against a verified deployment.

## Execution rule

Proceed package by package. A package closes only after its implementation and applicable CI/tests are green. Do not reopen the 32 locked roadmap items unless a concrete implementation conflict or regression requires a narrowly scoped correction.


## Package H — Promotion, advertising and publication announcement system

Goal: support restrained, clearly disclosed promotional interstitials without turning attention or payment into publication authority.

Work:
- support short Zanistarast publication/work announcements and, later, governed external advertising as distinct promotion classes;
- allow skippable media after a configured short delay, with automatic continuation when the promotion ends;
- link internal publication announcements to the exact admitted Work/version they describe;
- keep "Yeni Eklenenler" independent from promotion delivery so discovery never requires watching an ad;
- define frequency caps, repeat suppression and short-content exclusions to avoid excessive interruption;
- require external promotions to pass applicable rights, Rasterast, cultural/moral visual and Müdebbir gates before eligibility;
- label paid/sponsored material clearly and keep commercial ranking separate from scientific/publication status;
- collect only the minimum delivery state needed for frequency control; do not let ad engagement affect content admission.

Acceptance:
- a promotion can never make a blocked/pending Work publicly eligible;
- skip becomes available only according to explicit configuration and the main media resumes automatically on skip or completion;
- internal announcements cannot claim publication before the referenced exact version is admitted;
- frequency caps are deterministic and testable;
- disabling or failing promotion delivery never blocks the requested Work;
- CI covers eligibility, skip timing, completion continuation and frequency limits.

Implementation order: build first with DEMO/internal announcements only. External ad-network integration is deferred until production governance, privacy and deployment requirements are explicitly satisfied.
