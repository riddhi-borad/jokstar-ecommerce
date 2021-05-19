const express = require("express");
const router = express.Router();
const User = require("../models/registration");
const bcrypt = require("bcryptjs");
const upload=require('./../config/multer')
router.post("/register", (req, res) => {
  var flagname,flagemail,flagpass,flagspace,flagpin,flagcountry,aldreg,flagstate,flagcity,errmsg="";
  if(req.body.fullName.trim()==""){
    flagname=false;
    errmsg="Please enter fullname. ";
  }else if(!req.body.fullName.match(/^[a-zA-Z ]*$/)){
    flagname=false;
    errmsg="Please enter alphabates only, in Name. ";
  }

  if(req.body.mail.trim()==""){
    flagname=false;
    errmsg+="Please enter email. ";
  }else if(!req.body.mail.match(/^.+@[^\.].*\.[a-z]{2,}$/)){
  flagemail=false;
    errmsg+="Please enter valid email. ";
  }

  if(req.body.password.trim()==""){
    flagname=false;
    errmsg+="Please enter password. ";
  }else if(!req.body.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{4,15}$/)){
    flagpass=false;
    errmsg+="Password must be 4-15 char, at least one upper case, one lower case, one numeric and one special character from `@ # $ % ^ & *`. ";
  }
  if(req.body.password.indexOf(" ") > 0){
    flagspace=false;
    errmsg+="Space is not allowed in password. "
  }

  if(req.body.pincode.trim()==""){
    flagname=false;
    errmsg+="Please enter pincode. ";
  }else if(!req.body.pincode.match(/^[0-9]{6}$/)){
    flagpin=false;
    errmsg+="Please enter 6 digit valid pincode. ";
  }

  if(req.body.country==""){
    flagcountry=false;
    errmsg+="Please select country. "
  }

  if(req.body.state==""){
    flagstate=false;
    errmsg+="Please select state. "
  }

  if(req.body.city==""){
    flagcity=false;
    errmsg+="Please select city. "
  }
 
  if(flagname==false || flagemail==false || flagpass==false ||  flagspace==false || flagpin==false || flagcountry==false || flagstate==false || flagcity==false || aldreg==false){
    var msg=errmsg;
    errmsg="";
    res.status("400").json({ msg: msg });
  }else
  {
    User.findOne({$or: [{ mail: req.body.mail }, { mobile: req.body.mobile }] })
  .then((response)=>{
    if(response)
    res.status("400").json({ msg:"Email or Mobile already exists "})
    else{
      let user = {
        jbpId:req.body.jbpId,
        fullName: req.body.fullName,
        mail: req.body.mail,
        password: req.body.password,
        mobile:req.body.mobile,
        userType:req.body.userType,
        address:req.body.address,
        pincode:req.body.pincode,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        isActive:true,
        createdDt:Date(),
        updatedDt:Date()
      };
      bcrypt.hash(req.body.password, "$2a$10$9qeA/55oughPL85/246siu", function (err, hash) {
          user.password = hash;
          new User(user)
            .save()
            .then(() => {
              res.status("200").json({ msg: "Data Inserted Successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
      });
    }
  })
  .then((err)=>{
    console.log(err)
  })
    
  }
});

router.get('/viewuser',(req,res)=>{
  User.find({})
  .then((result)=>{
      res.status(200).json({result})
  })
  .catch((err)=>{
      console.log(err)
  })
})

router.get("/editUser/:id", (req, res) => {
  User.findOne({ _id: req.params.id },{mail:0,password:0,mobile:0,isActive:0})
    .then((result) => {
      res.status("200").json({result});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateUser", upload.single("image"),(req, res) => {
  // console.log(req)
  User.findOne({_id: req.body.id})
    .then((data) => {
      // console.log(data)
      var flagname,flagpin,flagcountry,flagstate,flagcity,errmsg="";
  
  if(req.body.fullName.trim()==""){
    flagname=false;
    errmsg="Please enter fullname. ";
  }else if(!req.body.fullName.match(/^[a-zA-Z ]*$/)){
    flagname=false;
    errmsg="Please enter alphabates only, in Name. ";
  }
  
  if(req.body.pincode.trim()==""){
    flagname=false;
    errmsg="Please enter pincode. ";
  }else if(!req.body.pincode.match(/^[0-9]{6}$/)){
    flagpin=false;
    errmsg+="Please enter 6 digit valid pincode. ";
  }

  if(req.body.country==""){
    flagcountry=false;
    errmsg+="Please select country. "
  }
  if(req.body.state==""){
    flagstate=false;
    errmsg+="Please select state. "
  }
  if(req.body.city==""){
    flagcity=false;
    errmsg+="Please select city. "
  }
  if(flagname==false || flagpin==false || flagcountry==false || flagstate==false || flagcity==false){
    var msg=errmsg;
    errmsg="";
    res.status("400").json({ msg: msg });}
    else{
      data.fullName= req.body.fullName;
      // data.mobile=req.body.mobile;
      data.Image=req.file.filename;
      data.address=req.body.address;
      data.pincode=req.body.pincode;
      data.country=req.body.country;
      data.state=req.body.state;
      data.city=req.body.city;
      data.updatedDt=Date()
      data.save()
        .then((result) => {
          res.status("200").json({ msg: "Data Updated Successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/deleteUser/:id',(req,res)=>{
  User.findOne({_id:req.params.id})
  .then((data)=>{
    if(data.isActive==true){
        data.isActive=false;
    }else{
        data.isActive=true;
    }
    data.save()
      .then(response=>{ res.status("200").json({msg:true}) })
      .catch(err=>{ console.log(err) })
  })
  .catch((err)=>{
    console.log(err);
  })
})
module.exports = router;