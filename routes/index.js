var express = require('express');
var router = express.Router();
const controller = require("../controllers/index.js");

/* GET home page. */
router.get('/', controller.getIndex);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/login', function(req, res, next) {
  res.render('login', {err: null});
});

router.post('/register', controller.postRegist);
router.post('/login', controller.postLogin);
router.post('/forgotPassword', controller.postForgotPassword);
router.get('/forgotPassword', controller.getForgotPassword);
router.get('/resetPassword/:UID/:resetToken', controller.getResetPassword);
router.post('/resetPassword/:UID/:resetToken', controller.putResetPassword);
router.get('/announcement', controller.getAnnouncement);
router.get('/announcement/detail', controller.getDetailAnnouncement);
router.get('/introduction', controller.getIntroduction);

module.exports = router;
