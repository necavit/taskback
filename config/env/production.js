module.exports = (function () {
  var config = {};

  // properties file not checked into Git!
  var prod = require('./prod-properties');

  // check that the mongodb environment is correct
  if (!prod) {
    console.error('Production properties file not loaded. Please check its existence and the values it has.');
    process.exit(1);
  }

  // add the mongodb credentials to the connection URL
  config.mongodb = {};
  var mongoUrl = prod.mongo.uri
    .replace('<dbuser>', prod.mongo.usr)
    .replace('<dbpassword>', prod.mongo.pwd);
  config.mongodb.url = mongoUrl;

  // set up the port to which the server will listen
  config.port = prod.port;

  // return the whole configuration object
  return config;
});
