Inspired by [Branneman's gist](https://gist.github.com/branneman/8048520#7-the-wrapper), a global function is available for all the internal Node modules to *require* other internal modules, without having to use relative paths.

The function is placed at the very beginning of the `server.js` file, making it available for the remaining modules at the server's start up:

```javascript
global.appRequire = function(name) {
    return require(__dirname + '/' + name);
}
```

An internal module path is then defined from the root directory of the server, without the initial `/` directory separator. As an example, instead of requiring a module as:

```javascript
var User = require('../../models/users')
```

We can do it as:

```javascript
var User = appRequire('models/user')
```
