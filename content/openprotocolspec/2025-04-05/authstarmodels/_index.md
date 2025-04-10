---
title: Auth* Models
cascade:
  type: docs
weight: 40
prev: openprotocolspec/2025-04-05/
---

The `Auth Models*`, where `Auth*` covers both Authentication (`AuthN`) and Authorization (`Authz`), are built for a Zero Trust setup. In this kind of system, these models need to have certain features:

- **Transferable**: Meaning they can move easily between different systems and places without trouble.
- **Versionable and Immutable**: So the data stays safe, can be checked later, and works with older versions if needed.
- **Resilient to Disconnection**: Keeping things consistent even when there’s no connection, catching up later when they reconnect.
