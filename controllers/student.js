const verify = require("../models/verification.js");

const addMessage = require("../models/messageBoard/addMessage_model.js");
const removeMessage = require("../models/messageBoard/removeMessage_model.js");
const viewMessage = require("../models/messageBoard/viewMessage_model.js");
const updateMessage = require("../models/messageBoard/updateMessage_model.js");

const makeApplication = require("../models/application/makeApplication_model.js");
const inquiryApplication = require("../models/application/inquireApplication_model.js");

const viewAnnouncement = require("../models/announcement/viewAnnouncements_model.js");

const viewViolation = require("../models/violation/viewViolation_model.js");

const makeRepairForm = require("../models/repairForm/makeRepairForm.js");
const viewAllRepairForm = require("../models/repairForm/viewAllRepairForm.js");
const viewPersonalRepariForm = require("../models/repairForm/viewPersonalRepairForm.js");
const updateRepariForm = require("../models/repairForm/updateRepariForm.js");
const viewAccommodateInformation = require("../models/accommodation/viewAccommodateInformation_model.js");

exports.postMessage = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let message = {
            StuID: data.UID,
            MTitle: req.body.MTitle,
            MContent: req.body.MContent,
        }
        addMessage(message).then((result) => {
            // res.json({
            //     result: result
            // })
            res.redirect('/STUDENT/messageBoard');
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
            // res.set({
            // 'Authorization': auth
            // })
            // res.redirect('/login');
            // res.end();
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
    let token = req.cookies.token;
    verify(token).then((data) => {
        let UID = data.UID;
        console.log(UID);
        viewMessage().then((rows) => {
            // res.json({
            //     result: rows
            // })
            res.render('student_message_board', {data: rows, UID: UID});
        }).catch((err) => {
            res.json({
                result: err
            })
        })
    }).catch((err) => {
        res.json({
            err: err
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
            UType: data.UType,
            DName: req.body.DName,
            ARoomNumber: req.body.ARoomNumber,
            AType: req.body.AType
        }
        makeApplication(application).then((result) => {
            // res.json({
            //     result: result
            // })
            res.redirect('/student/application');
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

exports.getApplicationByStudent = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let inquiry = {
            StuID: data.UID
        };
        // console.log(inquiry);
        inquiryApplication(inquiry).then((rows) => {
            console.log(rows);
            res.render('student_apply', {data: rows});
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
        res.render('student_announce', {data: rows});
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
            StuID: data.UID
        }
        viewViolation(violation).then((rows) => {
            res.render('student_violation', {data: rows});
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
            res.redirect('/student/repairForm/all');
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
        let UID = data.UID;

        viewAllRepairForm().then((rows) => {
            console.log(rows);
            res.render('student_repair', {data: rows, UID: UID});
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

        viewPersonalRepariForm(UID).then((rows) => {
            console.log(rows);
            res.render('student_repair', {data: rows, UID: UID});

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

exports.patchRepairForm = function(req, res, next) {
    let token = req.cookies.token;

    verify(token).then((data) => {
        let identity = data;
        let newRepairForm = req.body;
        
        updateRepariForm(identity, newRepairForm).then((result) => {
            console.log(result);
            res.redirect('/student/repairForm/personal');
        }).catch((err) => {
            console.log(err);
        })
    })
}

exports.getAccommodateInformation = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            StuID: data.UID
        }
        viewAccommodateInformation(boarder).then((rows) => {
            res.render('student_information', {data: rows});
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