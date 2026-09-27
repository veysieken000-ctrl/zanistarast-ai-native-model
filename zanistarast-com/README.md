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
