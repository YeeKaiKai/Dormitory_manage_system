const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");
const verify = require("../models/verification.js");
const addComment = require("../models/messageBoard/addComment_model.js");

const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

/**
 *  Receive post method to regist
 */
exports.postRegist = function(req, res) {
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
exports.postStudentLogin = function(req, res) {
    studentData = {
        SAccount: req.body.SAccount,
        SPassword: req.body.SPassword
    };
    console.log(req);
    login(studentData).then((result) => {
        // make token that is set expired after an hour, and let StuID be the token data
        let token = jwt.sign({
            algorithm: 'HS256',
            exp: Math.floor(Date.now() / 1000, (60 * 60)),
            data: result[0].StuID
        }, config.secret);
        // set token at header
        res.setHeader('token', token);
        res.json({
            result: result,
        })
    }).catch((err) => {
        res.json({ 
            err: err
        })
    })
}

exports.postComment = function(req, res) {
    let token = req.headers['token'];
    verify(token).then((data) => {
        let message = {
            StuID: data,
            MContent: "%%%",
        }
        addComment(message).then((result) => {
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

