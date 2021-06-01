const express = require("express");
const router = express.Router();
const lvl3Category=require("./../models/lvl3categories");
router.post('/saveLvl3Category',async (req,res)=>{
  // for(var i=0;i<req.body.subsubcat.length;i++){
    await lvl3Category.findOne({name:req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),categoryId:req.body.categoryId,lvl2catId:req.body.lvl2catId})
    .then((response)=>{
      if(response){
        {res.status("400").json({ msg:"SubSubCategory already exists!! "})}
      }
      else{
        let addlvl3Category={
          name:req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
          categoryId:req.body.categoryId,
          lvl2catId:req.body.lvl2catId,
          visibility:true,
          createdDt:Date(),
          updatedDt:Date()
      }
      new lvl3Category(addlvl3Category).save()
          .then(()=>{
              
          }).catch((err)=>{
              console.log(err);
          })
          res.status(200).json({msg:"lvl3Category inserted !"});
      }
    }).catch((err)=>{
      console.log(err)
    })
    
  // }
})

router.get('/viewLvl3Category',(req,res)=>{
    lvl3Category.find({})
    .populate("categoryId",{name:1})
    .populate("lvl2catId",{name:1})
    // .populate("lvl3catId",{name:1})
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
  })

  router.get("/editLvl3Category/:id", (req, res) => {
    lvl3Category.findOne({ _id: req.params.id })
    .populate("categoryId",{name:1})
    .populate("lvl2catId",{name:1})
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.post("/updateLvl3Category",(req, res) => {
    lvl3Category.findOne({_id: req.body.id})
      .then((data) => {
        data.categoryId=req.body.categoryId;
        data.lvl2catId=req.body.lvl2catId;
        data.name= req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        data.visibility=req.body.visibility;
        data.updatedDt=Date();
        data.save()
          .then((result) => {
            res.status("200").json({ msg: "Data Updated Successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
        
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get('/deleteLvl3Category/:id',(req,res)=>{
    lvl3Category.findOne({_id:req.params.id})
    .then((data)=>{
      if(data.visibility==true){
          data.visibility=false;
      }else{
          data.visibility=true;
      }
      data.updatedDt=Date()
      data.save()
        .then(response=>{ res.status("200").json({msg:"Change visibility Successfully!"}) })
        .catch(err=>{ console.log(err) })
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  router.get("/L2catWiseL3cat/:id", (req, res) => {
    lvl3Category.find({ lvl2catId: req.params.id })
    .populate("categoryId",{name:1})
    .populate("lvl2catId",{name:1})
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });
module.exports = router;