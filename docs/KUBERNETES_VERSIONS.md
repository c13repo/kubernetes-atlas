# Maintaining Kubernetes versions

Application versions and Kubernetes versions are independent.

## Adding support

1. Select an exact reference release and record primary documentation, release notes, relevant enhancement proposals, and source-code references.
2. Review changes to APIs, defaults, feature gates, component behavior, and compatibility.
3. Record differences against existing content without duplicating unchanged explanations.
4. Update affected profiles, diagrams, examples, and scenario transitions.
5. Verify affected behavior; add reproducible cluster experiments where needed.
6. Update coverage, limitations, comparison views, and the changelog.
7. Publish through an application release.

A version must not be labeled fully supported while only selected mechanisms have been checked. Historical examples must identify their limited scope. Profile combinations must be explicitly supported rather than assumed compatible.

## Future upgrade scenarios

Represent component-specific versions and validate version-skew constraints against the relevant release documentation.

## Sources

- https://kubernetes.io/releases/
- https://kubernetes.io/releases/version-skew-policy/
- https://kubernetes.io/docs/reference/deprecation-policy/
- https://github.com/kubernetes/kubernetes
- https://github.com/kubernetes/enhancements
