mongoconnector = {
  connect: function (){
    var mongoose = require('mongoose'); // mongoose ODM driver
    var config = appRequire('config/config');
    var logger = appRequire('utils/logger');

    var mongooseUri = config.mongodb.url;
    mongoose.connect(mongooseUri);
    var db = mongoose.connection;
    // db, the connection, is actually an EventEmitter. Therefore, we register
    //  some listeners for some of the events
    db.on('error', function() {
      logger.error('Database connection could not be established.');
      process.exit(1);
    });
    db.once('open', function() {
      // we're connected!
      logger.info('Server successfully connected to MongoDB!');
    });
  }
}
module.exports = mongoconnector;
