# Piece hierarchy and reference ship specification

Status: target specification with a first procedural hierarchy implementation. See the implementation status below; this document is not a claim that every target detail is complete. Product labels and descriptions are English-only.

## 1. Three different kinds of structure

The explorer uses a navigation tree and a relationship graph. The tree is a learning path, not a claim that all software concepts are physical children of one another.

- **Model parts**: hull, bridge, crane, cargo frame. These are selectable 3D representations.
- **API objects**: Node, Pod, Deployment, ReplicaSet, Service, PVC, etc. These appear as linked manifest cards, not as objects literally stored inside a ship.
- **Mechanisms and boundaries**: CRI calls, namespaces, cgroups, mounts, routing. These appear as diagrams, boundaries and animated connections when drilling down.

Relations must be labeled: `runs on`, `assigned to`, `owns`, `observes`, `requests via`, `shares`, `mounts`, `routes to`. Visual parenthood alone must never imply API ownership or a network route.

## 2. Navigation hierarchy

```text
Cluster / Fleet
├── Control plane / Harbor administration
│   ├── API server / Harbor office
│   │   ├── Authentication and authorization
│   │   ├── Admission and validation
│   │   └── API storage, List/Watch and object inspection
│   ├── etcd / Harbor ledger
│   │   ├── API records and revisions
│   │   └── Member replication and quorum [later HA profile]
│   ├── Controllers / Fleet supervisors
│   │   ├── Deployment controller
│   │   ├── ReplicaSet controller
│   │   └── Other controllers [later]
│   └── Scheduler / Cargo planner
│       ├── Scheduling queue
│       ├── Filter and score
│       └── Binding through the API
├── Worker node / Ship [repeat per node]
│   ├── Node identity and capacity / Hull and capacity plate
│   ├── kubelet / Captain's bridge
│   │   ├── Assigned Pod observation
│   │   ├── Runtime reconciliation
│   │   └── Probes and status reporting
│   ├── Container execution / Loading machinery
│   │   ├── CRI boundary
│   │   ├── containerd / Machinery housing
│   │   ├── Runtime shim / Control linkage
│   │   ├── OCI runtime / Actuator
│   │   └── Image content and snapshots / Supply store
│   ├── Workload group / Cargo area
│   │   └── Pod / Shared cargo frame [repeat per Pod]
│   │       ├── Linked Pod API record
│   │       ├── Runtime sandbox [implementation view]
│   │       ├── Container A / Application container
│   │       │   ├── Application process
│   │       │   └── Root filesystem and writable layer
│   │       ├── Container B / Helper container
│   │       │   ├── Helper process
│   │       │   └── Separate root filesystem and writable layer
│   │       ├── Shared network context
│   │       └── Declared volume and per-container mounts
│   └── Linux foundation / Cutaway below deck
│       ├── Shared host kernel
│       ├── Namespace memberships
│       ├── Cgroup hierarchy and resource controls
│       ├── Filesystems and mounts
│       └── Network interfaces and routes
├── Network system / Communication routes [later module]
│   ├── Node interfaces, CNI and IP allocation
│   ├── Pod interfaces and inter-node routes
│   ├── Services and EndpointSlices
│   ├── Service implementation: kube-proxy or profile-specific alternative
│   ├── DNS / Directory service
│   └── NetworkPolicy and ingress/gateway implementations
├── Storage system / Stores and attachments [later module]
│   ├── Ephemeral volumes
│   ├── PVC, PV and StorageClass records
│   └── CSI controller/node operations and backing storage
└── API object catalogue / Orders and records
    ├── Deployment → ReplicaSet → Pod [ownership edges]
    ├── Node [assignment/capacity record]
    ├── Service → selected Pods / EndpointSlices [selection relationships]
    ├── ConfigMap, Secret and ServiceAccount
    └── Namespace, policies and other API resources [later]
```

The control plane is shown on a harbor platform for teaching; its processes also run on computers, often as static Pods. A later deployment view exposes that fact. Ships do not imply that only worker nodes have Linux kernels or runtimes.

## 3. Reference ship: model and interaction inventory

Milestone **R** is the realistic reference model and its basic inspection. **D** is complete decomposition and mechanism drill-down. **E** is later extension. All entries below are planned.

