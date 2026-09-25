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
