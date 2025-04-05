---
title: Versioning
type: docs
prev: openprotocolspec/
next: openprotocolspec/contributions/
weight: 10
---

The `ZTAuth*` employs string-based version identifiers in the `YYYY-MM-DD` format, reflecting the most recent date when backwards-incompatible modifications were introduced.

{{< callout type="info" >}} Version identifiers remain static during updates that preserve backwards compatibility. This approach enables iterative enhancements without disrupting interoperability across implementations. {{< /callout >}}

## Revision States

Protocol revisions are categorized as follows:

- **Draft**: Preliminary specifications under active development, not yet stable for adoption.
- **Current**: The active protocol iteration, fully usable and subject to ongoing backwards-compatible refinements.
- **Final**: Archived specifications, finalized and immutable.

The **current** protocol iteration is [**2025-04-05**](/latest).
