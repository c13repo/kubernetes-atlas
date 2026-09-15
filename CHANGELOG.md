# Changelog

## Unreleased

### Planning

- Recorded the English-only Kubernetes Atlas scope and staged roadmap.
- Added initial coverage, architecture, contribution, and version-maintenance documentation.
- Allowed CDNs for the initial release; deferred self-contained and offline operation.

No application features have been implemented yet.

- Completed a source-level Human Atlas reuse audit and drafted the first scenario and UI review specification.

### Implemented prototype

- Added a 3D cluster explorer with selection, search, layers, isolation and camera controls.
- Added creation and replacement causal traces with playback and inspection.
- Added build scripts and scenario/gesture checks.

### Maritime studio redesign

- Adopted the Human Atlas light studio palette, font stack and floating panels; added a dark theme toggle.
- Replaced abstract blocks with a procedural harbor, ships, crane, captain bridge and cargo.
- Added a beginner maritime guide for components and both scenarios, with technical names and metaphor boundaries.

- Increased model color separation: navy/teal ships, blue control buildings, violet ledger, amber crane and terracotta cargo; matched catalogue markers.

- Specified the piece hierarchy, reference-ship inventory, scope-based explosion behavior and modeling acceptance criteria in docs/PIECE_HIERARCHY.md.

- Implemented an eight-scope anatomy explorer with local exploded views, breadcrumbs, isolation and a two-container reference Pod; retained the existing guided scenarios. Added hierarchy/identity/layout checks.

### Fleet explosion fix

- Replaced three closed fleet groups with a 27-piece detailed inventory.
- Removed slider-driven camera resets and added numbered labels to avoid overlapping names.
- Added direct access to each source level; moving the slider clears isolation.
- Added regression checks for fleet component presence and substantial displacement.
