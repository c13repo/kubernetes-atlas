# Maritime teaching model

The metaphor is an original teaching aid, not official Kubernetes terminology or an assertion that Docker Engine is required.

| Metaphor | Kubernetes concept | Boundary |
| --- | --- | --- |
| Fleet | Cluster | The cluster is a distributed software system |
| Harbor administration | Control plane | Several independent components, not one all-powerful captain |
| Harbor office | API server | Exposes and validates API operations |
| Ledger | etcd | API data, not container images or application volumes |
| Fleet supervisors | Controllers | Independent reconciliation loops |
| Cargo planner | Scheduler | Assigns a node, does not start containers |
| Ship | Worker node | Linux host, physical or virtual |
| Ship captain | kubelet | Local agent on each node |
| Loading machinery | containerd / runtime | CRI and OCI responsibilities remain distinct |
| Shared cargo unit | Pod | One or more containers sharing specified resources |
| Cargo container | Container | An execution environment; not a VM |
| Work inside cargo | Application process | Linux provides isolation and resource controls |

Maritime guide is on by default. Technical names remain visible. The toggle switches descriptions to technical content. Ship 02 provides context; its agents are not selectable in this prototype. Moving layers is an inspection aid, not actual Pod migration. A crane is a visual metaphor for runtime operations, not a networking component.

Theme uses the font stack and light surface treatments from the audited Human Atlas revision. Dark mode is optional and session-local. Exact viewport geometry differs to accommodate the educational timeline.
