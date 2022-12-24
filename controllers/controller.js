const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");

/**
 *  receive post method to regist
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

exports.postLogin = function(req, res) {
    studentData = {
        SAccount: "%%%",
        SPassword: "%%%"
    };
    login(studentData).then((result) => {
        res.json({
            result: result
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })
}

ex