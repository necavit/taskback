[Node](https://nodejs.org) is the back end server of choice for Taskback for a number of reasons: (a) because of the use of Javascript, it is really fast to develop a service that works with JSON natively, (b) I want to learn Javascript, (c) integration with MongoDB is really simple, (d) it is fast, (e) the asynchronous paradigm behind Node is very interesting and worthy to be learned.

> **NOTE:** The particular details about the server development are explained in the [Taskback server](#the-taskback-server) section, below. The following subsections cover the installation process and some basics about Node's environment.


### Installation

```
sudo apt-get update
sudo apt-get install nodejs
```

### Package file

The `package.json` file contains the metadata, dependencies and other items about the developed "package", this is, the server. Dependencies are indeed other Node packages (modules) that are added as libraries to the project (see *Node modules* below). An incomplete version of the `package.json` file could be the following one:

```json
{
  "name": "taskback",
  "version": "1.0.0-alpha",
  "description": "A simple MEAN stack platform to manage personal tasks and TODO lists",
  "main": "server.js",
  "scripts": {...},
  "repository": {...},
  "keywords": [...],
  "author": "necavit (David Martínez Rodríguez)",
  "license": "MIT",
  "bugs": {"url": "https://github.com/necavit/taskback/issues"},
  "homepage": "https://github.com/necavit/taskback#readme",
  "engines": {"node": "4.3.1"},
  "dependencies": {...}
}
```

### Node modules, NPM

The Node ecosystem is very rich and consists of thousands of packages that can be accessed using the native [Node Package Manager](https://www.npmjs.com) (NPM). To add a module as a dependency to the project, execute:

```
npm install [-g] PACKAGE_NAME [--save|--save-dev]
```

The `-g` switch will install the package globally, thus being accessible from any Node project (useful for Node-based CLI tools). The `--save` and `--save-dev` are used to include them in the `package.json` file, either as production or development dependencies (for testing purposes, for example).

> **NOTE:** it is important to use the `--save` switches, so that when the project is checked out from the repository (either in a new dev machine or in production), a simple `$> npm install` command issued at the root of the project will download and install the proper dependencies.
