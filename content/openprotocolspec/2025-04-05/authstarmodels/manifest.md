---
title: Manifest
cascade:
  type: docs
weight: 43
prev: /openprotocolspec/2025-04-05/authstarmodels/features
next: /openprotocolspec/2025-04-05/trustedmodels
---

An `Auth*` model is linked to a specific runtime, which includes the `engine` and the `language` used to interpret and evaluate the model. For this reason, a **manifest** must be provided to describe the model requirements.

> [!IMPORTANT]
> This document uses an `AuthZ` model as an example, but the same applies to any other `Auth*` model.

The manifest includes metadata and defines the runtime and other settings for each model.

A manifest has to include metadata such as `kind`, `name`, `description`, `author`, and `license`.

```json
{
    "metadata": {
        "kind": "authz",
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    }
}
```

Models are designed to contain `objects`, and each `model` can be divided into `partitions`. The `root` partition is used for all paths where no specific partition is defined.

```json
{
    "metadata": {
        "kind": "authz",
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    },
    "partitions": {
        "root": {
        }
    }
}
```

Each `partition` has its own settings, such as runtime and schema.  
The runtime has to include the language, its version, and the engine to be used.

```json
{
    "metadata": {
        "kind": "authz",
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "Nitro Agility Srl",
        "license": "Apache-2.0"
    },
    "runtimes": {
        "cedar0.0+": {
            "language": {
                "name": "cedar",
                "version": "0.0+"
            },
            "engine": {
                "name": "permguard",
                "version": "0.0+",
                "distribution": "community"
            }
        }
    },
    "partitions": {
        "root": {
            "runtime": "cedar0.0+",
            "schema": false
        }
    }
}
```
