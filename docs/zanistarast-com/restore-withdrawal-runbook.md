# Production Restore & Withdrawal Runbook

Status: REQUIRED BEFORE PRODUCTION / NOT YET EXECUTED

## Restore drill
1. Create a backup snapshot without exposing credentials in logs.
2. Restore database and object metadata into an isolated non-production environment.
3. Verify Work IDs, Representation IDs and exact versions against the source snapshot.
4. Verify admitted, blocked and withdrawn states independently.
5. Verify media objects referenced by admitted exact versions and confirm missing objects fail closed.
6. Record drill timestamp, backup identifier, restore target, integrity results and reviewer. Do not mark `restoreTested` true until this drill succeeds.

## Withdrawal drill
1. Start with an admitted test work in staging.
2. Change its authoritative state to WITHDRAWN.
3. Request direct work route and discovery/search endpoints.
4. Confirm it is absent/rejected and cannot be recovered from service-worker content cache.
5. Confirm related/recommendation output excludes it.
6. Record exact work/version and evidence. Do not mark `withdrawalTested` true until all paths pass.

## Failure rule
Any failed restore integrity check or stale withdrawal path blocks production/domain activation. Do not bypass by clearing a single browser cache; the authoritative fix must propagate system-wide.
