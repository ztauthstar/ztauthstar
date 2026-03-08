---
title: The Governance Model
cascade:
  type: docs
weight: 3000
prev: /openprotocolspec/v0.1/authority-vs-governance
next: /openprotocolspec/v0.1/ztauth-spec
---

The Governance Model defines how **ZTAuth\*** implements distributed authorization across workloads, communication boundaries, and governance domains. It formalizes how trust is **established**, **elevated**, and **enforced** — from the moment an identity expresses intent to the moment an executor carries it out.

---

## Intent and Execution

Every authorization flow begins with an identity — either acting directly, or acting as a **delegator** that delegates authority to a **delegate**.

When the authorization flow originates directly from an identity, that identity is both the subject and the origin of authority. When delegation is involved, the roles are formally separated:

- The **delegator** becomes the **subject** — the origin of authority, the identity whose permissions bound the entire execution.
- The **delegate** becomes the **principal** — the entity actively exercising the delegated authority.

Between subject and principal there may be a chain of intermediate delegations. The delegation is not required to be direct.

From the subject's permissions, an **intent** is expressed. From that intent, **authority is created**. That authority then flows into execution.

As execution propagates across workloads, each executor exists in relation to its neighbors:

- The **upstream executor**: the previous peer in the execution chain
- The **current executor**: the active principal carrying authority at this step
- The **downstream executor**: the next peer to which authority may be passed

These may also be referred to as **previous peer**, **self**, and **next peer** — or by any equivalent identifiers that make the causal relationship explicit.

Authority flows from intent to execution. At every step, it can only narrow.

## Architectural Model

ZTAuth\* defines a layered architecture for distributed authorization and verifiable trust propagation.

![ZTAuth* Architecture](/images/architecture/ztas-gov-model-architecture.png)

The model is composed of five principal layers:

1. **Trusted Input**
2. **Trusted Channel**
3. **Autonomous Component**
4. **Policy Decision Point (PDP)**
5. **Trust Governance**

### Trusted Input

A **Trusted Input** represents the initial trust material used to start the authorization flow. It may consist of a credential, token, attestation, or signed document that can be cryptographically verified and linked to a subject — such as a user, service, or workload.

Accepted examples include, but are not limited to:

- **PIC Causal Authority (PCA)** — the causally derived authority state defined in the [PIC Model specification](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.1/pic-spec.md), carrying origin principal, authorized operations, and verifiable provenance across the execution chain
- OAuth **Access Tokens**
- **JWTs** and **X.509 certificates**
- **ZCAPs**, **UCANs**, or any other valid capability-based authorization token.

Regardless of format, the Trusted Input must guarantee **authenticity**, **integrity**, and **non-repudiation** under a defined trust model, whether centralized or decentralized.

### Trusted Channel

The **Trusted Channel** is the transport layer that ensures confidential, integrity-protected, and authenticated exchange of trust data. It connects Autonomous Components and PDPs, carrying both requests and authorization proofs.

A channel is considered trusted if it provides:

- Endpoint authentication (e.g., via **mTLS**, **SPIFFE/SVID**)
- Replay protection and integrity checks
- Optional forward secrecy or attestation chaining

Protocols such as **HTTPS**, **gRPC**, **message buses**, **DDS**, or **DIDComm** can serve as valid trusted channels, provided they meet these guarantees. The trust model also supports **asynchronous and disconnected** environments, where trust continuity must persist beyond live sessions.

### Autonomous Component

An **Autonomous Component** is any workload or execution entity that performs an action in the system. It must have a verifiable workload identity — for example, a **SPIFFE ID** or attested key — that binds it to a specific trust domain and provenance.

Each Autonomous Component acts as a **Policy Enforcement Point (PEP)**, applying the authorization decisions it receives from the PDP. It evaluates local conditions and enforces policies independently, allowing for distributed and resilient enforcement even in partially connected environments.

### Policy Decision Point (PDP)

The **Policy Decision Point** is responsible for computing authorization decisions based on the current trust context, applicable policies, and received attestations.

The PDP can be centralized or distributed depending on deployment, but its semantics remain identical. It processes **Authorization Request Contexts** and supports two key mechanisms:

- **Trust Elevation** — The controlled transition from one authorization context to another, for example when a workload acts on behalf of another identity. The PDP evaluates whether elevation is permitted under the target context's policies and only grants it when all Trust Level conditions are satisfied.
- **Trust Levels** — The formal assurance tiers defining when and under which guarantees a trust elevation may occur. Trust Levels specify contextual, cryptographic, and procedural requirements such as attestation freshness, provenance, or explicit consent.

Together, these mechanisms ensure that every authorization decision is policy-driven, verifiable, and bound to contextual evidence.

The PDP emits **Trusted Decisions** and records **Decision Logs**, enabling full auditability and traceability of trust evaluations.

> ZTAuth\* assumes that a Trusted Input arrives through a Trusted Channel. Whether authority is continuous and non-expansive along the execution path is a property of the caller — not of this layer. If [PIC](https://www.pic-protocol.org) is in use, that guarantee is structural and formally verified. If it is not, ZTAuth\* operates correctly on the trust material it receives, and the responsibility for authority integrity lies with the calling system.

### Trust Governance

**Trust Governance** defines the overarching control plane for authoring, distributing, and auditing trust relationships and policies. It provides the governance framework that aligns technical authorization with organizational intent.

This layer includes:

- **Business Policies**: Describe application-level logic and permissible behaviors.
- **Trust Policies**: Define the structure and rules of trust elevation and trust levels.
- **Trust Statements**: Represent formal cross-domain trust assertions such as delegation, federation, or attestation binding.

Governance ensures that trust remains **auditable**, **revocable**, and **consistent** across administrative and network boundaries.
