---
title: Authority vs Governance
math: true
cascade:
  type: docs
weight: 2000
prev: /openprotocolspec/v0.1/
next: /openprotocolspec/v0.1/intent-execution
---

Modern distributed systems rely heavily on configuration, policies and tokens to control access.
However, these mechanisms assume something that is fundamentally incorrect: **that authority can be created, transferred and reconstructed from artifacts.**

This assumption breaks down in distributed execution, microservices, and AI agents.
To understand why, we must first understand where **authority actually comes from**.

---

## The Trigger: AI Agents

AI Agents didn't create new security problems.
They removed the assumptions hiding the old ones.

In traditional systems, humans provided implicit governance:

- a perimeter defined what was inside and outside
- topology was stable and known
- ownership was single and clear
- configuration was shared and trusted

Agents remove all of that.

> *What breaks under AI was already broken.*

The real problem is not agents.
The real problem is that we solved security with protocols, posture, configuration, and policy —
but **we never solved authority propagation**.

The question that remains unanswered:

> *How can I trust the posture, configuration, or policies of something
> I do not own, do not control, and do not even know?*

Configuration can reduce attack surface.
It cannot guarantee **authority integrity**.

## Identity vs Identifier

Before reasoning about authority, we need to resolve a confusion that affects
every system that runs code on behalf of a human.

Consider this program:

```bash
myagent.sh -user alice -scope read
```

You run it once. One process, one PID. Alice's identity, Alice's permissions.

Now you scale. You use threads — same PID, multiple threads.
Nothing changes. Same identity, same permissions.

Now you scale with processes instead. You run it ten times.

```text
PID 1001 → myagent (alice)
PID 1002 → myagent (alice)
...
PID 1010 → myagent (alice)
```

Ask yourself: did Alice's relationship to those permissions change
because you chose processes over threads?

**No.** The PID is just an identifier. It tells you *which* instance is running.
Not *who* it is running for.

This distinction matters:

- **Identity**: who is responsible. Persistent, singular, the origin of accountability.
- **Identifier**: which instance. A deployment artifact, not a security primitive.

For identity to be meaningful for trust and accountability, it must be
unique, singular, universal, and persistent.
In practice, systems often use identifiers — email addresses, usernames, DIDs —
as proxies for identity. This works as long as the accountability relationship
is preserved.

For AI agents, the accountable origin is always the principal that expressed
the intent — not the agent executing it. The agent only needs an identifier.

If scaling changes identity, your deployment choice is changing your security model.
That should never happen.

What we actually want:

```text
1 Identity  (the accountable origin)
N Identifiers  (one per instance)
Scoped authority per instance — each gets a subset of the origin's permissions

Alice (origin)
 ├─ agent#1  →  read:/docs
 ├─ agent#2  →  read:/reports
 └─ agent#3  →  read:/public
```

Same origin. Different identifiers. Reduced authority at every instance.

The key separation:

- **Identity + intent**: create authority
- **Proof of continuity**: carry authority
- **Identifier**: traceability

Authority must survive scaling.
Identity anchors responsibility.
The chain carries authority forward.

## Identity + Intent = Authority

Every action in a system begins with a **subject expressing intent**.
Two elements are required:

- **Identity**: who is responsible for the action.
  What matters for authority is not the label, but the origin of responsibility.
  For AI agents, that origin is always the principal that expressed the intent,
  not the agent executing it.

- **Intent**: what that subject wants to do.

When an identity expresses intent, **authority is created**.

$$
Identity + Intent \rightarrow Authority
$$

> Once authority is created, the origin of the execution chain is established.
> From that point forward, identity is no longer required to carry authority.
> What matters is that each step can prove it is a valid continuation of the origin.
> Identity anchors responsibility. The chain carries authority.

Authority therefore represents a **responsibility-bound capability**:

- **who**: initiated the action
- **what**: operations are authorized

We represent the originating authority as:

$$
\alpha_0 = (p_0, ops_0)
$$

where:

- $p_0$ = origin principal — the identity that created authority, not the executor carrying it
- $ops_0$ = operations authorized by the expressed intent

Authority is **not a token** and **not a credential**.
Authority is a **property of execution originating from an identity and its intent**.

### Execution Constraints

Authority alone is not sufficient to govern execution.
Execution must also be bounded by constraints that restrict how, when, and where
authority can be exercised.

Execution constraints may include:

- **Temporal constraints**: authority valid only within a time window
- **Contextual constraints**: authority valid only under specific environmental conditions
- **Operational constraints**: authority restricted to a subset of permitted operations

Formally, each execution step carries a constraint set $C_i$:

$$
\alpha_i = (p_0, ops_i, C_i)
$$

Constraints must also be monotonically non-increasing:

$$
C_{i+1} \subseteq C_i
$$

Constraints can only shrink. They cannot expand beyond what was established at origin.

## Authority Flows Through Execution

Execution in distributed systems is not a single step.
A request moves across services, workloads, or agents.
Execution therefore forms a **causal chain**.

$$
\pi = \langle \alpha_0, \alpha_1, \dots, \alpha_n \rangle
$$

Each step continues the previous authority.
A fundamental rule must always hold:

$$
ops_{i+1} \subseteq ops_i
$$

This means:

- **Authority can only shrink.**
- **It can never expand.**

Therefore:

$$
ops_n \subseteq ops_0
$$

Authority must remain:

