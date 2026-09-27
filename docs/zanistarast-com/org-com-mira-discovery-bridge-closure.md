# .org ↔ .com Mira Discovery Bridge — Code-side Closure

Status: COMPLETE (code-side)
Date: 2026-09-27

## Completed boundary

The bridge preserves the distinct roles of the sites while enabling governed discovery across them:
- .org scientific/publication records are eligible only when PUBLISHED;
- .com records remain subject to their public admission/Rasterast boundary;
- external discoveries begin quarantined as DISCOVERED + UNVERIFIED and cannot enter public search directly;
- external admission requires suitable rights mode, source-trust PASS, Rasterast PASS and a recorded review time;
- rights revocation, withdrawal or source unavailability removes the record from public bridge eligibility;
- related records can produce meaningful next-step actions such as scientific source, video, documentary, interview, presentation or audio;
- local .com and bridge results can be merged with exact-version/source-aware deduplication without leaking blocked records.

## Verification

Latest merged-search verification:
- zanistarast-com-smoke #160 — SUCCESS
- zanistarast-com-preview #107 — SUCCESS

## Important scope

This closure establishes the contracts, eligibility gates, routing and merge layer. It does not claim that a live .org API/feed, live web crawler, production external discovery service or production .com domain is active. Those require the production/external activation dependencies already tracked separately.

No third-party copyrighted work is automatically copied or rehosted by this bridge. Discovery is not publication.
