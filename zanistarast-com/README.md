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

## Governed external contribution boundary

Zanistarast.com may later accept documentary, educational, scientific, historical, biographical, animation and other media proposals from people outside the core team, but submission is never publication.

- External contributors may submit a proposal or upload candidate media only into a quarantined, non-public intake area.
- Nothing becomes searchable, recommendable, playable on a public route, monetizable, or associated with a public creator/channel until the exact candidate version completes the same admission pipeline as first-party content.
- Admission is fail-closed. Required evidence includes provenance/identity, copyright or license rights, media/accessibility checks, advertising/sponsorship disclosure, cultural/visual review, Rasterast review and the final exact-version governance decision. Missing, expired or changed evidence keeps the candidate blocked.
- Review applies to the complete representation: video/audio, poster/thumbnail, title, description, captions, transcript, links, embedded promotion, clothing/visual material and later edits. A material edit creates a new version and requires re-review.
- External films, documentaries, cartoons or other copyrighted works are not copied or republished merely because they are valuable. They require documented permission/license or a lawful source/link/embedding basis before admission.
- Advertising, covert promotion, unsafe or governance-incompatible material cannot bypass admission through creator profiles, descriptions, links, thumbnails or sponsorships.
- Withdrawal and emergency unpublish remain available after admission; an admitted item can be suspended without deleting its audit/evidence history.

### Creator/channel and earnings rollout

Creator accounts, public channels and revenue sharing are deliberately **not part of the first rollout**. They add identity, moderation, copyright disputes, fraud/abuse, payment/tax/accounting, child-safety and ongoing enforcement obligations. The safer sequence is:

1. **Curated intake:** trusted staff can add content quickly through one governed intake form/import path.
2. **External proposals:** selected contributors can submit candidates, but only reviewers can admit them publicly.
3. **Verified contributors:** after the moderation and rights pipeline has real operational evidence, approved contributors may receive limited submission workspaces.
4. **Channels/earnings:** only after production identity, moderation, rights/dispute, accounting/payment and abuse controls exist and have been tested. Revenue eligibility must be separate from content admission.

This boundary is designed to enrich the catalogue without turning an upload button into a publication bypass. It also preserves the option to add creator channels later without rewriting the core content/admission model.