| Stable piece ID | Appearance / analogy | Actual concept | On selection | On decomposition | Stage |
| --- | --- | --- | --- | --- | --- |
| ship.node | Navy hull and removable deck | One Linux worker node | Node identity, capacity, assigned Pods; link to Node record | Deck separates from hull; functional groups remain attached by guide lines | R |
| ship.kubelet | Captain's bridge with windows | kubelet | Local responsibilities and API/CRI relationships | Bridge lifts as one semantic group; inner mechanisms open in 2D | R |
| ship.runtime | Amber crane and machinery housing | Container execution subsystem | Runtime overview; no Docker requirement | Crane remains decorative assembly; housing reveals runtime modules | R |
| runtime.containerd | Machinery module | containerd and CRI integration | Requests for sandbox/container operations | Separate from shim/OCI modules in technical view | D |
| runtime.shim | Small control module | Runtime shim for chosen implementation | Lifecycle supervision and process relationship | Link to runtime and processes; cardinality is profile-specific | D |
| runtime.oci | Actuator module | runc for chosen profile | OCI create/start operations | Show an operation, not a permanently running engine per container | D |
| runtime.images | Supply rack | Image content/snapshot storage | Read-only image content versus writable snapshots | Switch to layered filesystem diagram | D |
| pod.frame | Cargo frame with a visible enclosing outline | Pod execution grouping | One scheduling unit containing two containers; link to distinct API record | Frame opens and containers separate; shared-resource connections persist | R |
| pod.sandbox | Thin labeled platform under the frame | Runtime sandbox | Explain network setup and runtime-dependent implementation | Platform separates from containers; never called the Pod API object | D |
| pod.container.app | Terracotta corrugated container | Application container | Container identity, image, command and state | Door/cutaway reveals process marker and filesystem layers | R |
| pod.container.helper | Blue-green corrugated container | Second regular helper container | Separate image/process; same Pod assignment | Separates beside app container inside the same frame | R |
| process.app | Work indicator inside app container | Application process | Running versus readiness; Linux PID is illustrative unless observed | Separate marker linked to kernel mechanisms | R |
| process.helper | Work indicator inside helper container | Helper process | Independent process lifecycle | Separate marker; do not imply shared PID namespace by default | R |
| pod.network | Shared connection rail with boundary overlay | Shared network namespace in this profile | Shared IP/port space and localhost relationship | Overlay encloses both container endpoints, not two unrelated Pod IPs | D |
| pod.volume | Detachable storage chest with two mount connectors | Example emptyDir volume | Shared files only where each container explicitly mounts the volume | Chest separates; mount connections remain attached | R |
| container.filesystem | Layered plates shown on container drill-down | Image-based rootfs and writable layer | Each container has its own root filesystem | 2D layers show volume mount paths separately | D |
| linux.kernel | Labeled below-deck foundation plate | Shared host Linux kernel | Both container processes use the host kernel in this profile | No miniature kernel is placed in each container | D |
| linux.namespaces | Colored boundary overlays | Namespace memberships | Network, mount, PID, IPC, UTS; user namespaces depend on profile | Show shared versus separate memberships; not physical boxes | D |
| linux.cgroups | Resource allocation diagram | cgroup v2 hierarchy | CPU/memory constraints and usage versus declared requests | Show linked control groups, not a one-box-per-Pod universal rule | D |
| node.network | Side connection port | Node interface/routing | Node network versus Pod network | Network module opens with implementation-specific paths | E |
| node.storage | Below-deck store | Node filesystems and storage | Local versus externally backed storage | Storage module opens; no universal disk-per-Pod assumption | E |

### Modeling constraints

- One reusable ship model; node instances have separate semantic IDs.
- Distinct selectable groups for every R entry, including the shared volume and process markers. Technical overlays are separate assets, not baked labels on the hull.
- Cosmetic railings, bolts, doors, ropes and crane joints may be detailed meshes, but do not become Kubernetes concepts or increase the advertised concept count.
- The pod frame must visibly contain two containers; two containers do not mean two Pods.
- The helper is a second regular container in this teaching example. Native sidecar startup semantics are a separate, versioned lesson.
- No process identifier, address or telemetry is presented as captured data unless a lab produced it.
- Colors identify parts, not health: navy/teal nodes, muted blue control buildings, violet ledger, amber runtime machinery, terracotta application cargo. Labels and shapes also communicate identity.

## 4. Harbor inventory for extension

