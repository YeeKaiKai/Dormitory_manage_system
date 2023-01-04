var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/messageBoard', controller.deleteMessage);
router.get('/messageBoard', controller.getMessage);

router.post('/announcement', controller.postAnnouncement);
router.delete('/announcement', controller.deleteAnnouncement);
// router.get('/announcement', controller.getAnnouncement);
router.put('/announcement', controller.putAnnouncement);

router.get('/boarder', controller.getBoarder);


module.exports = router;
