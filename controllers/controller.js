const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");
const verify = require("../models/verification.js");

const addMessage = require("../models/messageBoard/addMessage_model.js");
const removeMessage = require("../models/messageBoard/removeMessage_model.js");
const viewMessage = require("../models/messageBoard/viewMessage_model.js");
const updateMessage = require("../models/messageBoard/updateMessage_model.js");

const check = require("../service/check.js");

const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

/**
 *  Receive post method to regist
 */
exports.postRegist = function(req, res, next) {
    studentData = {
        StuID: "111", 
        SAccount: "222",
        SPassWord: "333", 
        SName: "444",
        SEmail: "555",
        SPhoneNumber: "666"
    }; // need to communicate with front end, and the name should be the same with db column name
    regist(studentData).then((result) => {
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
exports.postStudentLogin = function(req, res, next) {
    studentData = {
        SAccount: req.body.SAccount,
        SPassword: req.body.SPassword
    };
    login(studentData).then((rows) => {
        if(check.checkNull(rows) === true) {
            res.json({
                result: "請輸入正確的帳號密碼！"
            })
        } else {
            // make token that is set expired after an hour, and let StuID be the token data
            let token = jwt.sign({
                algorithm: 'HS256',
                // token expired after an hour 
                exp: Math.floor(Date.now() / 1000, (60 * 60)),
                data: rows[0].StuID
            }, config.secret);
            // set token at cookie
            res.cookie('token', token, {httpOnly: true});
            res.json({
                result: rows,
            })
        }
    }).catch((err) => {
        res.json({ 
            err: err
        })
    })
}

exports.postMessage = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let message = {
            StuID: data,
            MContent: req.body.MContent,
        }
        addMessage(message).then((result) => {
            res.json({
                result: result
            })
        }).catch((err) => {
            res.json({
                err: err
            })
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.deleteMessage = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let message = {
            StuID: data,
            MNumber: req.body.MNumber
        }
        removeMessage(message).then((result) => {
            res.json({
                result: result
            })
        }).catch((err) => {
            res.json({
                err: err
            })
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.getMessage = function(req, res, next) {
    viewMessage().then((rows) => {
        res.json({
            result: rows
        })
    }).catch((err) => {
        res.json({
            result: err
        })
    })
}

exports.putMessage = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let message = {
            StuID: data,
            MContent: req.body.MContent,
            MNumber: req.body.MNumber
        }
    })
    updateMessage(message).then((result) => {
        res.json({
            result: result
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}