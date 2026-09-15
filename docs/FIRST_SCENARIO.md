# First scenario: from declaration to process

Status: design proposal; not implemented or laboratory-validated.

## Preconditions

An existing healthy cluster, one control-plane node, two workers, working networking, reachable image registry and an authenticated authorized user. Namespace `atlas-demo` already exists. A single-container Deployment requests one replica, resource requests/limits and an HTTP readiness probe. No Service or persistent volume is required. A pedagogical scheduler tie-break selects worker-01; this is not a universal scheduling guarantee.

## Reference profile proposal

Use Kubernetes v1.34 as a bounded educational baseline, not a claim about the latest release. Pin an exact patch and matching code references before implementation acceptance. Linux with cgroup v2, containerd via CRI and runc; Flannel VXLAN and kube-proxy iptables as the proposed explanatory network profile. Pin and verify actual compatible component versions in the later laboratory environment. The first scenario treats detailed packet routing as a collapsed substep.

Historical comparison: dockershim integration before/after v1.24, limited to the runtime chain; not full support for those historical releases. UI must explicitly label comparison scope.

## Observable checkpoints

| Step | Actor and trigger | State change | Inspection |
| --- | --- | --- | --- |
| 1 | kubectl submits a declarative request | API request begins; no running application yet | Manifest and request intent; apply mode explicitly identified |
| 2 | API server processes the request | Authentication, authorization, admission and validation succeed; Deployment is persisted through etcd | Object UID/spec and response; detailed pipeline expandable |
| 3 | Deployment controller observes desired state | ReplicaSet is created through the API | Owner reference and desired replicas |
| 4 | ReplicaSet controller observes missing replica | Pod object is created through the API, without node assignment | Pod UID and empty nodeName |
| 5 | Scheduler observes an unscheduled Pod | Filters/scores nodes and records binding through API | Feasibility, selection rationale and nodeName |
| 6 | kubelet observes the assigned Pod | Node-local reconciliation starts | Desired Pod versus runtime observations |
| 7 | kubelet requests sandbox/runtime preparation via CRI | Runtime creates sandbox and invokes configured CNI; required mounts/images prepared | Separate CRI, CNI and Linux boundaries |
| 8 | Runtime creates and starts application container | Application process runs with configured isolation/resources | Runtime/container identity, process, namespaces and cgroup |
| 9 | kubelet evaluates probe results and reports status | Readiness becomes true after successful probe | Running versus Ready; status changes |
| 10 | Controllers observe updated state | Deployment availability is reported | Desired versus available replica count |

Checkpoints are a selected causal trace, not a universal serial execution schedule. Image/volume preparation and status updates may interleave. Communication routes through the API must not be drawn as direct controller-to-controller commands. The scheduler never starts containers. A Service is not created automatically.

## Replacement branch

After readiness, user requests Pod deletion. Show deletion intent and kubelet termination/grace handling. ReplicaSet reconciliation creates a new Pod with a new UID; scheduling and runtime preparation repeat. Old termination and new creation can overlap. A replacement can use another node. Container restart within a surviving Pod is a separate mechanism.

## Failure coverage

First implementation: unauthorized request stops before successful persistence; unschedulable Pod remains unassigned with a reason; failed readiness leaves a running container unready. Full image-pull/network/storage failures are subsequent scenarios.

## Acceptance

Forward/back/reset reproduce the chosen trace; actor, trigger and changed state are visible at each step. All conceptual IDs resolve. API objects and node processes remain visually distinct. Selection works with keyboard via the component list. No real timings, addresses or logs are claimed unless captured from a laboratory; illustrative values are marked.

## Primary references

- https://kubernetes.io/docs/concepts/architecture/controller/
- https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/
- https://kubernetes.io/docs/concepts/containers/cri/
- https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/

Replace general links with release-pinned evidence at implementation review.
