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
const viewAllViolation = require("../models/violation/viewAllViolation_model.js");
const updateViolation = require("../models/violation/updateViolation_model.js");

const viewDormitory = require("../models/dormitory/viewDormitory_model.js");
const exp = require("constants");
const makeRepairForm = require("../models/repairForm/makeRepairForm.js");
const viewAllRepairForm = require("../models/repairForm/viewAllRepairForm.js");
const viewPersonalRepairForm = require("../models/repairForm/viewPersonalRepairForm.js");

exports.postAnnouncement = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let announcement = {
            AnnounceTitle: req.body.AnnounceTitle,
            AnnounceContent: req.body.AnnounceContent,
            SSN: data.UID,
            UType: data.UType
        }
        addAnnouncement(announcement).then((result) => {
            res.redirect('/housemaster/announcement');
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
    viewAnnouncement().then((rows) => {
        res.render('housemaster_announce', {data: rows});
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.putAnnouncement = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let announcement = {
            AnnounceTitle: req.body.AnnounceTitle,
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
        res.render('housemaster_message_board', {data: rows});
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
            // res.json({
            //     rows: rows
            // })
            res.render('housemaster_boarder', {data: rows});
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
            VContent: req.body.VContent,
            DATE: req.body.DATE
        }
        addViolation(violation).then((result) => {
            // res.json({
            //     result: result
            // })
            res.redirect('/housemaster/violation');
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
        viewAllViolation().then((rows) => {
            // res.json({
            //     rows: rows
            // })
            res.render('housemaster_violation', {data: rows});
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

exports.getDormitory = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let dormitory = {
            DName: req.query.DName,
            RoomNumber: req.query.RoomNumber,
            FName: req.query.FName
        }
        viewDormitory(dormitory).then((rows) => {
            // res.json({
            //     rows: rows
            // })
            res.render('housemaster_dormitory', {data: rows});
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

exports.postRepairForm = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let repairForm = {
            UID: data.UID,
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            FName: req.body.FName,
            Freetime: req.body.Freetime,
            RContent: req.body.RContent
        }
        makeRepairForm(repairForm).then((result) => {
            console.log(result);
            res.json({
                result: result
            })
        }).catch((err) => {
            console.log(err);
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

exports.getAllRepairForm = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        viewAllRepairForm().then((rows) => {
            res.json({
                data: rows
            })

            // ! need to render back to frontend
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

exports.getPersonalRepairForm = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let UID = data.UID;
        viewPersonalRepairForm(UID).then((rows) => {
            res.json({
                data: rows     
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