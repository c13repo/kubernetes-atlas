# Roadmap

## Milestone 0 — Specification and review

- Audit Human Atlas code for reusable UI and viewer functionality.
- Define a reference Kubernetes release and compatible Linux/runtime/network profile.
- Expand the coverage matrix into individual mechanisms and prerequisites.
- Specify the first scenario and produce a UI mockup for user review.

Exit: reviewed scope and mockup before full application implementation.

## Milestone 1 — First usable explorer

- English-only interface and content.
- Cluster overview, layers, selection, isolation, search, and inspection.
- Step controls and inspectable state transitions.
- Deployment creation and Pod replacement scenarios.
- Reference release plus a limited, documented historical comparison.
- Reproducible setup, build, and relevant checks.
- CDNs permitted; external dependencies recorded and pinned where possible.

## Subsequent modules

1. Packet paths, DNS, Services, CNI, and network policies.
2. Linux resource management, OOM, eviction, and node failures.
3. Persistent storage and CSI.
4. Security and identity.
5. Advanced control-plane internals and etcd.
6. Bootstrap, upgrades, custom controllers, and operators.
7. Additional validated Kubernetes versions and cluster profiles.

## Self-contained and offline release

- Replace external runtime assets with bundled resources.
- Verify operation with external domains blocked.
- Add explicit offline download/cache management and update behavior.
- Test fully disconnected use after required content is installed.

Dates and complete historical version coverage are not committed yet.
