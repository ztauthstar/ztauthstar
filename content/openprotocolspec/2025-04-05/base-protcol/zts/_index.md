---
title: Zero Trust Token Service
cascade:
  type: docs
weight: 3400
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-models/language-blob
next: /openprotocolspec/2025-04-05/base-protcol/decision-points
---

The **Zero Trust Token Service (ZTS)** is a core component of the **ZTAuth\*** protocol.  

It acts as a **Secure Token Service (STS)** that issues tokens with a specific **profile** and **schema**, compatible with the [**OAuth Transaction Token**](https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/) model.

ZTS is designed to support both **human** and **non-human identities**, and must follow the core principles of **Zero Trust**, such as least privilege, strong identity verification, and context-aware authorization.
