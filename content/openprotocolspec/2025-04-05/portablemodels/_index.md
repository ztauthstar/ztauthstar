---
title: Portable Models
cascade:
  type: docs
weight: 60
prev: openprotocolspec/2025-04-05/
---

`ZTAuth*` implements `Auth*` and `Trusted` models that are designed to be immutable, versionable, and transferable. For certain targets, such as instances of thin clients (e.g., web applications or hardware), it’s not feasible to port the entire model history.

In this context, `Portable Models` come into play. The idea is to extract the latest snapshot of those models, which must also be signed as a certification, and transfer it to the target.

For example:

- A browser could request a portable model to enforce client-side security first.
- A blockchain could receive a portable model from an oracle, which is fed with the portable model.
