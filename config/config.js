module.exports = (function (env) {
  // the custom logger is already loaded (it is the first module to be
  //   loaded in the server), so we can use it to log errors and information
  //   about the rest of the configuration
  var logger = appRequire('utils/logger');
  var config = {};
  switch (env) {
    case 'production':
      config = require('./env/production');
      break;
    case 'development':
      config = require('./env/development');
      logger.debug('//////////////////////////');
      logger.debug('DEVELOPMENT CONFIGURATION:');
      logger.debug(JSON.stringify(config, null, 2));
      logger.debug('//////////////////////////\n');
      break;
    default:
      logger.error('NODE_ENV environment variable not set');
      process.exit(1);
  }
  return config;
})(process.env.NODE_ENV);
