# zanistarast.com application skeleton

This directory is the separate public-media application boundary for roadmap item 28. It does not publish the repository's current .org working articles.

## Local run

Serve this directory with any static HTTP server. ES modules and the service worker require HTTP rather than opening index.html directly from disk.

Example:

```sh
python3 -m http.server 8080 --directory zanistarast-com
```

Then open localhost:8080.

## Smoke test

Requires Node.js:

```sh
node zanistarast-com/test.mjs
```

The fixture works are intentionally marked DEMO and are not publication records.

## Readiness boundary

The code-side implementation packages A-G and the final UI/i18n cleanup are complete. Production activation remains deliberately blocked on the external evidence recorded in `readiness-state.json`.

Until those dependencies exist, the application MUST NOT claim production readiness, domain activation readiness, or live-content readiness. In particular, real admitted production records, production account/index services, final media/accessibility review, HTTPS API/storage, deployed accessibility/performance evidence, restore/withdrawal drills, release smoke, deployment approval, and domain/DNS/TLS/CORS/PWA verification remain activation-time dependencies.

This keeps the static branch useful for development and CI without substituting demo fixtures or code-side checks for real production evidence.

## Current scope

- Home / Discover / Search
- canonical demo Work route
- responsive wide/narrow layout
- expandable reading and source/trust disclosure
- Like/Save UI boundary
- eligibility-first fixture selector
- PWA manifest and service-worker shell
- keyboard/accessibility baseline

Production content ingestion, authentication, persistence, media streaming and recommendation services are later implementation layers and must preserve the governance documents under docs/zanistarast-com/.

## Portability and media-storage boundary

Zanistarast.com MUST remain portable across hosting, storage and CDN providers. GitHub is the source-code and CI/development boundary, not the long-term origin for large production video/audio assets.

- Do not make published media depend on large binary files committed to this repository.
- Media records must reference provider-neutral URLs/identifiers and keep content metadata separate from storage implementation details.
- Player, catalog, search and governance logic must not depend on a single commercial storage/CDN vendor.
- A future migration to Zanistarast-owned/company-operated infrastructure, object storage, CDN or another provider must be possible by changing adapters/configuration and migrating assets, without rewriting public content records or the player.
- Keep canonical content identity, versions, rights/governance evidence, captions/transcripts and checksums exportable independently of the media host.
- Production backup/restore and bulk export/import are required before treating any storage provider as a durable production home.

This is a permanent architecture constraint: growth may justify company-owned infrastructure later, but ownership of the data model and easy transferability take precedence over any current hosting provider.
