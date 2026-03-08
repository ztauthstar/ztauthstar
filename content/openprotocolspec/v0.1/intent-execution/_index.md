---
title: Intent and Execution
cascade:
  type: docs
weight: 3000
prev: /openprotocolspec/v0.1/authority-vs-governance
next: /openprotocolspec/v0.1/canonical-execution-model
---

Every authorization flow begins with an identity — either acting directly, or acting as a **delegator** that delegates authority to a **delegate**.

![Intent and Execution](/images/governance-model/intents-execution.png)

When the authorization flow originates directly from an identity, that identity is both the subject and the origin of authority. When delegation is involved, the roles are formally separated:

- **delegator**: the origin of authority, the identity whose permissions bound the entire execution, becomes the **subject**
- **delegate**: the entity actively exercising the delegated authority, becomes the **principal**

Between subject and principal there may be a chain of intermediate delegations. The delegation is not required to be direct.

From the subject's permissions, an **intent** is expressed. From that intent, **authority is created**. That authority then flows into execution.

## Execution Constraints

Authority alone is not sufficient to govern execution. Every step in the execution chain is also bounded by **constraints** that restrict how, when, and where authority can be exercised:

- **Temporal constraints**: authority valid only within a defined time window
- **Contextual constraints**: authority valid only under specific environmental or situational conditions
- **Operational constraints**: authority restricted to a defined subset of permitted operations

Constraints are monotonically non-increasing. They can only narrow at each step. They cannot expand beyond what was established at the origin of the authorization flow.

## Execution Chain

As execution propagates across workloads, each executor exists in relation to its neighbors:

- **Upstream executor**: the previous peer in the execution chain
- **Current executor**: the active principal carrying authority at this step
- **Downstream executor**: the next peer to which authority may be passed

These may also be referred to as **previous peer**, **self**, and **next peer** — or by any equivalent identifiers that make the causal relationship explicit.

Authority flows from intent to execution. At every step, it can only narrow.
