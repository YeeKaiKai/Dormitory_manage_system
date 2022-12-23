var express = require('express');
var router = express.Router();
var test = require("../controllers/controller.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
