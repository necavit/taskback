# Table of Contents

1. [taskback](#taskback)
  1. [Documentation generation](#documentation-generation)
1. [Deployment](#deployment)
1. [Database](#database)


# taskback
**taskback** is a simple MEAN stack platform to manage personal TODO and task lists.

### But... Why?

There are tons of apps and services to manage TODO lists, tasks and information lists. I know that. I use some of them, but none have proven to be flexible and light-weight enough for my needs. Besides, no task management service or app supports [Gingerbread](http://developer.android.com/about/dashboards/index.html#Platform) anymore, even though we are still quite a lot of users out there, so this is a way to keep my device running this kind of application.

And it is indeed for fun. And learning, mostly learning.

### Features

**Work in progress!** The following is a high-level overview of the platform features (use cases, from the user's point of view):

* TODO list
  * Create a simple TODO
    * Define title
    * Assign priority
    * Optionally, add due date
  * View the list of TODOs
  * Complete (delete) a TODO
* Tasks list
  * Create a "complex" task with
    * Title
    * Priority (optional)
    * Description (optional)
    * Category (optional)
    * Due date (optional)
    * Checklist (optional)
  * View the list of tasks
    * Filter/order by category/priority
  * Complete a task
* Shop list
  * Create a shop list item (just a title)
  * Archive an item (on completion, by default)
  * Delete an item


## Documentation generation
This README file is generated from smaller modules, using the awesome [markdown-include](https://github.com/sethen/markdown-include) CLI tool. It can be found in the [NPM repository](https://www.npmjs.com/package/markdown-include) and installed as a global package by: `sudo npm install -g markdown-include`.

To generate the README, execute:

```bash
markdown-include docs/documentation.json
```

from the root of the project, where `documentation.json` is the config file used by the tool to wire up all the components and generate the table of contents as well. Actually, the only file being processed by `markdown-include` is `docs/_README.md`, which contains all the necessary documentation files inclusions, in the form of `#include docs/database.md`, for example.


# Deployment

To deploy the server into production, just execute:

```bash
git push deploy master
```
And you are done!

# Database

The database that `taskback` is using is [MongoDB](https://www.mongodb.org/)