| ID | Visual | Drill-down | Explosion behavior |
| --- | --- | --- | --- |
| harbor.api | Harbor office | Request pipeline, API records and watch streams | Separate building; interior is a request-flow diagram |
| harbor.etcd | Ledger/archive building | Persisted records, revisions, members and quorum | One archive in initial profile; HA members only in a corresponding profile |
| harbor.controllers | Supervisor offices | Individual controller loops and their owned objects | Split by controller; keep API communication edges explicit |
| harbor.scheduler | Planning tower | Pending queue, filtering, scoring and binding | Open decision stages; no crane or process startup inside scheduler |
| harbor.registry | External supply warehouse | Image registry versus local image cache | Optional external dependency, separate from etcd |

## 5. Explosion interaction contract

1. **Cluster scope**: separate harbor and worker groups; preserve cluster membership.
2. **Node scope**: focus one ship; move bridge, runtime group, cargo group and foundation apart.
3. **Pod scope**: separate frame, sandbox representation, containers and declared volume.
4. **Container scope**: reveal process, filesystem and linked Linux boundary/resource diagrams.

The slider operates only on the current scope: 0% assembled, intermediate separation, 100% a readable inventory. It never recursively scatters every leaf from every scope at once. “Enter” moves down a level; breadcrumbs return up. The selected identity survives transitions. “Isolate” hides unrelated groups and fits the camera to the selected bounds. “Reset” restores the current scope; “Back to fleet” restores the overview.

At full separation, parts have non-overlapping labels and picking targets, linked to their origin. Guide lines mean visual membership, not actual network traffic. API, CRI, sharing and mount links use separately labeled relationship modes. No simulated state changes because the user moved the explosion slider. Reduced-motion mode uses immediate layout changes. Keyboard selection is available through the inventory.

On small screens, use a focused inventory or 2D detail view instead of shrinking all labels. A runtime profile change must not silently retain incompatible pieces.

## 6. Data contract for implementation

Each concept/instance needs: stable ID, instance ID when repeated, technical name, analogy name, representation kind, navigation parent, model group name, typed relationships, supported profile/version scope, beginner explanation, technical explanation, analogy limit, source references, assembly transform, explosion transform, bounds, interaction capabilities, and delivery status.

Separate `conceptId` (e.g. kubelet) from `instanceId` (e.g. worker-01/kubelet). Relate Pod API UID to execution objects rather than reusing the same identity. Mesh count and educational concept count are different metrics.

Suggested model node names: `ship_hull`, `ship_deck`, `kubelet_bridge`, `runtime_crane`, `pod_frame`, `container_app`, `container_helper`, `shared_volume`, `process_app`, `process_helper`. Unique instance prefixes are assigned by the application. GLB/glTF assets should retain these independently transformable groups, consistent units, pivots and material assignments. Runtime/kernel internals belong to separately authored diagrams rather than hidden decorative geometry.

## 7. Acceptance for the next milestone

- One realistic reference ship can be inspected without the rest of the fleet.
- The viewer can select the node, kubelet, runtime, Pod, both containers, both process markers and the volume independently.
- The beginner can distinguish Node, Pod, container and process, and identify what two containers share.
- A volume is shared only through explicit mounts; root filesystems remain separate.
- Moving a piece does not imply scheduling, migration or a real lifecycle event.
- Detailed railings and materials improve realism without hiding semantic boundaries.
- Assembled and exploded reference views are reviewed before scaling the asset set.

## 8. Primary references and validation status

Reviewed against the general documentation on 2026-09-15:

- https://kubernetes.io/docs/concepts/workloads/pods/
- https://kubernetes.io/docs/concepts/overview/components/
- https://kubernetes.io/docs/concepts/containers/runtime-class/

This inventory is a design baseline. Exact runtime implementation, feature gates, resource hierarchy and release-specific behavior still require pinned primary references and laboratory verification before detailed simulations are marked supported. It does not claim exhaustive coverage of Kubernetes.

## Implementation status

Implemented: eight navigation scopes; independently selectable reference pieces; local explosion slider; breadcrumb/up navigation; selection isolation and camera fitting; searchable scope inventory; technical/analogy boundary descriptions; two distinct container drill-downs with processes/filesystem/mount representations; text relationships; preserved guided scenario mode.

Remaining: final realistic asset production and material polish; removable doors/deck cutaway refinement; graphical origin/relationship lines; API record inspection; actual Linux boundary diagrams; version-aware detailed runtime behavior; full worker-02 instance inspection; broad mobile/device performance validation. The current explosion inventory is deterministic and does not simulate cluster state.
