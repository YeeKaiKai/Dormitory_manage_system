var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/messageBoard', controller.postMessage);
router.delete('/messageBoard', controller.deleteMessage);
router.get('/messageBoard', controller.getMessage);
router.put('/messageBoard', controller.putMessage);

// router.get('/announcement', controller.getAnnouncement);

router.post('/application', controller.postApplication);
router.get('/application', controller.getApplicationByStudent);

module.exports = router;
