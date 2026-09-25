# Zanistarast.com — Scalable Technical Architecture

Status: LOCKED — Roadmap item 27

## Principle

zanistarast.com must begin simple enough to build and operate safely, while preserving boundaries that allow it to grow to many works, representations, languages, media files, users, recommendations and Mira production jobs without redesigning the whole product.

Scale is not permission for premature complexity. Start with clear modular contracts; split services only when measured load, reliability or operational needs justify it.

## Logical architecture

The platform should preserve these logical boundaries:

1. PUBLIC CLIENT — responsive Web/PWA for Android, Windows and modern browsers.
2. PUBLIC/API APPLICATION — work pages, discovery, search-facing APIs, account-facing APIs and authorized administration.
3. CANONICAL CONTENT — WORK, REPRESENTATION, SOURCE, LANGUAGE_VARIANT, REVIEW_RECORD, RIGHTS_RECORD and relationships.
4. GOVERNANCE — Rasterast, rights, cultural/audience review and Müdebbir decision state.
5. MEDIA — originals, approved derivatives, posters, subtitles, audio/video renditions.
6. DISCOVERY — search index, themes/values, collections and recommendation eligibility/ranking.
7. USER STATE — likes, saves, progress and permitted preferences.
8. PRODUCTION — Mira research/generation/review jobs and their artifacts.
9. AUDIT/OBSERVABILITY — decisions, versions, errors, performance and operational events.

These are logical modules first; they do not require separate network services on day one.

## Canonical identifiers

Stable identifiers must exist for at least:
- work;
- representation;
- language variant;
- source;
- media asset/version;
- review record;
- rights record;
- publication decision;
- user-state references where applicable.

URLs and UI labels must not become the primary database identity.

## Primary transactional data

A relational database is the default authoritative store for structured canonical state because relationships, review states and version integrity matter.

The schema should support migrations, constraints and transactional updates. Search indexes, caches and recommendation stores are derived views, not the source of truth for publication eligibility.

## Media/object storage

Large video, audio, images, subtitle files and generated artifacts must not be stored as ordinary relational database blobs or committed into the application repository at production scale.

Use object/media storage with:
- immutable/versioned object identity where practical;
- content type and size metadata;
- integrity checks;
- access policy;
- lifecycle/retention rules;
- rights/publication state linkage.

Public delivery may later use CDN/edge caching, but origin metadata remains authoritative.

## Media processing

Upload/generation and playback delivery are separate concerns.

A production media pipeline may asynchronously create:
- normalized masters;
- streaming renditions;
- thumbnails/posters;
- captions/subtitle packages;
- audio renditions;
- accessibility derivatives.

A derivative is not public merely because transcoding succeeded. It inherits/receives the required representation-level review and eligibility state.

## Background jobs

Long-running work must not block normal HTTP requests.

A durable job/queue model should handle tasks such as:
- Mira production;
- media transcoding;
- subtitle generation;
- search indexing;
- dependency re-review;
- correction propagation;
- notification preparation;
- analytics aggregation.

Jobs should be idempotent where feasible, retry safely, record failure and never convert a technical retry into duplicated publication.

## Publication boundary

Public serving should resolve only records whose exact version is eligible.

A centralized eligibility decision should be reusable by:
- work page;
- search;
- recommendations;
- related works;
- autoplay;
- collections;
- PWA/API clients.

No downstream service may independently reinterpret DRAFT or WITHDRAWN as public.

## Search

Search is a derived index built from eligible canonical records.

It should support:
- multilingual fields;
- title/summary/transcript where permitted;
- theme/value metadata;
- source/culture metadata;
- filters;
- language variants.

Index lag must fail safely: withdrawal/removal signals require priority invalidation so stale search does not remain a publication bypass.

## Recommendation

Recommendation architecture remains two-stage:
1. eligibility from canonical governance/publication state;
2. ranking among eligible candidates.

Ranking may scale independently later, but cannot own or override admission state.

## User state separation

Likes, saves, history/progress and recommendation preferences should be stored separately from canonical work/review records.

A surge in engagement writes must not lock or corrupt publication/governance data.

