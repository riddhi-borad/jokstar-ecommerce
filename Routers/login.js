const express = require("express");
const router = express.Router();
const User = require("../models/registration");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
router.post("/login", (req, res) => {
    bcrypt.hash(req.body.password, "$2a$10$9qeA/55oughPL85/246siu", function (err, hash) {
    User.findOne({ mail: req.body.email, password: hash})
      .then((response) => {
        if (!response) {
          res
            .status("400")
            .json({ msg: "incorrect email or password!" });
        } 
        else
        { const payload = {
                name: response.name,
                mail: response.mail,
                userType: response.userType,
                id: response._id,
                jbpId:response.jbpId
          };
            jwt.sign(payload, (privateKey = "user"), (err, usertoken) => {
                res.json({
                success: true,
                tokan: "Bearer " + usertoken,
                });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
});

router.post("/UserCheck", (req, res) => {
  User.findOne({ mobile: req.body.mobile})
    .then((result) => {
      if(result == null){
        let user = {
          jbpId:req.body.jbpId,
          mobile:req.body.mobile,
          isActive:true,
          createdDt:Date(),
          updatedDt:Date()
        }
        new User(user)
        .save()
            .then((response) => {
              res.status("200").json({userId: response._id });
            })
            .catch((err) => {
              console.log(err);
            });
      }else{
      res.status("200").json({userId: result._id });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;