// customized require function for internal app modules, such as controllers,
//   models, utils, configuration helpers, handlers, etc.
// to be used as: 'var User = appRequire('models/user')'
//    instead of: 'var User = require('../../models/users')'
// source: https://gist.github.com/branneman/8048520#7-the-wrapper
global.appRequire = function(name) {
    return require(__dirname + '/' + name);
}

// third-party dependencies
var express     = require('express');     // call express
var bodyParser  = require('body-parser'); // used to parse POST bodies
var path        = require('path');        // file sytem path utils
var fs          = require('fs');          // file system operation utils
var morgan      = require('morgan');      // access logger middleware

// internal modules dependencies and utils
//  NOTE The order is important! 'mongoconnector' relies on 'config', which in turn
//  relies on 'logger'
var logger = appRequire('utils/logger'); // require and initialize custom logger module
var config = appRequire('config/config'); // server configuration parameters (port, db)
var mongoconnector = appRequire('utils/mongoconnector');

// asyncronously connect to the database (errors are logged, if any)
mongoconnector.connect();

// create the Express web application
var app = express();

// setup access logger middleware (morgan) to use a reduced output format and
//  redirect its output (stdout by default) to the stream provided by our custom
//  Winston logger module, which writes to different 'transports'
app.use(morgan('short', logger.stream));

// use bodyParser middleware: this will let us get the data from a POST body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files under the 'public' directory
// TODO app.use(express.static('public'));

// routing
// var apiRouter = require('./routes/api'); // API router
// app.use('/api', apiRouter()); //

// assume any other route as not found: 404 handler (last route handler!)
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// error handling middleware (last of all!)
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Oops... Something broke! Check the logs!');
});

// server start
var port = config.port;
app.listen(port);
logger.info('Magic happens on port ' + port);
