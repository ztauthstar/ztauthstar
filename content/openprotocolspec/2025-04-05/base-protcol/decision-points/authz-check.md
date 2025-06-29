---
title: Authorization Endpoint
cascade:
  type: docs
weight: 3501
prev: /openprotocolspec/2025-04-05/base-protcol/decision-points
next: /openprotocolspec/2025-04-05/base-protcol/decision-points/authorization-context
---

In the **ZTAuth\*** protocol, the Policy Decision Point (PDP) is responsible for evaluating authorization requests based on contextual information carried along with Transaction Token (Txn Token).

In order to perform a valid authorization evaluation, the PDP **MUST** receive a well-formed and verifiable Txn Token. Upon receiving the token, the PDP performs the following steps:

- **Verify the Txn Token**: The PDP **MUST** validate the token's digital signature, expiration (`exp`), and audience (`aud`) to ensure authenticity and scope of use.
- **Extract relevant claims**: The PDP **MUST** extract the `sub` (subject), `act` (actor), and `scope` claims from the token.
- **Check actor permissions**: The PDP **MUST** verify that the `act` identity belongs to a security group or trust level authorized to act on behalf of the `sub` identity for the requested operation.
- **Resolve the authorization model**: The PDP retrieves the applicable `auth* model` based on the `zone_id` and `ledger_id` associated with the `sub` identity.
- **Evaluate authorization**: The PDP evaluates the request against the retrieved model using the extracted claims and any additional contextual inputs.

This process is referred to as **Trust Elevation**.

In scenarios involving multi-level delegation, Trust Elevation may involve chaining or traversing multiple intermediate `authorization contexts`. These intermediate steps contribute to the construction of a final, composite authorization context used to determine the effective decision for the original request.

By design, this process ensures that each authorization context is **logically and cryptographically isolated**, in alignment with Zero Trust principles. Each decision is tightly bound to its originating request and cannot be reused or escalated beyond its defined scope and trust domain.

Furthermore, because the protocol is inherently structured around delegation, it natively supports multi-level delegation scenarios. Each actor in the chain operates within a bounded authorization context, derived from and limited by the preceding level of trust, ensuring both traceability and containment of privileges.
