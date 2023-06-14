const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");
const verify = require("../models/verification.js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config.js');

const viewAnnouncement = require('../models/announcement/viewAnnouncements_model.js');
const viewDetailAnnouncement = require("../models/announcement/viewDetailAnnouncement_model.js");
const resetPasswordEmail = require('../models/reset_password_email.js');
const updatePassword = require('../models/update_password.js');

var User = new Map();
/**
 *  Receive post method to regist
 */
exports.postRegist = function(req, res, next) {
    // encrypt password 
    const enPassword = bcrypt.hashSync(req.body.UPassword, 10);
    userData = {
        UID: req.body.UID,
        UPassword: enPassword,
        UName: req.body.UName,
        UType: req.body.UType,
        Email: req.body.Email
    }; // need to communicate with front end, and the name should be the same with db column name
    regist(userData).then((result) => {
        res.json({
            result: result
        }) 
    }).catch((err) => {
        res.json({
            err: err
        })
    });
}

/**
 * Login for student
 */
exports.postLogin = function(req, res, next) {
    let userData = {
        UID: req.body.UID,
        UPassword: req.body.UPassword
    };
    login(userData).then((rows) => {
        // if login imformation is wrong, rows will return null
        // make token that is set expired after an hour, and let StuID be the token data
        let token = jwt.sign({ UID: rows.UID, UType: rows.UType }, config.secret, { expiresIn: '1d' });
        // set token at cookie
        res.cookie('token', token, {httpOnly: true});
        res.redirect(`${rows.UType}?UName=${rows.UName}`);
        // res.render(`${rows.UType}`, {result: rows});
    }).catch((err) => {
        res.render('login', {err: err});
    })
}

exports.getIndex = function(req, res, next) {
    viewAnnouncement().then((rows) => {
        res.render('index', {data: rows});
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.getAnnouncement = function(req, res, next) {
    viewAnnouncement().then((rows) => {
        res.render('announcement', {data: rows});
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.getDetailAnnouncement = function(req, res, next) {
    let announcement = {
        AnnounceNumber: req.query.AnnounceNumber
    }
    viewDetailAnnouncement(announcement).then((rows) => {
        res.render('announce_detail', {data: rows});
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.getIntroduction = function(req, res, next) {
    res.render('dorm_introduction');
}

exports.getForgotPassword = function(req, res, next) {
    res.render('forgot_password');
}

exports.postForgotPassword = function(req, res, next) {

    // 建立 token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 加密  token
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    // 設定 token 過期時間
    const resetPasswordExpire = Date.now() + 1000 * 60 * 10;
    let UID = req.body.UID;
    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${UID}/${resetToken}`;

    User.set(UID, [resetPasswordToken, resetPasswordExpire]);
    console.log(UID);
    console.log(User.get(UID));
    console.log(resetPasswordToken);

    resetPasswordEmail(UID, resetUrl).then((result) => {
        console.log("123");
    }).catch((result) => {
        console.log("456");
    })
}

exports.getResetPassword = function(req, res, next) {

    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

    // 如果使用者有更改密碼的需求，token也確實符合，token也尚未過期
    if (User.has(req.params.UID) && resetPasswordToken === User.get(req.params.UID)[0] && Date.now() <= User.get(req.params.UID)[1]) {
        res.render('reset_password');
    } else {
    }
}

exports.putResetPassword = function(req, res, next) {
    // encrypt password 
    const enPassword = bcrypt.hashSync(req.body.UPassword, 10);
    let user = {
        UID: req.params.UID,
        UPassword: enPassword,
    };
    updatePassword(user).then((result) => {
        res.redirect('/');
    }).catch((err) => {
        res.json({
            err: err
        })
    });
}
