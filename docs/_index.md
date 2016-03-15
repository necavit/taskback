# Infrastructure !heading

Informally, the Taskback platform infrastructure can be described by the following diagram:

![Taskback Ecosystem](img/taskback-ecosystem.png)

The following subsections deal with the details of each of the pieces of this infrastructure, from installation to configuration.

> **NOTE:** All of the instructions provided assume that the target environment is a working Ubuntu 14.04 LTS Linux, where the user is not `root`, but has `sudo` privileges nontheless.

## Nginx !heading
#include "docs/infrastructure/nginx.md"

## Node !heading
#include "docs/infrastructure/node.md"

## Security !heading
#include "docs/infrastructure/security.md"

## MongoDB !heading
#include "docs/infrastructure/database.md"

## Deployment !heading
#include "docs/infrastructure/deployment.md"


# The Taskback server !heading

The following sections cover not the features implementation details, but some of the inner mechanisms and particular developments of the Taskback Node.js server. If you want, go take a look at the [REST API section](#api) for more information about features!

## Logger !heading
#include "docs/taskback-server/logger.md"

## Internal Module Requires !heading
#include "docs/taskback-server/require-apprequire.md"

# REST API !heading
#include "docs/api/api.md"