- **bound to its origin**
- **continuous across execution**
- **monotonically non-increasing**

This principle eliminates entire classes of security failures.

## The Configuration Problem

Most security architectures today rely on **configuration-based authorization**.

Consider a simple example. Service A calls Service B, which calls Service C.
Each service has a configuration that defines what it trusts and what it allows.

This seems reasonable. But there is a fundamental problem.

Configuration describes **what a system is set up to allow**.
It does not describe **where authority actually came from**.

When a service receives a request, it checks its configuration.
If the configuration says the caller is trusted, the request proceeds.
But the configuration has no way to answer:

> *Did this authority originate from the right principal?
> Has it only shrunk since then? Or was it reconstructed somewhere along the chain?*

This is where authority and configuration collapse into each other —
and where structural vulnerabilities emerge.

A service cannot distinguish between
*"what the caller is allowed to request"* and *"what the service itself is able to do"*.
When configuration collapses these two questions into one,
the service executes using its own authority on behalf of a caller
that never had that authority.

This produces four structural failure classes:

- **Confused Deputy**: a service acts using its own authority on behalf of a caller
  that never had that authority
- **Privilege Escalation**: authority expands somewhere in the chain
  because a configuration allows it
- **Ambient Authority**: a service acts with permissions that exist in its
  configuration but were never explicitly delegated for this execution
- **Token Substitution**: a credential is replaced or reused in a context
  the original authority never covered

These are not bugs.
They are **consequences of using configuration as a substitute for authority**.

Configuration can reduce attack surface.
It cannot guarantee **authority integrity**.

## Authority Is a Composed Concept

Authority is not a primitive.
Authority is a **composed concept** — it emerges from primitives.
Authority has three fundamental properties:

### Origin

$$
p_0 = origin
$$

### Scope

$$
ops_0
$$

### Monotonicity

$$
ops_{i+1} \subseteq ops_i
$$

Authority therefore **cannot be recreated** during execution.
It can only be **continued**.

### Multi-dimensional Constraints

Authority is not only about operations.
Real execution requires restricting authority across multiple dimensions simultaneously.

Each execution step carries authority bounded by:

- **Operations**: what actions are permitted
- **Time**: when authority is valid
- **Context**: under what conditions authority applies
- **Resources**: over what targets authority can be exercised

All dimensions must respect monotonicity.
No dimension can expand beyond what was established at origin.

$$
(ops_{i+1}, T_{i+1}, C_{i+1}) \subseteq (ops_i, T_i, C_i)
$$

This multi-dimensional model ensures that authority cannot be
partially reconstructed by expanding along a single dimension
while appearing to restrict others.

## Governance

If authority defines **what is structurally possible**,
**governance defines what is allowed**.

Governance is the policy layer that evaluates execution. Governance may:

- restrict authority
- filter requests
- impose constraints
- stop execution

But governance must **never expand authority**.

$$
Authority_{after} \subseteq Authority_{before}
$$

## Authority and Governance Together

```text
  Identity + Intent
           │
           ▼
       Authority
 (origin-bound, monotonic, multi-dimensional)
           │
           ▼
      Governance
 (restrict / filter / limit)
           │
           ▼
       Execution
```

Authority:

- originates from identity + intent
- flows through execution
- cannot expand across any dimension

Governance:

- evaluates execution
- may restrict or stop it
- must never expand authority

---

## ZTAuth* Model

Authority continuity defines what is structurally possible.
It guarantees that authority cannot expand, cannot be reconstructed,
and cannot escape its origin.

> Authority continuity is formally defined in the
> [PIC Model](https://www.pic-protocol.org) — Provenance Identity Continuity.
> ZTAuth* builds its governance layer above it.

But structural guarantees are not enough for real systems.

Real systems need to answer a different set of questions:

- Is this execution currently permitted under active policy?
- Does the trust relationship between workloads satisfy governance requirements?
- Under what conditions can execution operate within another origin's context?

These are governance questions. They sit above authority continuity.
**ZTAuth* is the governance layer that operates above authority continuity.**

It introduces structured governance through:

- **Auth* Models**: the storage and distribution layer for trust policies.
  Auth* models define how trust policies, business policies, and trust
  statements are stored, versioned, and shared across execution boundaries.
  Trust Elevation and Trust Levels read from Auth* models to evaluate
  whether conditions for elevation are met.

- **Trust Elevation**: a controlled process that allows execution to
  operate within the authorization context of an origin. That origin
  may be an identity or any other principal. Elevation requires verified
  conditions and is always bounded by the origin's authority.

- **Trust Levels**: a mechanism that defines the levels at which
  elevation can occur. Trust levels can be restricted by Auth* models,
  which in turn constrain how and when elevation is permitted.

Formally:

$$
EffectiveAuthority = Governance(Authority)
$$

Subject to:

$$
EffectiveAuthority \subseteq Authority
$$

Governance cannot introduce new privileges.
It can only restrict what authority already permits.

The relationship between the two layers is fixed:

```text
    Authority Continuity
(structural — cannot be violated)
           │
           ▼
    ZTAuth* Governance
(policy — restricts what authority permits)
           │
           ▼
       Execution
```

Authority continuity provides the floor.
ZTAuth* governance operates within it.
Neither layer can expand authority.

---

## Final Principle

Authority is not identity.
Authority is not possession.
Authority is **continuity of intent across execution**.

ZTAuth* governs that continuity.

But **authority must never expand.**
