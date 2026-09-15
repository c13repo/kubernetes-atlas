# Human Atlas reuse audit

Audited revision: `1c38bf35c254a891200d3cedecfd57abebe83d8d`.
Source: https://github.com/ashemag/human-atlas/tree/1c38bf35c254a891200d3cedecfd57abebe83d8d

Method: read the actual source for page, scene, data model, pointer handling, explosion layout, model decoding, interaction validation, and package configuration. No upstream runtime or browser performance tests were run. No code has been imported.

| Source | Finding | Decision |
| --- | --- | --- |
| app/pointer-tap.ts | Independent gesture classifier; handles drag, multiple pointers and cancellation | Reuse with MIT notice and retained behavioral checks when implementing 3D selection |
| app/page.tsx | Selection, reset, search, layer controls and inspector orchestration; anatomy-specific concepts and copy | Adapt interaction patterns and selected UI code, replacing domain assumptions |
| components/ui | Shared UI primitives | Import only used components and their actual dependencies after individual review |
| app/scene.tsx | Three.js OrbitControls, picking, resize, resource disposal; strongly coupled to Part bounds, binary chunks, anatomy systems and body-centered camera offsets | Implement a Kubernetes scene; selectively adapt camera/picking/disposal patterns |
| app/explosion-layout.ts | Shelf packing of visible mesh bounds | Do not use for cluster topology; use semantic placement preserving node membership and communication relationships |
| app/model-download.ts | Binary size checks and gzip detection | Defer; initial procedural cluster geometry does not require anatomical binary assets |
| app/anatomy.ts | Domain types and explanations | Replace entirely with Kubernetes entities, typed relationships, profiles and mechanism content |
| scripts/validate-interactions.mjs | Useful tap/drag cases; packing and tool assertions depend on anatomy catalogue | Preserve relevant gesture checks; author scenario and topology checks separately |
| package.json | Contains UI, server-component and hosting dependencies beyond the planned static explorer | Create a minimal dependency set; do not copy the manifest wholesale |
| public/models and conversion scripts | Anatomy-specific geometry and build pipeline | Exclude |
| app/agent-tools.ts | Optional anatomy search/inspection integration | Defer; not required for the first educational release |

## Recommended foundation

React + TypeScript + Vite for the application, Three.js for the cluster view, HTML/SVG for detailed flows. Confirm exact dependency versions during implementation. Start with procedural geometry and explicit HTML labels. Avoid the source's merged-mesh shader approach until measured scene size justifies it.

Separate semantic entities from render objects: an API Pod object, a node-local sandbox, and an application process must have distinct identities linked by typed relationships. Selection is shared between 3D and 2D views.

## Licensing

Retain upstream copyright and MIT text for copied code, record original paths and revision. Do not import BodyParts3D data. CDN resources require a version/license inventory and an eventual local replacement path.

## Limits

This is a source audit, not a promise of performance or a percentage of code reuse. Reusable interaction code reduces setup work; scenario semantics and version-aware content remain new work.
