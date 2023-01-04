var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', controller.postRegist);
router.post('/login', controller.postLogin);

module.exports = router;
