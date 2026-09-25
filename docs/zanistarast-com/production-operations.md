# Zanistarast.com — Production Operations Readiness

Status: PRE-DOMAIN / NOT DEPLOYED

## Environments
Local, staging and production are separate. Production must use HTTPS for its API boundary. Public browser configuration contains only environment name and API base; secrets, database credentials, storage credentials and signing keys must never enter client JavaScript or the repository.

## Withdrawal propagation
Governed work/API responses are network-only (`no-store`) at the service-worker boundary. Shell assets may be cached, but a withdrawn/blocked work must not be resurrected from an offline content cache. The server/API remains authoritative for current admission state.

## Backup and restore
Before production activation, document and test database backup cadence, object-storage backup/versioning, isolated restore, Work + Representation exact-version integrity, and withdrawal state after restore. A backup existing is not equivalent to a tested restore.

## Observability
Production readiness requires health checks, structured server logs, error-rate/latency monitoring and alerts for ingestion/admission/withdrawal failures. Private review evidence and secrets must not enter browser telemetry.

## Domain and TLS
Do not add a production CNAME or claim zanistarast.com is live until a verified deployment exists and the domain is acquired/configured. Then verify DNS, HTTPS, PWA scope, API CORS and withdrawal propagation end-to-end.

## Release gate
Before domain activation: smoke tests green, accessibility/performance checks, secrets scan, tested restore, production API/storage configured, withdrawal test and explicit deployment approval.
