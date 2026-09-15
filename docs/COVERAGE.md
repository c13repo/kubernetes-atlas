# Coverage matrix

This is an initial domain inventory, not a claim of exhaustive coverage. The current prototype has basic descriptions and authored creation/replacement traces for seven components; detailed coverage below remains planned. Each domain must be expanded into individual mechanisms with prerequisites, versioned sources, explanation, visualization, scenario, and lab status.

| Domain | Mechanisms to inventory |
| --- | --- |
| Principles | Declarative state, reconciliation, asynchronous work, idempotence, retries, consistency, concurrency |
| Object model | Identity, labels, selectors, namespaces, spec/status, conditions, generation, resourceVersion, ownership |
| API | Authentication, authorization, admission, validation, persistence, List/Watch, server-side apply |
| Controllers | Informers, caches, queues, backoff, leader election, finalizers, garbage collection |
| Scheduling | Queues, filtering, scoring, binding, affinity, topology, preemption |
| Node | kubelet reconciliation, probes, status reporting, resource managers, eviction |
| Runtime and Linux | CRI, OCI, images, sandbox, processes, namespaces, cgroups, mounts, signals |
| Networking | CNI, IPAM, veth, routing, overlays, Services, EndpointSlices, DNS, NAT, conntrack, policies |
| Storage | Volumes, PV/PVC, provisioning, CSI, attachment, mounting, reclamation |
| Workloads | Deployment, ReplicaSet, StatefulSet, DaemonSet, Job, CronJob, scaling, rollout |
| Security | PKI, RBAC, service accounts, secrets, capabilities, seccomp, security contexts |
| etcd | Raft, quorum, revisions, failure, backup, restore |
| Operations | Bootstrap, node discovery, partitions, upgrades, version skew, observability |
| Extensions | CRDs, conversion, admission webhooks, custom controllers, operators |

## First scenario specification target

Deployment request → API acceptance and persistence → Deployment and ReplicaSet reconciliation → Pod creation → scheduling → kubelet/runtime preparation → process execution → probes and status.

Each transition must identify the actor, trigger, observed information, resulting state, failure behavior, and sources. Independent control loops must remain distinguishable.

## Modeling inventory

[Piece hierarchy](PIECE_HIERARCHY.md) defines reference-ship pieces, technical overlays, typed relationships and delivery stages. These pieces are specified, not yet modeled.