Privacy, retention and deletion policies must be implementable without deleting the canonical public work history.

## Caching and CDN

Cache immutable/versioned assets aggressively where appropriate; cache mutable eligibility/publication views carefully.

Use versioned URLs or equivalent invalidation strategies for media derivatives.

Withdrawal/correction must propagate through:
- API caches;
- page/data caches;
- search indexes;
- recommendation pools;
- CDN/public asset exposure where controllable;
- PWA caches on reconnection.

## API contracts

Public and future native clients should consume explicit versioned contracts rather than database tables directly.

Contracts should expose only necessary fields and distinguish:
- canonical IDs;
- display/localized fields;
- publication eligibility;
- source/provenance summaries;
- media capabilities.

Administrative/reviewer APIs require stronger authorization and must not be exposed through public-client assumptions.

## Authentication and authorization

Roles/capabilities should be explicit and least-privilege:
- public/anonymous;
- authenticated user;
- production/editor/reviewer roles as later defined;
- Müdebbir authority.

Müdebbir capability is not implied by administrator access unless governance explicitly grants it.

Secrets remain in secure runtime configuration, never committed to source or emitted to client bundles/logs.

## Reliability

The public experience should degrade gracefully:
- recommendation outage does not block a known eligible work;
- analytics outage does not block playback;
- Mira/provider outage does not break already published content;
- optional personalization failure falls back to eligible non-personalized discovery;
- media-processing failure leaves the candidate unpublished rather than serving a broken derivative.

## Observability

Production should eventually monitor:
- API latency/error rates;
- media delivery failures;
- queue depth/job failure;
- search indexing lag;
- publication/withdrawal propagation;
- client performance by broad device class;
- security/auth anomalies;
- storage/database health.

Observability must avoid logging secrets or unnecessary sensitive user data.

## Security

Apply defense in depth:
- HTTPS;
- secure session/token handling;
- input validation;
- authorization at server boundaries;
- upload type/size controls;
- media isolation;
- dependency/security updates;
- rate limiting/abuse controls where needed;
- auditable privileged actions;
- backup/restore testing.

Generated media/content is untrusted input until validated.

## Backup and disaster recovery

Canonical database and critical source/review metadata require tested backups.

Object storage should use durability/versioning appropriate to the deployment. A backup strategy is incomplete until restoration has been tested.

Derived indexes/caches should be reproducible from canonical data where feasible.

## Deployment environments

Keep development, test/staging and production configuration distinguishable.

Production domain/API/storage credentials must not be required to build the product skeleton. The current absence of the final zanistarast.com domain must not force premature DNS/hosting configuration.

## Evolution strategy

Initial implementation may be a modular monolith plus relational database, object storage and background worker/queue.

Split into independently deployed services only when evidence justifies it, such as:
- media processing saturation;
- search scale;
- recommendation compute;
- Mira production isolation;
- reliability/security boundary;
- independently scaling public API.

Preserve contracts so such extraction does not change WORK identity or governance semantics.

## Scale targets are measured, not invented

Do not claim an arbitrary user/video capacity before load tests and infrastructure measurements exist.

Architecture should support horizontal growth where appropriate, but capacity statements must be based on observed tests, storage/network limits and deployment configuration.

## Item 27 acceptance criteria

1. Canonical content, governance, media, discovery, user state and production are logically separated.
2. Stable IDs do not depend on URLs/display names.
3. Relational canonical state remains authoritative over caches/indexes.
4. Large media uses object/media storage rather than repository/database blobs.
5. Media processing and Mira work can run asynchronously.
6. Technical job success never equals publication approval.
7. All public surfaces reuse canonical eligibility decisions.
8. Search/recommendation cannot bypass withdrawal or Rasterast.
9. User engagement state is separated from canonical governance.
10. Cache/CDN/PWA strategies account for corrections and withdrawals.
11. Public/native clients use explicit API contracts.
12. Privileged/Müdebbir actions use least-privilege authorization.
13. Optional subsystem failure degrades gracefully.
14. Backups and restoration are part of production readiness.
15. Initial architecture may remain a modular monolith and split only on evidence.
16. Capacity claims require measurement/load testing rather than guesswork.
