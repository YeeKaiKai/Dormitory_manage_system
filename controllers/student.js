const verify = require("../models/verification.js");

const addMessage = require("../models/messageBoard/addMessage_model.js");
const removeMessage = require("../models/messageBoard/removeMessage_model.js");
const viewMessage = require("../models/messageBoard/viewMessage_model.js");
const updateMessage = require("../models/messageBoard/updateMessage_model.js");

const makeApplication = require("../models/application/makeApplication_model.js");
const inquiryApplication = require("../models/application/inquireApplication_model.js");

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

exports.postApplication = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let application = {
            StuID: data.UID,
            DName: req.body.DName,
        }
        makeApplication(application).then((result) => {
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

exports.getApplicationByStudent = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let inquiry = {
            StuID: data.UID
        };
        inquiryApplication(inquiry).then((rows) => {
            res.json({
                rows: rows
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
