# Fleet explosion regression

## Reproduction

Before: Fleet showed only three entries. Setting the slider to 100% rearranged whole ships without exposing internals. The camera refitted every slider interval, reducing perceived movement. Tests asserted only unique positions, not detailed fleet coverage.

## Fix

Fleet expands the existing detailed inventories into 27 uniquely identified entries. Navigable group placeholders are replaced by their children. Source scopes remain accessible through Open level. Camera framing accounts for the full extent once; slider changes preserve orientation and zoom. Isolation clears on slider input. Numbered labels correspond to the inventory, and the assembled overview shows the selected label only.

## Verification

- Build and eight automated tests pass.
- Browser reproduction confirmed the original three-piece defect.
- Browser verified the corrected Fleet at 100%, 27 entries, selection, single-piece isolation, slider clearing isolation, and opening Runtime internals from containerd.
- Worker-02 remains contextual. This is not complete coverage of every Kubernetes mechanism.
