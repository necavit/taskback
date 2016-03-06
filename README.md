# Taskback

**Taskback** is a MEAANN (MongoDB, ExpressJS, AngularJS, Android, NodeJS, Nginx) stack platform to manage personal TODO and task lists. You can check the [list of features](#features) to get a better idea of what it does.

**[Documentation](docs/dev-manual.md)**

#### But... Why?

There are tons of apps and services to manage TODO lists, tasks and information lists. I know that. I use some of them, but none have proven to be flexible and light-weight enough for my needs. Besides, no task management service or app supports [Gingerbread](http://developer.android.com/about/dashboards/index.html#Platform) anymore, even though we are still quite a lot of users out there, so this is a way to keep my device running this kind of application.

And it is indeed for fun. And learning, mostly learning!

### The ecosystem

The Taskback ecosystem consists of the following pieces: a MongoDB database, a NodeJS server (using ExpressJS as the web framework of choice), an AngularJS web app and a native Android app.

![Taskback Ecosystem](docs/img/taskback-ecosystem.png)

## Documentation

*Disclaimer: I find convenient to document things that might seem obvious for other people, because I am not a senior developer and because I tend to forget what I did in my projects after a week.*

* Technical documentation regarding the **infrastructure**, **deployment** or internal structure of the web server can be found in the [Developer Manual](docs/dev-manual.md).
* The Taskback [REST API documentation](docs/api/api.md) is separated from the rest of the docs to isolate the conceptual details of the service from the implementation details.

#### Documentation generation

The [Developer Manual](docs/dev-manual.md) is generated from smaller "modules" (documents), using the awesome [markdown-include](https://github.com/sethen/markdown-include) node.js-based CLI tool. It can be found in the [NPM repository](https://www.npmjs.com/package/markdown-include) and installed as a global package by executing: `sudo npm install -g markdown-include`.

To generate the Manual, execute:

```bash
markdown-include docs/documentation.json
```

in the root of the project, where `documentation.json` is the configuration file used by the tool to wire up all the components and generate the table of contents as well. Actually, the only file being processed by `markdown-include` is `docs/_index.md`, which contains all the necessary documentation files inclusions, in the form of `#include docs/infrastructure/database.md`, for example.

## Features

**Work in progress!**

The following is a high-level overview of the platform features (use cases, from the user's point of view):

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

## [License](LICENSE)

Taskback is [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software)! It is licensed with a MIT [permissive license](https://en.wikipedia.org/wiki/Permissive_free_software_licence). See the [license document](LICENSE) for more information.

```
The MIT License (MIT)

Copyright (c) 2016 David Martínez Rodríguez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
