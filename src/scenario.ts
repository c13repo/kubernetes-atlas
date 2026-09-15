export type Layer = 'control' | 'node' | 'linux';
export const components = [
{id:'api',name:'API server',layer:'control',kind:'Control plane process',role:'Accepts API requests and exposes cluster state after access checks, admission and validation.',boundary:'Controllers, the scheduler and kubelets coordinate through the API. Only the API server accesses the Kubernetes data in etcd.',command:'kubectl get deployments,pods -n atlas-demo -o yaml'},
{id:'etcd',name:'etcd',layer:'control',kind:'Persistent state store',role:'Stores API data using a replicated key-value store. This single-control-plane example has one etcd member.',boundary:'Persistence is distinct from execution. etcd neither schedules Pods nor starts processes. Quorum failure needs a separate multi-member scenario.',command:'kubectl get pods -n kube-system -l component=etcd'},
{id:'controllers',name:'Controllers',layer:'control',kind:'Independent reconciliation loops',role:'The Deployment controller manages ReplicaSets. The ReplicaSet controller creates Pods to meet the desired replica count.',boundary:'These loops observe and update API objects asynchronously. They do not command one another directly.',command:'kubectl get rs -n atlas-demo -o yaml'},
{id:'scheduler',name:'Scheduler',layer:'control',kind:'Placement process',role:'Observes unassigned Pods, filters and scores candidate nodes, then records a binding through the API.',boundary:'The scheduler selects a node; kubelet and the runtime handle execution. worker-01 is an illustrative choice, not a universal outcome.',command:'kubectl describe pod -n atlas-demo <pod-name>'},
{id:'kubelet',name:'kubelet',layer:'node',kind:'Worker-01 node agent',role:'Observes assigned Pods, reconciles local runtime state and reports status, including probe results.',boundary:'A running container may still be unready. kubelet uses CRI for runtime operations.',command:'journalctl -u kubelet'},
{id:'runtime',name:'containerd',layer:'node',kind:'CRI runtime · worker-01',role:'Provides container lifecycle operations through CRI. It uses an OCI runtime such as runc and invokes the configured CNI for sandbox networking.',boundary:'CRI, CNI and OCI are different interfaces. Network implementation details depend on the selected profile.',command:'sudo crictl pods && sudo crictl ps'},
{id:'process',name:'App process',layer:'linux',kind:'Linux process · worker-01',role:'The application runs as a Linux process within configured namespaces, mounts and cgroup resource controls.',boundary:'The Pod API object, sandbox, container and process have different identities. A replacement Pod has a new UID.',command:'sudo crictl inspect <container-id>'}
] as const;
export type ComponentId = typeof components[number]['id'];
export type Step = {actor:ComponentId;title:string;detail:string;objects:string;process:boolean;ready:boolean};
export const creation:Step[] = [
{actor:'api',title:'Submit the declaration',detail:'kubectl submits a Deployment with one desired replica. The cluster is already bootstrapped and healthy.',objects:'Deployment request · replicas: 1',process:false,ready:false},
{actor:'api',title:'Accept and persist',detail:'The API server accepts the authorized, valid request and persists the Deployment through etcd.',objects:'Deployment stored · replicas: 1',process:false,ready:false},
{actor:'controllers',title:'Reconcile the Deployment',detail:'The Deployment controller observes the desired state and creates a ReplicaSet through the API.',objects:'Deployment → ReplicaSet',process:false,ready:false},
{actor:'controllers',title:'Create a Pod object',detail:'The ReplicaSet controller creates the missing Pod. It exists in the API but has no node assignment.',objects:'Deployment → ReplicaSet → Pod A · unassigned',process:false,ready:false},
{actor:'scheduler',title:'Select a worker',detail:'The scheduler evaluates candidates and records a binding to worker-01 through the API in this selected trace.',objects:'Pod A · nodeName: worker-01',process:false,ready:false},
{actor:'kubelet',title:'Observe the assignment',detail:'The kubelet on worker-01 observes the assigned Pod and begins local reconciliation.',objects:'Pod A · assigned · preparation pending',process:false,ready:false},
{actor:'runtime',title:'Prepare the sandbox',detail:'Through CRI, kubelet requests runtime preparation. The configured runtime invokes CNI for sandbox networking. Image and mount preparation are collapsed here.',objects:'Pod A · sandbox preparation',process:false,ready:false},
{actor:'process',title:'Start the application',detail:'The runtime starts the application process with Linux isolation and resource controls. Readiness has not succeeded yet.',objects:'Pod A · Running · Ready: false',process:true,ready:false},
{actor:'kubelet',title:'Report readiness',detail:'After a successful readiness probe, kubelet reports Ready through the API. Controllers subsequently observe updated availability.',objects:'Pod A · Running · Ready: true',process:true,ready:true}
];
export const replacement:Step[]=[
{...creation[8],title:'A healthy replica',detail:'One ready Pod satisfies the ReplicaSet. This branch starts from a healthy workload.'},
{actor:'api',title:'Request Pod deletion',detail:'A deletion request sets deletion intent. Graceful termination and replacement creation may overlap.',objects:'Pod A · terminating',process:true,ready:false},
{actor:'controllers',title:'Reconcile the missing replica',detail:'The ReplicaSet creates a replacement Pod B with a new UID. This is different from restarting a container inside Pod A.',objects:'Pod A · terminating | Pod B · unassigned',process:true,ready:false},
{...creation[4],title:'Schedule the replacement',objects:'Pod B · nodeName: worker-01',detail:'The new Pod is scheduled independently. This trace selects worker-01 again; another node could be selected.',process:false},
{...creation[6],objects:'Pod B · sandbox preparation'},
{...creation[7],objects:'Pod B · Running · Ready: false'},
{...creation[8],objects:'Pod B · Running · Ready: true'}
];
export function move(index:number,delta:number,length:number){return Math.max(0,Math.min(length-1,index+delta))}

