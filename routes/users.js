var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/signup", (req, res, next) = {

});

router.post("/login", (req, res, next) => {
    User.find({email: req.body.email})
        .then(results => {
            if(results.length === 0) {
                return res.status(401).json({
                    message: "Authorization failed"
                });
            } 
            
            bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Authorization failed"
                    });
                }

                if(result) {
                    jwt.sign({
                        email: results[0].email;
                        userid: results[0].Id
                    })
                    return res.status(200).json({
                        message: "Auth successful"
                    });
                }

                res.status(401).json({
                    message: "Auth failed"
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;