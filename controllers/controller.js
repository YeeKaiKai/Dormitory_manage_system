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

const makeApplication = require("../models/application/makeApplication_model.js");
const inquiryApplication = require("../models/application/inquireApplication_model.js");
const viewApplication = require("../models/application/viewApplication_model.js");
const updateApplication = require("../models/application/updateApplication_model.js");

const addDormitory = require("../models/dormitory/addDormitory_model.js");
const addRoom = require("../models/dormitory/addRoom_model.js");
const addFacility = require("../models/dormitory/addFacility_model.js");
const deleteDormitory = require("../models/dormitory/removeDormitory_model.js");
const deleteRoom = require("../models/dormitory/removeRoom_model.js");
const deleteFacility = require("../models/dormitory/removeFacility_model.js");
const viewDormitory = require("../models/dormitory/viewDormitory_model.js");
const updateDormitory = require("../models/dormitory/updateDormitory_model.js");
const updateRoom = require("../models/dormitory/updateRoom_model.js");
const updateFacility = require("../models/dormitory/updateFacility_model.js");

const addBoarder = require("../models/boarder/addBoarder_model.js");
const removeBoarder = require("../models/boarder/removeBoarder_model.js");
const viewBoarder = require("../models/boarder/viewBoarder_model.js");
const updateBoarder = require("../models/boarder/updateBoarder_model.js");

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

exports.getApplicationByAdmin = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        viewApplication().then((rows) => {
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

exports.putApplication = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let application = {
            Approved: req.body.Approved,
            StuID: req.body.StuID,
            ApplyNumber: req.body.ApplyNumber
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

exports.postDormitory = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let dormitory = {
            DName: req.body.DName,
            Fee: req.body.Fee,
            DCapacity: req.body.DCapacity
        }
        addDormitory(dormitory).then((result) => {
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

exports.postRoom = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let room = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            RCapacity: req.body.RCapacity
        }
        addRoom(room).then((result) => {
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

exports.postBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            StuID: req.body.StuID,
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber
        }
        addBoarder(boarder).then((result) => {
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

exports.putBoarder = function(req, res, next) {
    let token = req.cookies.token;
    verify(token).then((data) => {
        let boarder = {
            DName: req.body.DName,
            RoomNumber: req.body.RoomNumber,
            StuID: req.body.StuID
        }
        updateBoarder(boarder).then((rows) => {
            res.json({
                rows: rows
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