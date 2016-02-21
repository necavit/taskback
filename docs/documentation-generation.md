This README file is generated from smaller modules, using the awesome [markdown-include](https://github.com/sethen/markdown-include) CLI tool. It can be found in the [NPM repository](https://www.npmjs.com/package/markdown-include) and installed as a global package by: `sudo npm install -g markdown-include`.

To generate the README, execute:

```bash
markdown-include docs/documentation.json
```

from the root of the project, where `documentation.json` is the config file used by the tool to wire up all the components and generate the table of contents as well. Actually, the only file being processed by `markdown-include` is `docs/_README.md`, which contains all the necessary documentation files inclusions, in the form of `#include docs/database.md`, for example.
