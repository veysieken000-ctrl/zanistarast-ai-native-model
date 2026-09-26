# .org ↔ .com Mira Discovery Bridge

Status: ACCEPTED DIRECTION — queued after the current Package H unless a dependency requires earlier contract work.

## Purpose

Create a governed two-site discovery bridge without collapsing the roles of the sites:
- **zanistarast.org** remains the scientific/academic source, verification and publication layer.
- **zanistarast.com** remains the public learning/media/discovery layer.
- Mira/AI Search may answer a public question and route the person to the best eligible destination: scientific source on .org, public explanation on .com, or an admitted film, documentary, interview, talk, presentation, audio or other representation.

## Query flow

A question may be interpreted once by Mira and searched across two separately governed indexes:
1. eligible/published .org scientific records;
2. admitted .com public works and media records.

Results preserve origin, version, language, source/provenance, content type and admission state. A .com explanation must link back to its .org scientific source when it is derived from one. Search/recommendation relevance never changes scientific or publication status.

## External discovery and ingestion

Mira may discover public material from the wider world that is genuinely relevant to Zanistarast, Newroza Kawa, scientific presentations, discussions, interviews, conferences or related public-learning material. Discovery alone **must not automatically publish or copy it to .com**.

The automated pipeline is:
DISCOVER → RECORD SOURCE/URL/METADATA → DEDUPLICATE → RELEVANCE CHECK → RIGHTS/LICENSE CHECK → SOURCE/TRUST CHECK → RASTERAST + CULTURAL/MORAL REVIEW AS APPLICABLE → REPRESENTATION/EMBED/LINK DECISION → MÜDEBBIR WHEN REQUIRED → ADMIT → INDEX.

Copyrighted third-party media is linked/embedded only when lawful and permitted; otherwise Mira may retain metadata/reference for research but must not rehost/copy the work. Public-domain/open-license/permission-granted material may be ingested only under its terms.

## Automation boundary

Mira may automatically discover, classify, deduplicate, prepare candidate records, refresh metadata, detect broken/withdrawn sources, and prepare review packages. It may automatically index content that has already passed the required admission rules.

Mira must not turn an unreviewed web discovery into public .com content merely because it is relevant. Payment, popularity, search score or similarity cannot bypass admission.

## Cross-site contract

Each bridge record should support:
- canonical ID and exact version;
- origin (.org / .com / external);
- canonical URL;
- title and localized public title;
- content/media type;
- language;
- topics/concepts;
- source/provenance;
- rights/license status;
- scientific/publication status where applicable;
- Rasterast/public-admission status;
- related .org/.com records;
- withdrawal/supersession state;
- indexedAt / checkedAt.

## User experience

Mira should answer first, then provide meaningful next steps rather than a raw search dump: for example **Bilimsel kaynağı oku**, **Kısa açıklamayı izle**, **Belgeseli izle**, **Söyleşiyi dinle**, or **Sunumu aç**. The destination must be clearly identified as Zanistarast-owned or external.

## Safety and freshness

Withdrawn, superseded, rights-revoked, blocked or no-longer-available material is removed from public discovery promptly while retaining an auditable record where appropriate. Time-sensitive external metadata must carry a last-checked time and be revalidated rather than treated as permanently true.
