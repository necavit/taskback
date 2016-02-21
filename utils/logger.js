// customized Winston logger to be used throughout the application
var winston = require('winston');

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info', // only log info, warn and error messages to the file
      filename: './logs/all-logs.log',
      handleExceptions: true, // enable logging of unhandled exceptions
      humanReadableUnhandledException: true,
      json: true, // structured logs to be able to parse them easily by a machine
      maxsize: 5242880, // 5MB. When full, a new file is created with a counter suffix
      maxFiles: 10, // the maximum number of log files to be created
      tailable: true, // 'all-logs.log' will always have the most recent log lines.
                      //    The larger the appended number, the older the log file.
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug', // in development mode, all logs are also output to the console
      handleExceptions: true, // enable logging of unhandled exceptions
      json: false,
      colorize: true
    })
  ],
  exitOnError: false // do not exit the application after logging an uncaughtException
});

// add handler for logger internal errors
logger.on('error', function (err) {
  console.error('Winston logger experienced an internal error.');
});

// export the configured logger, to be used by require('[rel. path]/logger')
module.exports = logger;

// provide an output stream for the Morgan access logger middleware
module.exports.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
