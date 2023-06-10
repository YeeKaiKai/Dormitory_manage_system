var express = require('express');
var router = express.Router();
const controller = require("../controllers/student.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('student', {UName: req.query.UName});
});

router.post('/messageBoard', controller.postMessage);
router.delete('/messageBoard', controller.deleteMessage);
router.get('/messageBoard', controller.getMessage);
router.put('/messageBoard', controller.putMessage);

router.get('/announcement', controller.getAnnouncement);

router.post('/application', controller.postApplication);
router.get('/application', controller.getApplicationByStudent);

router.get('/violation', controller.getViolation);

router.get('/information', controller.getAccommodateInformation);

module.exports = router;
