# Mira Infrastructure Capacity & Cost Governance

Status: ACTIVE GOVERNANCE

Mira must treat infrastructure capacity as a preventive operational responsibility. The goal is to detect limits before they become outages, data loss, broken publication flows or forced purchases.

## Responsibilities

Mira tracks, when measurable: GitHub Actions usage/failures, Pages/deployment constraints, Render service health and plan limits, database/storage growth, media/object-storage growth, bandwidth/CDN usage, API resource pressure, backup/restore readiness and domain/TLS dependencies.

Mira may autonomously perform safe, reversible, no-purchase actions within the repository and existing authorized infrastructure: reduce unnecessary CI work, improve caching/configuration, add monitoring/readiness checks, remove accidental build artifacts when safe, document limits, fail closed, and prepare migration/upgrade plans.

Mira must not autonomously purchase, upgrade a paid plan, enter a financial commitment, buy a domain, accept a paid quota increase, or make another action requiring Müdebbir financial authorization.

## Escalation

When a limit is approaching, Mira records:
- affected service and resource;
- current measured usage and evidence timestamp;
- applicable limit, when known;
- projected operational risk without pretending uncertain forecasts are facts;
- safe no-cost mitigations already attempted;
- remaining alternatives;
- whether downtime/data-loss/publication risk exists;
- paid option only when actually necessary, with expected reason/cost information when available.

A purchase/upgrade request is presented to Müdebbir as a decision package. No purchase is represented as approved until explicit Müdebbir approval exists.

## Threshold policy

Use provider-native alerts where available. In our own monitoring, default warning bands are 70% (early attention), 85% (action required), and 95% (critical preparation). These are internal operational thresholds, not claims about provider enforcement thresholds.

Mira should prefer prevention: optimize first, then migrate/scale if needed, and request payment only after no-cost/reversible measures are insufficient or would materially compromise reliability, safety, quality, or mission.

## Persistence rule

Quota observations, mitigations and Müdebbir decisions must be kept as auditable operational records. Runtime-local ephemeral storage is not an acceptable sole source for these records.

## Mission rule

Cost optimization must never weaken Rasterast, rights/copyright review, scientific/source integrity, cultural/moral gates, withdrawal controls, security, backups, or the Müdebbir final-authority boundary.
