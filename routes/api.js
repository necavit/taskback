var express = require('express');

module.exports = function () {
  var router = express.Router();

  // return the API documentation
  router.get('/', function (req, res, next) {
    res.redirect('/public');
  });

  return router;
};
