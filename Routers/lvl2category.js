const express = require("express");
const router = express.Router();
const lvl2Category=require("./../models/lvl2categories");
router.post('/saveLvl2Category',(req,res)=>{
    let addlvl2Category={
    name:req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
    categoryId:req.body.categoryId,
    visibility:true,
    createdDt:Date(),
    updatedDt:Date()
}
new lvl2Category(addlvl2Category).save()
    .then(()=>{
        res.status(200).json({msg:"lvl2Category inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})
router.get('/viewLvl2Category',(req,res)=>{
    lvl2Category.find({})
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
  })

router.get("/editLvl2Category/:id", (req, res) => {
    lvl2Category.findOne({ _id: req.params.id })
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });
  router.post("/updateLvl2Category",(req, res) => {
    lvl2Category.findOne({_id: req.body.id})
      .then((data) => {
        data.categoryId=req.body.categoryId
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
  
  router.get('/deleteLvl2Category/:id',(req,res)=>{
    lvl2Category.findOne({_id:req.params.id})
    .then((data)=>{
      if(data.visibility==true){
          data.visibility=false;
      }else{
          data.visibility=true;
      }
      data.updatedDt=Date()
      data.save()
        .then(response=>{ res.status("200").json({msg:true}) })
        .catch(err=>{ console.log(err) })
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  router.get("/catwiselvl2cat/:id", (req, res) => {
    lvl2Category.find({ categoryId: req.params.id })
    .populate("categoryId",{name:1})
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });
module.exports = router;