// Teaching metaphors, not upstream Kubernetes terminology.
export const maritime:Record<ComponentId,{name:string;explanation:string;limit:string}>={
api:{name:'Harbor office',explanation:'Every approved shipping order enters through the harbor office. Ships and harbor services use this same office to read orders and report progress.',limit:'The API server is a software service, not a person issuing every action. Components independently watch and reconcile state.'},
etcd:{name:'Harbor ledger',explanation:'The ledger records accepted orders and reported state so the fleet can work from a shared record.',limit:'The ledger stores API data, not container images or application files. A single-member example does not demonstrate distributed quorum.'},
controllers:{name:'Fleet supervisors',explanation:'Supervisors compare the requested cargo units with those recorded in the fleet and request replacements when needed.',limit:'There are multiple independent controllers. A Deployment controller manages ReplicaSets; a ReplicaSet controller manages Pod replicas.'},
scheduler:{name:'Berth & cargo planner',explanation:'The planner chooses a ship with suitable capacity and constraints for a new cargo unit.',limit:'The scheduler assigns a Pod to a node; it neither moves an existing Pod nor starts its containers.'},
kubelet:{name:'Ship captain',explanation:'Each ship has its own captain who reads assigned orders, asks the loading machinery to prepare the cargo and reports its condition.',limit:'kubelet is a local software agent. It does not choose placements for the whole fleet.'},
runtime:{name:'Loading machinery',explanation:'The ship’s machinery prepares and starts the containers that belong to an assigned cargo unit.',limit:'containerd is a container runtime, not Docker Engine. CRI, OCI and CNI have distinct responsibilities; the crane is only a teaching metaphor.'},
process:{name:'Work inside the cargo',explanation:'A Pod is a shared cargo unit containing one or more containers. Here a single container houses the working application process.',limit:'The ship is a node, the cargo unit is a Pod, a container is an execution environment, and the application is a process. Linux namespaces and cgroups provide the actual mechanisms.'}
};
export const voyageCreation=[
'Place an order for one cargo unit. The fleet already exists and its ships are available.',
'The harbor office checks and records the order in the ledger.',
'A fleet supervisor creates a plan for keeping the requested cargo count.',
'The replica supervisor requests a cargo unit. It is recorded, but not assigned to a ship yet.',
'The planner assigns the cargo unit to worker-01 after checking the ships. Another eligible ship could be chosen.',
'The captain of worker-01 sees the assignment and begins preparing the ship.',
'Loading machinery prepares the cargo’s shared space and networking. This summarizes several runtime operations.',
'The application starts working inside its container. Starting work does not yet prove it is ready.',
'The readiness check succeeds and the captain reports the cargo ready through the harbor office.'
];
export const voyageReplacement=[
'One ready cargo unit meets the requested count.',
'Request removal of cargo unit A. Its work is allowed to stop gracefully.',
'A supervisor requests cargo unit B with a new identity. Preparation can overlap with removal of unit A.',
'The planner assigns unit B independently. It could use a different ship.',
'The loading machinery prepares a new shared space for unit B.',
'Work starts inside the new cargo unit, but readiness is still pending.',
'The new unit passes its readiness check. The requested replica count is satisfied again.'
];
