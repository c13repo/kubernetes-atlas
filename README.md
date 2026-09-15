# Kubernetes Atlas

An interactive, English-only explorer of Kubernetes, from cluster architecture to Linux internals.

## Project status

An initial 3D concept explorer is implemented: component selection, orbit/zoom, layer visibility, isolation, layer separation, search, and two guided causal traces. This is an educational prototype, not a real cluster simulator.

## Product direction

- A 3D cluster overview with selection, isolation, layers, and search.
- Detailed 2D views of API exchanges, decisions, networking, and Linux resources.
- Inspectable, step-by-step educational simulations.
- Explicit Kubernetes version and cluster profile selection.
- Locally administered Linux clusters as the teaching environment.

The initial release may use CDNs. Fully bundled assets and offline operation are planned for a later release. Core educational content should remain versioned in this repository. External resources must be inventoried and replaceable with local assets.

## First release target

One control plane and two worker nodes; a Deployment creation scenario from `kubectl apply` to running processes and reported status; Pod replacement through reconciliation; one reference Kubernetes version and one narrowly scoped historical comparison.

Simulations are educational models, not a Kubernetes cluster running in the browser. Planned features are not implemented features.

## Development

Requires Node.js 22.18+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run check
npm test
npm run build
```

Deploy the generated `dist/` directory to a static host. No API keys or cloud accounts are required to run locally. The interface uses the same Inter/system font stack as Human Atlas, without a remote font request. Application dependencies are bundled.

## Design and beginner guide

The default is a light Human Atlas-inspired studio with floating panels. A Dark button switches appearance for the current session. Maritime guide is enabled by default; toggle it to return to technical explanations. Nodes are ships, the control plane is the harbor, kubelet is the local ship captain, and Pods are shared cargo units containing containers. Each analogy is accompanied by its technical limits.

## Current limits

- Version/profile switching and historical comparisons are planned, not implemented.
- The profile is conceptual; exact Kubernetes and runtime patch versions are not laboratory-validated.
- Worker-02 is contextual scenery; inspected worker components belong to worker-01.
- Timeline values are illustrative; forward/back navigate authored checkpoints.
- Network details, failure injection and full offline mode are future work.
- 3D requires WebGL; component descriptions and scenarios remain accessible without it.

## Documentation

- [Roadmap](ROADMAP.md)
- [Coverage](docs/COVERAGE.md)
- [Architecture decisions](docs/ARCHITECTURE.md)
- [Kubernetes version maintenance](docs/KUBERNETES_VERSIONS.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Third-party resources](THIRD_PARTY_NOTICES.md)

## Design review

- [Human Atlas reuse audit](docs/REUSE_AUDIT.md)
- [First scenario specification](docs/FIRST_SCENARIO.md)
- [Explorer UI specification](docs/UI_SPEC.md)

- [Piece hierarchy and reference ship specification](docs/PIECE_HIERARCHY.md)

## Hierarchical anatomy explorer

The default view now opens the Fleet. Select Worker node 01 and choose Enter to explore the reference ship. Continue into the reference Pod, either container, the runtime, or the Linux foundation. Use breadcrumbs or Up one level to return. The explosion slider affects only the open level; Isolate fits the selected piece, and Reset this level restores assembly without changing simulated cluster state. Guided scenarios remain accessible from the header.

Eight authored scopes are available. The reference Pod has two regular containers and an explicitly shared emptyDir; this model is separate from the original one-container scenario. Models are procedural, not scanned or final photorealistic assets. Runtime and Linux internals are illustrative representations with explanatory relationship text; animated mechanism diagrams, API manifest inspection and graphical connection overlays remain future work. Worker-02 is contextual and does not yet have a detailed instance view.

## Fleet explosion correction

Fleet now lists 27 detailed pieces from the control plane and reference worker rather than three closed groups. The slider moves those pieces into a numbered inventory; numbers match the list. Open a piece’s level for focused exploration. The camera no longer reframes continuously while the slider moves. Moving the slider exits isolation. Worker-02 remains a context model.
