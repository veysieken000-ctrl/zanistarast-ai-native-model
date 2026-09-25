# Zanistarast.com — Cross-Device Mobile-First Experience

Status: LOCKED — Roadmap item 22

## Principle

zanistarast.com is one platform across devices, not separate “phone” and “computer” products. The interaction model should provide the kind of continuity users expect from mature media platforms such as YouTube while retaining Zanistarast's own design, governance and content model.

Android and Windows are first-class target environments. Standards-based web/PWA architecture should also remain compatible with modern browsers and capable of expanding to other platforms.

## One product, adaptive interface

The same canonical WORK, REPRESENTATION, account state and governance data serve every device.

The interface adapts to:
- screen size and orientation;
- touch versus mouse/keyboard;
- available media capabilities;
- network and device performance;
- installed PWA versus browser context.

Device adaptation must not create conflicting content identities or review states.

## Android

Phone/tablet experience should prioritize:
- touch-friendly controls and targets;
- responsive portrait and landscape layouts;
- player-first work pages;
- related works below primary content on narrow screens;
- efficient scrolling and expandable reading;
- preservation of playback position through orientation changes where feasible;
- captions/subtitles and fullscreen;
- appropriate Android/PWA media controls where standards permit;
- low-bandwidth and rendition-aware media delivery;
- installable PWA experience where supported.

No essential action may depend on hover.

## Windows

Desktop/laptop experience should prioritize:
- wide-screen player layouts;
- related works in a side rail when space permits;
- mouse and keyboard interaction;
- visible keyboard focus and shortcuts where appropriate;
- fullscreen and picture-in-picture where supported;
- readable expandable article/source areas;
- responsive behavior when windows are resized or snapped;
- installable PWA experience where supported.

Windows touch devices should continue to receive usable touch targets.

## Continuity across devices

When a signed-in user chooses synchronization and the feature exists, the platform may synchronize:
- Likes;
- Saved/Watch later;
- viewing/reading progress;
- language preferences;
- appropriate recommendation preferences.

A user may begin a work on Android and continue on Windows from the stored position when synchronization is available.

Anonymous viewing remains supported; cross-device synchronization may legitimately require an account.

## PWA foundation

The initial application architecture should prefer a standards-based responsive web/PWA foundation so a single product can serve Android and Windows without duplicating the entire application.

PWA capabilities may include, where platform support permits:
- installation;
- application icon/launch surface;
- standalone display;
- service-worker caching;
- safe update flow;
- media/session integration;
- notifications only when later justified and explicitly permitted.

PWA support is progressive enhancement. Core viewing/reading must continue to work in a supported browser when installation features are unavailable.

## Native future

The architecture must not prevent later native Android, Windows or other clients. A future native client should consume the same canonical backend/API, work IDs, representation IDs, governance states and account data rather than fork the content system.

Native development should be justified by capabilities or quality needs, not by duplicating an already functional product.

## Responsive breakpoints

Breakpoints should follow content needs rather than named device models. Layout changes when the available space no longer supports the current hierarchy.

Examples:
- narrow: one-column player/content/recommendations;
- medium: expanded controls and wider reading;
- wide: primary player/content plus related-work rail.

Exact pixel thresholds belong to implementation/design-system testing, not the canonical content model.

## Playback consistency

Across Android and Windows, common actions retain the same meaning:
- play/pause;
- seek;
- volume where platform permits;
- speed;
- captions/subtitles;
- quality;
- fullscreen;
- Like;
- Save;
- Share;
- Read/Understand;
- Source.

Platform-native behavior may differ, but the user's conceptual model should remain stable.

## Capability detection and fallback

The client should detect supported capabilities rather than assume them from a device name.

If picture-in-picture, a codec, installation, offline caching or another capability is unavailable, the interface should degrade gracefully and must not pretend the capability succeeded.

Unsupported media should fall back to an approved alternative representation when one exists.

## Performance

Mobile-first does not mean desktop-second. Both must be fast and usable.

The product should:
- avoid loading heavy related media before needed;
- use appropriate image/video renditions;
- lazy-load secondary assets;
- preserve readable text under weak connections;
- avoid blocking core controls on recommendation services;
- monitor real user performance by device class without collecting unnecessary personal data.

## Offline behavior

Future offline support may cache explicitly eligible assets and metadata. Cached content must respect withdrawal, rights and version policies when the application reconnects.

Offline availability must not become a permanent bypass around expired permissions or withdrawn content.

## Updates

Installed PWA clients must not remain indefinitely on incompatible application shells. Update strategy should preserve user state while moving safely to compatible versions.

Content/version governance remains server-authoritative where connectivity permits.

## Accessibility across input modes

The same feature must be operable with the input methods appropriate to the device:
- touch;
- mouse;
- keyboard;
- assistive technologies.

Touch optimization must not remove keyboard semantics; desktop optimization must not make touch unusable.

## Governance parity

Android, Windows, browser and future native clients consume the same admission decisions. No client may expose drafts, withdrawn works or blocked representations merely because its local UI or cache is older.

The applicable Qur'anic-ruling, Prophetic-ethics, Rasterast, rights, cultural and audience gates are platform-independent.

## Item 22 acceptance criteria

1. Android and Windows are first-class target environments.
2. One canonical platform/data model serves all device classes.
3. Android is touch-first and responsive in portrait/landscape.
4. Windows supports wide layouts, mouse and keyboard naturally.
5. Signed-in progress/likes/saves can synchronize across devices when implemented.
6. Anonymous viewing remains possible without synchronization.
7. Responsive PWA is the initial cross-device application foundation.
8. Browser use remains functional when install/PWA capabilities are unavailable.
9. Future native clients reuse the same backend and canonical IDs.
10. Breakpoints follow content needs rather than specific device models.
11. Capability detection provides graceful fallback.
12. Core playback/action meanings remain consistent across platforms.
13. Performance and low-bandwidth behavior are first-class concerns.
14. Offline caches cannot permanently bypass withdrawal/rights/version changes.
15. Accessibility works across touch, mouse, keyboard and assistive technologies.
16. Governance/publication gates remain identical across every client.
