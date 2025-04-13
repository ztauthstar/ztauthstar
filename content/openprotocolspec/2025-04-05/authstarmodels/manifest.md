---
title: Manifest
cascade:
  type: docs
weight: 42
prev: openprotocolspec/2025-04-05/authstarmodels/model/model
next: openprotocolspec/2025-04-05/trustedmodels
---

An `Auth*` model is linked to a specific runtime, which includes the `engine` and `language` used to interpret and evaluate the model. For this reason, a **manifest** must be provided to describe the model.

> [!IMPORTANT]
> This specification does not require a fixed structure. The JSON format shown is only a suggestion and not mandatory.

The manifest includes metadata and defines the runtime and other settings for each model. Different types of models can exist.

A manifest may include metadata such as `name`, `description`, `author`, and `license`.

```json
{
    "metadata": {
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "",
        "license": "Apache-2.0"
    }
}
```

Models are designed to contain `objects`, and each `model` can be divided into `partitions`. The root partition is used for all paths where no specific partition is defined.

```json
{
    "metadata": {
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "",
        "license": "Apache-2.0"
    },
    "partitions": {
        "root": {
        }
    }
}
```

Each `partition` may have its own settings, such as runtime and schema.  
The runtime can include the language, its version, and the engine to be used.

```json
{
    "metadata": {
        "name": "oms-authz-model",
        "description": "A zero trust authz model to manage orders.",
        "author": "",
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
