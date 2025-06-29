---
title: Authorization Endpoint
cascade:
  type: docs
weight: 3500
prev: /openprotocolspec/2025-04-05/base-protcol/decision-points
next: /openprotocolspec/2025-04-05/appendix-a-list-of-specs/
---

The `Authorization Endpoint` is a key component of the **ZTAuth*** protocol. It is responsible for evaluating authorization requests and producing decisions based on the auth* models and contextual information.

The payload structure follows the format defined in the [OpenID AuthZEN specification](https://openid.net/specs/authorization-api-1_0-01.html), ensuring compatibility with existing authorization flows.

To support the requirements of the ZTAuth\* protocol, the request is extended with an additional field named `authorization_model`. This object provides contextual data required for Zero Trust evaluation and may include the following fields:

- `zone_id`: An identifier representing the Zero Trust zone relevant to the request.
- `ledger_id`: A reference to the specific ledger or model repository where authorization policies are stored.
- `tx_token`: A transaction token create by the transaction token service

These fields are illustrative and intended to demonstrate how the `authorization_model` can be extended to carry protocol-specific context for ZTAuth\*. Their presence and structure may vary depending on implementation needs.
