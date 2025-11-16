---
title: Architecture
cascade:
  type: docs
weight: 2000
prev: /openprotocolspec/2025-04-05/manifest
next: /openprotocolspec/2025-04-05/appendix-a-list-of-specs
---

## ZTAuth\* Architectural Model

The **ZTAuth\*** protocol defines a layered architecture for **distributed authorization** and **verifiable trust propagation**.  

This architecture formalizes how trust is **established**, **elevated**, and **enforced** across workloads, communication boundaries, and governance domains.

![ZTAuth* Architecture](/images/architecture/ztauthstart-architecture.png)

### Overview

The model is composed of five principal layers:

1. **Trusted Input**  
2. **Trusted Channel**  
3. **Autonomous Component**  
4. **Policy Decision Point (PDP)**  
5. **Trust Governance**

Each layer plays a distinct role in the **Trust Evaluation Cycle**, illustrated below, where every authorization decision is both **context-aware** and **cryptographically verifiable**.

### 1. Trusted Input

A **Trusted Input** represents the initial trust material used to start the authorization flow.  
It may consist of a credential, token, attestation, or signed document that can be **cryptographically verified** and **linked to a subject** — such as a **user**, **service**, or **workload**.

Accepted examples include, but are not limited to:

- OAuth **Access Tokens**  
- **JWTs** and **X.509 certificates**  
- **ZCAPs**, **UCANs**, or **W3C Verifiable Credentials**

Regardless of the format, the Trusted Input must guarantee **authenticity**, **integrity**, and **non-repudiation** under a defined trust model, whether **centralized** or **decentralized**.

### 2. Trusted Channel

The **Trusted Channel** is the transport layer that ensures **confidential**, **integrity-protected**, and **authenticated** exchange of trust data.  
It connects Autonomous Components and PDPs, carrying both **requests** and **authorization proofs**.

A channel is considered “trusted” if it provides:

- Endpoint authentication (e.g., via **mTLS**, **SPIFFE/SVID**)  
- Replay protection and integrity checks  
- Optional forward secrecy or attestation chaining

Protocols such as **HTTPS**, **gRPC**, **message buses**, **DDS**, or **DIDComm** can serve as valid trusted channels, provided they meet these guarantees.  
The trust model also supports **asynchronous and disconnected** environments, where trust continuity must persist beyond live sessions.

### 3. Autonomous Component

An **Autonomous Component** is any workload or execution entity that performs an action in the system.  

It must have a **verifiable workload identity** (for example, a **SPIFFE ID** or **attested key**) that binds it to a specific trust domain and provenance.

Each Autonomous Component acts as a **Policy Enforcement Point (PEP)**, applying the authorization decisions it receives from the PDP.  
It evaluates local conditions and enforces policies **independently**, allowing for **distributed and resilient enforcement** even in partially connected environments.

### 4. Policy Decision Point (PDP)

The **Policy Decision Point** is responsible for computing **authorization decisions** based on the **current trust context**, applicable **policies**, and received **attestations**.

The PDP can be **centralized or distributed** depending on deployment, but its semantics remain identical.  
It processes **Authorization Request Contexts** and supports two key mechanisms:

- **Trust Elevation** — The controlled transition from one **authorization context** to another (for example, when a workload acts on behalf of another identity).  
  The PDP evaluates if elevation is permitted under the **target context’s policies** and only grants it when all **Trust Level** conditions are satisfied.
- **Trust Levels** — The formal assurance tiers defining *when* and *under which guarantees* a trust elevation may occur.  
  Trust Levels specify contextual, cryptographic, and procedural requirements (e.g., attestation freshness, provenance, or explicit consent).

Together, these mechanisms ensure that **every authorization decision** is **policy-driven**, **verifiable**, and **bound to contextual evidence**.

The PDP emits **Trusted Decisions** and records **Decision Logs**, enabling full **auditability** and **traceability** of trust evaluations.

### 5. Trust Governance

**Trust Governance** defines the overarching control-plane for authoring, distributing, and auditing trust relationships and policies.  
It provides the governance framework that aligns technical authorization with organizational intent.

This layer includes:

- **Business Policies** — Describe application-level logic and permissible behaviors.  
- **Trust Policies** — Define the structure and rules of trust elevation and trust levels.  
- **Trust Statements** — Represent formal cross-domain trust assertions (e.g., delegation, federation, or attestation binding).

Governance ensures that trust remains **auditable**, **revocable**, and **consistent** across administrative and network boundaries.

### Trust Chains and Trust Continuity

When multiple **authorization contexts** interconnect — for example, when a workload forwards a **verifiable proof** of a previous decision — they form a **Trust Chain**.  
Each link in the chain represents a verifiable trust elevation, binding the decision lineage across asynchronous or distributed boundaries.

A **Trust Chain** thus provides:

- **Continuity of trust** across workloads and domains  
- **Cryptographic assurance** of each delegated step  
- **Zero Trust–compliant enforcement** even in decentralized or disconnected topologies

This architecture allows **ZTAuth\*** to operate seamlessly across both **federated** and **decentralized systems**, maintaining consistent assurance, auditability, and policy enforcement throughout the trust lifecycle.
