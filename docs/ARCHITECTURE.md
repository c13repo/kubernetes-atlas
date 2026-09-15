# Architecture decisions

## Accepted requirements

- All product UI, educational content, and repository documentation are English-only.
- Teach self-managed Kubernetes on Linux, including low-level mechanisms.
- Use 3D for spatial exploration and 2D for detailed mechanisms.
- Separate application releases from supported Kubernetes releases.
- CDNs are permitted initially; self-contained and offline modes are deferred.
- Reuse suitable Human Atlas code after review and preserve required notices.

## Proposed boundaries

1. Explorer: navigation, selection, camera, layers, search, and inspection.
2. Educational model: concepts, relationships, prerequisites, and explanations.
3. Scenario engine: explicit states, events, transitions, pause, step, and reset.
4. Compatibility model: Kubernetes releases, component profiles, feature gates, and supported combinations.
5. Asset resolution: centrally managed resources that can move from CDN URLs to bundled paths.

React, TypeScript, and Three.js are candidates pending the reuse audit. No implementation is selected solely on the basis of the reference project's dependencies.

## Accuracy rules

Distinguish API objects, running processes, and operating-system resources. Show asynchronous reconciliation rather than a single synchronous command chain. Mark simplifications and implementation-dependent behavior. Do not imply that selecting a Kubernetes version uniquely determines runtime or network behavior.

## Pending decisions

Exact reference release; historical comparison; runtime and CNI versions; Linux environment; minimum browser support; deployment target; final visualization stack.
