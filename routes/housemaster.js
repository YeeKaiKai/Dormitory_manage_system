var express = require('express');
var router = express.Router();
const controller = require("../controllers/housemaster.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('housemaster', {UName: req.query.UName});
});

router.delete('/messageBoard', controller.deleteMessage);
router.get('/messageBoard', controller.getMessage);

router.post('/announcement', controller.postAnnouncement);
router.delete('/announcement', controller.deleteAnnouncement);
router.get('/announcement', controller.getAnnouncement);
router.put('/announcement', controller.putAnnouncement);

router.get('/boarder', controller.getBoarder);

router.post('/violation', controller.postViolation);
router.delete('/violation', controller.deleteViolation);
router.get('/violation', controller.getViolation);
router.put('/violation', controller.putViolation);

router.get('/dormitory', controller.getDormitory);
router.get('/dormitory/room', controller.getRoom);
router.get('/dormitory/room/facility', controller.getFacility);

router.post('/repairForm', controller.postRepairForm);
router.get('/repairForm/all', controller.getAllRepairForm);
router.get('/repairForm/personal', controller.getPersonalRepairForm);
router.patch('/repairForm', controller.patchRepairForm);

module.exports = router;
