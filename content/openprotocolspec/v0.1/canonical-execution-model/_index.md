---
title: Canonical Execution Model
cascade:
  type: docs
weight: 2500
prev: /openprotocolspec/v0.1/authority-vs-governance
next: /openprotocolspec/v0.1/governance-model
---

Distributed execution is not a sequence of positions. It is a sequence of **causal steps across time**.

A workload does not exist because it is next in a list. It exists because it was provisioned at a specific moment, in response to a specific event, as a continuation of a specific execution chain.

![Canonical Execution Model](/images/canonical-execution/model.png)

When Workload n receives a message at time *x*, Workload n+1 is provisioned at time *x + y*, where *y* is a positive offset. The gap is real. The downstream executor does not exist yet when the upstream executor acts.

This has three consequences:

- **Authority flows from origin — never re-created**: There is no moment where a new workload can bootstrap its own authority. Authority must arrive causally from what came before.
- **Every hop must prove continuity, not possession**: Holding a token is not enough. The workload must demonstrate it is a valid continuation of the execution chain.
- **Execution is temporal and causal, not positional**: The chain is defined by what happened and when — not by topology or configuration.

This is why possession-based models fail in distributed execution. They assume the chain is synchronous and positional. It is not.

## Authority Continuity

The formal model that enforces these properties across distributed execution is the [PIC Model — Provenance Identity Continuity](https://www.pic-protocol.org).

PIC defines three invariants that must hold at every execution hop:

- **Provenance** — the causal chain is always traceable from origin to current state, unbroken.
- **Identity** — the origin principal `p₀` is immutable throughout the chain.
- **Continuity** — authority can only decrease at each hop. It never expands.

Under these invariants, authority cannot be re-created mid-chain, cannot escape its origin, and cannot expand across any dimension. The confused deputy problem becomes structurally inexpressible — not mitigated, but impossible by construction.

ZTAuth* builds its governance layer above PIC. PIC provides the structural floor. ZTAuth* governs what is permitted within it.