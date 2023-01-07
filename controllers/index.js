const regist = require("../models/register_model.js");
const login = require("../models/login_model.js");
const verify = require("../models/verification.js");

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
        res.redirect(`${rows.UType}?UName=${rows.UName}`);
        // res.render(`${rows.UType}`, {result: rows});
    }).catch((err) => {
        res.render('login', {err: err});
    })
}