const verify = require("../models/verification.js");

const addAnnouncement = require("../models/announcement/addAnnouncement_model.js");
const removeAnnouncement = require("../models/announcement/removeAnnouncement_model.js");
const viewAnnouncement = require("../models/announcement/viewAnnouncements_model.js");
const updateAnnouncement = require("../models/announcement/updateAnnouncement_model.js");

const removeMessage = require("../models/messageBoard/removeMessage_model.js");
const viewMessage = require("../models/messageBoard/viewMessage_model.js");

const viewBoarder = require("../models/boarder/viewBoarder_model.js");

const addViolation = require("../models/violation/addViolation_model.js");
const removeViolation = require("../models/violation/removeViolation_model.js");
const viewViolation = require("../models/violation/viewViolation_model.js");
const updateViolation = require("../models/violation/updateViolation_model.js");

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

exports.deleteAnnouncement = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let announcement = {
            AnnounceNumber: req.body.AnnounceNumber
        }
        removeAnnouncement(announcement).then((result) => {
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

exports.getAnnouncement = function(req, res, next) {
    // viewAnnouncement().then((rows) => {
    //     res.json({
    //         rows: rows
    //     })
    // }).catch((err) => {
    //     res.json({
    //         err: err
    //     })
    // })
}

exports.putAnnouncement = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let announcement = {
            AnnounceContent: req.body.AnnounceContent,
            AnnounceNumber: req.body.AnnounceNumber
        }
        updateAnnouncement(announcement).then((result) => {
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

exports.getBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        viewBoarder().then((rows) => {
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

exports.postViolation = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let violation = {
            StuID: req.body.StuID,
            VContent: req.body.VContent
        }
        addViolation(violation).then((result) => {
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

exports.deleteViolation = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data)=> {
        let violation = {
            StuID: req.body.StuID,
            VNumber: req.body.VNumber
        }
        removeViolation(violation).then((result) => {
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

exports.getViolation = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let violation = {
            StuID: req.query.StuID
        }
        viewViolation(violation).then((rows) => {
            res.json({
                rows: rows
            })
        }).catch((err) => {
            res.json({
                err: err
            })
        })
    }).catch((err) => {
        console.log(err);            
        res.json({
            err: err
        })
    })
}

exports.putViolation = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let violation = {
            StuID: req.body.StuID,
            VNumber: req.body.VNumber,
            VContent: req.body.VContent
        }
        updateViolation(violation).then((result) => {
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