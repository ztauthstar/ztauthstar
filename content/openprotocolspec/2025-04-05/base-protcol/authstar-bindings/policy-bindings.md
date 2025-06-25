---
title: Policy Bindings
cascade:
  type: docs
weight: 3301
prev: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings
next: /openprotocolspec/2025-04-05/base-protcol/authstar-bindings/trist-relationships
---

The **Policy Binding** defines the mapping between identities and their associated policies.

Policies should be organized by **scope of interest**. For example, separate policy sets may exist for **regular users** and **administrative users**. While it is technically possible to use a single, flat bucket of policies, this approach becomes **unpredictable and error-prone** as the `auth*` model grows in complexity. For this reason, it is considered a best practice to **segment policies**.
