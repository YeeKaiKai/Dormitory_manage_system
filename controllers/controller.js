const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");
const verify = require("../models/verification.js");

const addMessage = require("../models/messageBoard/addMessage_model.js");
const removeMessage = require("../models/messageBoard/removeMessage_model.js");
const viewMessage = require("../models/messageBoard/viewMessage_model.js");
const updateMessage = require("../models/messageBoard/updateMessage_model.js");

const addAnnouncement = require("../models/announcement/addAnnouncement_model.js");
const removeAnnouncement = require("../models/announcement/removeAnnouncement_model.js");
const viewAnnouncement = require("../models/announcement/viewAnnouncements_model.js");
const updateAnnouncement = require("../models/announcement/updateAnnouncement_model.js");

const check = require("../service/check.js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

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
        UType: req.body.UType
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
        let token = jwt.sign({ UID: rows.UID, UType: rows.UType }, config.secret, { expiresIn: '10m' });
        // set token at cookie
        res.cookie('token', token, {httpOnly: true});
        res.json({
            result: rows,
        })
    }).catch((err) => {
        console.log(err);
        res.json({ 
            err: err
        })
    })
}

exports.postMessage = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let message = {
            StuID: data.UID,
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
            MContent: req.body.MContent,
            MNumber: req.body.MNumber
        }
        updateMessage(message).then((result) => {
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

exports.postAnnouncement = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let announcement = {
            AnnounceContent: req.body.AnnounceContent,
            SSN: data.UID,
            UType: data.UType
        }
        addAnnouncement(announcement).then((result) => {
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