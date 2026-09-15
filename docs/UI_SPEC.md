# Explorer mockup review

Status: interactive design study, not production application code.

## Layout

Header: identity, current profile and review-state label. Left: searchable component catalogue. Center: cluster topology with grouped control-plane and worker components. Right: selected component role and responsibility boundary. Bottom: causal checkpoint, explanation and previous/next/reset controls.

The review prototype uses a 2D semantic layout. Production adds a 3D spatial overview using the same selection model. Do not represent a 2D prototype as a working 3D renderer.

## Working review interactions

Component selection, search, causal checkpoint navigation and reset. A host design option changes component spacing. Exact version/profile switching is deferred until verified content exists; the prototype displays a proposal rather than offering empty selectors.

## Visual grammar

Processes and runtime components: solid outlined controls. API objects: a separately labeled object strip. Node membership: enclosing groups. The checkpoint actor is labeled Active; selection uses its own visible state. No line is implied to be a complete network path.

## Responsive behavior

At narrow widths, catalogue, topology and inspector stack. Labels wrap; controls remain keyboard accessible. Reduced-motion users receive no continuous animation.

## Review questions

Is the topology easy to read? Is the inspector useful without hiding the cluster? Is the explanation depth appropriate? Validate this direction before implementing the full explorer.
