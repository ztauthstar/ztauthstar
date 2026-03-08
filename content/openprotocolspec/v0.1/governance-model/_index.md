---
title: The Governance Model
cascade:
  type: docs
weight: 5000
prev: /openprotocolspec/v0.1/canonical-execution-model
next: /openprotocolspec/v0.1/ztauth-spec
---

The `Governance Model` defines how **ZTAuth\*** implements distributed governance for cross-workload execution.
It formalizes how trust is `established`, `constrained`, and `enforced` across the execution chain, from the moment an executor receives authority to the moment it carries it out.

---

## Architectural Model

ZTAuth\* defines a layered architecture for distributed authorization and verifiable trust propagation.

![Architecture](/images/governance-model/architecture.png)

The model is composed of five principal layers:

1. **Trusted Input**
2. **Trusted Channel**
3. **Autonomous Component**
4. **Policy Decision Point (PDP)**
5. **Trust Governance**

### Trusted Input

A **Trusted Input** represents the initial trust material used to start the authorization flow. It may consist of a credential, token, attestation, or signed document that can be cryptographically verified and linked to a subject — such as a user, service, or workload.

Accepted examples include, but are not limited to:

- **PIC Causal Authority (PCA)**: the causally derived authority state defined in the [PIC Model specification](https://github.com/pic-protocol/pic-spec/blob/main/draft/0.1/pic-spec.md), carrying origin principal, authorized operations, and verifiable provenance across the execution chain
- **OAuth Access Tokens**: bearer tokens issued by an authorization server
- **JWTs and X.509 certificates**: signed identity and claims documents
- **ZCAPs, UCANs**: capability-based authorization tokens

Regardless of format, the Trusted Input must guarantee **authenticity**, **integrity**, and **non-repudiation** under a defined trust model, whether centralized or decentralized.

Before the authorization flow can be processed, the Trusted Input must be converted into the canonical authorization schema used by ZTAuth\*. This conversion is the responsibility of the caller and happens at the boundary between the external trust material and the ZTAuth\* execution context. The schema normalization logic is defined in the ZTAuth\* Protocol Specification.

### Trusted Channel

The **Trusted Channel** is the transport layer that ensures confidential, integrity-protected, and authenticated exchange of trust data. It connects Autonomous Components and PDPs, carrying both requests and authorization proofs.

A channel is considered trusted if it provides:

- **Endpoint authentication**: e.g., via **mTLS**, **SPIFFE/SVID**
- **Replay protection and integrity checks**: binding requests to their transport context
- **Forward secrecy or attestation chaining**: optional, for higher assurance environments

Protocols such as **HTTPS**, **gRPC**, **message buses**, **DDS**, or **DIDComm** can serve as valid trusted channels, provided they meet these guarantees. The trust model also supports **asynchronous and disconnected** environments, where trust continuity must persist beyond live sessions.

### Autonomous Component

An **Autonomous Component** is any workload or execution entity that performs an action in the system. It must have a verifiable workload identity — for example, a **SPIFFE ID** or attested key — that binds it to a specific trust domain and provenance.

Each Autonomous Component acts as a **Policy Enforcement Point (PEP)**, applying the authorization decisions it receives from the PDP. It evaluates local conditions and enforces policies independently, allowing for distributed and resilient enforcement even in partially connected environments.

### Policy Decision Point (PDP)

The **Policy Decision Point** is responsible for computing authorization decisions based on the current trust context, applicable policies, and received attestations.

The PDP can be centralized or distributed depending on deployment, but its semantics remain identical. It processes **Authorization Request Contexts** and supports two key mechanisms:

- **Trust Elevation**: the controlled transition from one authorization context to another, for example when a workload acts on behalf of another identity. The PDP evaluates whether elevation is permitted under the target context's policies and only grants it when all Trust Level conditions are satisfied
- **Trust Levels**: the formal assurance tiers defining when and under which guarantees a trust elevation may occur. Trust Levels specify contextual, cryptographic, and procedural requirements such as attestation freshness, provenance, or explicit consent

Together, these mechanisms ensure that every authorization decision is policy-driven, verifiable, and bound to contextual evidence.

The PDP emits **Trusted Decisions** and records **Decision Logs**, enabling full auditability and traceability of trust evaluations.

> ZTAuth\* assumes that a Trusted Input arrives through a Trusted Channel. Whether authority is continuous and non-expansive along the execution path is a property of the caller — not of this layer. If [PIC](https://www.pic-protocol.org) is in use, that guarantee is structural and formally verified. If it is not, ZTAuth\* operates correctly on the trust material it receives, and the responsibility for authority integrity lies with the calling system.

### Trust Governance

**Trust Governance** defines the overarching control plane for authoring, distributing, and auditing trust relationships and policies. It provides the governance framework that aligns technical authorization with organizational intent.

This layer includes:

- **Business Policies**: describe application-level logic and permissible behaviors
- **Trust Policies**: define the structure and rules of trust elevation and trust levels
- **Trust Statements**: represent formal cross-domain trust assertions such as delegation, federation, or attestation binding

Governance ensures that trust remains **auditable**, **revocable**, and **consistent** across administrative and network boundaries.
