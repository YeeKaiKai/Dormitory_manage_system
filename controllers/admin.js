const verify = require("../models/verification.js");

const addAnnouncement = require("../models/announcement/addAnnouncement_model.js");
const removeAnnouncement = require("../models/announcement/removeAnnouncement_model.js");
const viewAnnouncement = require("../models/announcement/viewAnnouncements_model.js");
const updateAnnouncement = require("../models/announcement/updateAnnouncement_model.js");

const viewApplication = require("../models/application/viewApplication_model.js");
const updateApplication = require("../models/application/updateApplication_model.js");

const addDormitory = require("../models/dormitory/addDormitory_model.js");
const addRoom = require("../models/dormitory/addRoom_model.js");
const addFacility = require("../models/dormitory/addFacility_model.js");
const deleteDormitory = require("../models/dormitory/removeDormitory_model.js");
const deleteRoom = require("../models/dormitory/removeRoom_model.js");
const deleteFacility = require("../models/dormitory/removeFacility_model.js");
const viewDormitory = require("../models/dormitory/viewDormitory_model.js");
const viewRoom = require("../models/dormitory/viewRoom_model.js");
const viewFacility = require("../models/dormitory/viewFacility_model.js");
const updateDormitory = require("../models/dormitory/updateDormitory_model.js");
const updateRoom = require("../models/dormitory/updateRoom_model.js");
const updateFacility = require("../models/dormitory/updateFacility_model.js");

const addBoarder = require("../models/boarder/addBoarder_model.js");
const removeBoarder = require("../models/boarder/removeBoarder_model.js");
const viewBoarder = require("../models/boarder/viewBoarder_model.js");
const updateBoarder = require("../models/boarder/updateBoarder_model.js");

const updateRepariForm = require("../models/repairForm/updateRepariForm.js");
const viewAllRepairForm = require("../models/repairForm/viewAllRepairForm.js");
const exp = require("constants");
const payment_notice_email = require("../models/payment_notice_email.js");

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
            // res.json({
            //     result: result
            // })
            res.redirect('/ADMIN/announcement');
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
        res.render('admin_announce', {data: rows});
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

exports.getApplicationIndex = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        res.render('admin_apply');
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

exports.getApplicationByAdmin = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        viewApplication(req.params.AType).then((rows) => {
            // res.json({
            //     rows: rows
            // })
            if (req.params.AType === "申請住宿") {
                res.render('admin_apply_in', {data: rows});
            } else if (req.params.AType === "申請換宿") {
                res.render('admin_apply_exc', {data: rows});
            } else if (req.params.AType === "申請退宿") {
                res.render('admin_apply_out', {data: rows});
            } else {
                res.render('admin_apply', {data: rows});
            }
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

exports.putApplication = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let application = {
            Approved: req.body.Approved,
            StuID: req.body.StuID,
            ApplyNumber: req.body.ApplyNumber,
            DName: req.body.DName,
            Paid: req.body.Paid,
            ARoomNumber: req.body.ARoomNumber
        }
        updateApplication(application).then((result) => {
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

exports.postPaymentNotice = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let StuID = req.body.UID;

        payment_notice_email(StuID, data.UType).then((result) => {
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

exports.postDormitory = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let dormitory = {
            DName: req.body.DName,
            Fee: req.body.Fee,
            DCapacity: req.body.DCapacity
        }
        addDormitory(dormitory).then((result) => {
            res.redirect('/admin/dormitory');
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

exports.postRoom = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let room = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            RCapacity: req.body.RCapacity
        }
        addRoom(room).then((result) => {
            res.redirect('/admin/dormitory/room?DName=' + req.body.DName);
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

exports.postFacility = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let facility = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            FName: req.body.FName,
            FQuantity: req.body.FQuantity
        }
        addFacility(facility).then((result) => {
            res.redirect('/admin/dormitory/room/facility' + '?DName=' + req.body.DName + '&RoomNumber=' + req.body.RoomNumber);
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

exports.deleteDormitory = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let dormitory = {
            DName: req.body.DName
        }
        deleteDormitory(dormitory).then((result) => {
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

exports.deleteRoom = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let room = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber
        }
        deleteRoom(room).then((result) => {
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

exports.deleteFacility = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let facility = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            FName: req.body.FName
        }
        deleteFacility(facility).then((result) => {
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
            res.render('admin_dormitory', {data: rows});
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

exports.getRoom = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let room = {
            DName: req.query.DName,
        }
        viewRoom(room).then((rows) => {
            console.log(rows);
            res.render('admin_dormitory_room', {data: rows});
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

exports.getFacility = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let facility = {
            DName: req.query.DName,
            RoomNumber: req.query.RoomNumber
        }
        viewFacility(facility).then((rows) => {
            res.render('admin_dormitory_room_facility', {data: rows});
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

exports.putDormitory = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let dormitory = {
            DName: req.body.DName,
            newDName: req.body.newDName,
            Fee: req.body.Fee,
            DCapacity: req.body.DCapacity
        }
        updateDormitory(dormitory).then((result) => {
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

exports.putRoom = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let room = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            newRoomNumber: req.body.newRoomNumber,
            RCapacity: req.body.RCapacity
        }
        updateRoom(room).then((result) => {
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

exports.putFacility = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let facility = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            FName: req.body.FName,
            newFName: req.body.newFName,
            FQuantity: req.body.FQuantity
        }
        updateFacility(facility).then((result) => {
            // res.json({
            //     result: result
            // })
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

exports.postBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            StuID: req.body.StuID,
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber
        }
        addBoarder(boarder).then((result) => {
            // res.json({
            //     result: result
            // })
            res.redirect('/admin/boarder');
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

exports.deleteBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            StuID: req.body.StuID
        }
        removeBoarder(boarder).then((result) => {
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

exports.getBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        viewBoarder().then((rows) => {
            res.render('admin_boarder', {data: rows});
            // res.json({
            //     rows: rows
            // })
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

exports.putBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            DName: req.body.DName,
            ARoomNumber: req.body.RoomNumber,
            StuID: req.body.StuID
        }
        updateBoarder(boarder).then((result) => {
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

exports.patchRepairForm = function(req, res, next){
    let token = req.cookies.token;

    verify(token).then((data) => {
        let identity = data;
        let newRepairForm = req.body;

        updateRepariForm(identity, newRepairForm).then((result) => {
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
            res.render('admin_repair', {data: rows, UID: UID});

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