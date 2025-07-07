---
title: TX-Token
cascade:
  type: docs
weight: 3401
prev: /openprotocolspec/2025-04-05/base-protcol/tts
next: /openprotocolspec/2025-04-05/base-protcol/decision-points
---

Each invocation of the Policy Decision Point (PDP) within the protocol **MUST** be accompanied by a valid Transaction Token (Txn Token) as defined in [oauth-transaction-tokens](https://www.ietf.org/archive/id/draft-ietf-oauth-transaction-tokens-05.html).

This protocol defines a custom payload profile for the Txn Token. The JWT payload **MUST** include a minimal set of claims necessary for context-bound policy evaluation, as described below.

Specifically, the Txn Token presented to the PDP **MUST** contain the following claims:

- `sub`: a claim representing the **subject identity**, i.e., the identity on whose behalf the operation is being performed (e.g., the end user or owning entity).
- `act`: a claim representing the **actor identity**, i.e., the identity of the current executing workload that is performing the action on behalf of the subject.
- `scope`: a claim that defines the permissions or authorizations requested for this operation, expressed in terms understood by the PDP.

Additional claims such as `txn` (transaction ID), `aud` (audience), `iat` (issued at), and `exp` (expiration) **SHOULD** also be present to ensure integrity, traceability, and token lifecycle enforcement.

The PDP **MUST** validate the authenticity, integrity, and structure of the Txn Token, including verifying the signature, expiration time (`exp`), and intended audience (`aud`). The token **MUST NOT** be accepted if any of these validations fail.

If the Txn Token is missing, malformed, expired, or otherwise invalid, the PDP **MUST** reject the request and return an appropriate error response (e.g., `invalid_token`, `unauthorized_actor`, or `insufficient_scope`).
