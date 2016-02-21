// Exports an object 'config' with the appropriate values, retrieved in some cases
//   from the process' environment. To do this, we evaluate a function (thus the
//   '(function(args){ bla bla })' syntax - note the parenthesis around the funciton!)
//   passing the arguments needed - process environment variables in this case.
// The configurator fails and interrupts the process if some of the variables are not
//   set, which doesn't mean that they're correct! ;)

module.exports = (function (usr,pwd) {
  var config = {};

  // check that the mongodb environment is correct
  if (!usr) {
    console.error('MONGO_USR environment variable not set');
    process.exit(1);
  }
  if (!pwd) {
    console.error('MONGO_PWD environment variable not set');
    process.exit(1);
  }
  // add the mongodb credentials to the connection URL
  config.mongodb = {};
  config.mongodb.url =
    'mongodb//'+usr+':'+pwd+'@ds055875.mongolab.com:55875/taskback'

  // set up the port to which the server will listen
  config.port = 3000;

  // return the whole configuration object
  return config;
})(process.env.MONGO_USR, process.env.MONGO_PWD);
