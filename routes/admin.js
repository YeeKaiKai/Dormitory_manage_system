var express = require('express');
var router = express.Router();
const controller = require("../controllers/admin.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', {UName: req.query.UName});
});

router.post('/announcement', controller.postAnnouncement);
router.delete('/announcement', controller.deleteAnnouncement);
router.get('/announcement', controller.getAnnouncement);
router.put('/announcement', controller.putAnnouncement);

router.get('/application', controller.getApplicationByAdmin);
router.put('/application', controller.putApplication);

router.post('/payment_notice', controller.postPaymentNotice);

router.post('/dormitory', controller.postDormitory);
router.post('/dormitory/room', controller.postRoom);
router.post('/dormitory/room/facility', controller.postFacility);
router.delete('/dormitory', controller.deleteDormitory);
router.delete('/dormitory/room', controller.deleteRoom);
router.delete('/dormitory/room/facility', controller.deleteFacility);
router.get('/dormitory', controller.getDormitory);
router.get('/dormitory/room', controller.getRoom);
router.get('/dormitory/room/facility', controller.getFacility);
router.put('/dormitory', controller.putDormitory);
router.put('/dormitory/room', controller.putRoom);
router.put('/dormitory/room/facility', controller.putFacility);

router.post('/boarder', controller.postBoarder);
router.delete('/boarder', controller.deleteBoarder);
router.get('/boarder', controller.getBoarder);
router.put('/boarder', controller.putBoarder);

router.patch('/repairForm', controller.patchRepairForm);
router.get('/repairForm/all', controller.getAllRepairForm);

module.exports = router;
