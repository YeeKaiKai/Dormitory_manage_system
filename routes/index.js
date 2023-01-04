var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', controller.postRegist);
router.post('/login', controller.postLogin);

router.post('/messageBoard', controller.postMessage);
router.delete('/messageBoard', controller.deleteMessage);
router.get('/messageBoard', controller.getMessage);
router.put('/messageBoard', controller.putMessage);

router.post('/announcement', controller.postAnnouncement);
router.delete('/announcement', controller.deleteAnnouncement);
// router.get('/announcement', controller.getAnnouncement);
router.put('/announcement', controller.putAnnouncement);

module.exports = router;
