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
                id: response._id,
                jbpId:response.jbpId,
                name: response.fullName,
                mail: response.mail,
                mobile:response.mobile,
                userType: response.userType,
                address:response.address,
                pincode:response.pincode,
                country:response.country,
                state:response.state,
                city:response.city,
                isActive:response.isActive
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
          // jbpId:req.body.jbpId,
          mobile:req.body.mobile,
          userType:"tempCustomer",
          isActive:true,
          createdDt:Date(),
          updatedDt:Date()
        }
        new User(user)
        .save()
            .then((response) => {
              const payload = {
                id: response._id,
                mobile:response.mobile,
                userType: response.userType,
                isActive:response.isActive
              };
              jwt.sign(payload, (privateKey = "user"), (err, usertoken) => {
                res.json({
                success: true,
                tokan: "Bearer " + usertoken,
                });
              })
            })
            .catch((err) => {
              console.log(err);
            });
    }else{
        const payload = {
          id: result._id,
          jbpId:result.jbpId,
          name: result.fullName,
          mail: result.mail,
          mobile:result.mobile,
          userType: result.userType,
          address:result.address,
          pincode:result.pincode,
          country:result.country,
          state:result.state,
          city:result.city,
          isActive:result.isActive
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
module.exports = router;