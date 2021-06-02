const express = require("express");
const router = express.Router();
const Category=require("./../models/categories");
const upload=require('./../config/multer')
router.post('/saveCategory',upload.single("image"),async (req,res)=>{
  // console.log(req)
   await Category.findOne({name:req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())})
  .then((response)=>{
    if(response)
    {res.status(400).json({msg:"Category already exists!! "})}
    else{
      let addCategory={
        name:req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
        Image:req.file.filename,
        visibility:true,
        createdDt:Date(),
        updatedDt:Date()
      }
      new Category(addCategory).save()
      .then(()=>{
          res.status(200).json({msg:"category inserted !"});
      }).catch((err)=>{
          console.log(err);
      })
    }
  })
})

router.get('/viewCategory',(req,res)=>{
    Category.find({})
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
  })

  router.get("/editCategory/:id", (req, res) => {
    Category.findOne({ _id: req.params.id })
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.post("/updateCategory",  upload.single("image"),(req, res) => {
    if(req.file){
      img=req.file.filename
  }else{
      img=req.body.image
  }
   Category.findOne({_id: req.body.id})
      .then((data) => {
        data.name= req.body.name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        data.Image=img;
        data.visibility=req.body.visibility;
        data.updatedDt=Date();
        data.save()
          .then((result) => {
            res.status(200).json({ msg: "Data Updated Successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
        
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get('/deleteCategory/:id',(req,res)=>{
    Category.findOne({_id:req.params.id})
    .then((data)=>{
      if(data.visibility==true){
          data.visibility=false;
      }else{
          data.visibility=true;
      }
      data.updatedDt=Date()
      data.save()
        .then(response=>{ res.status("200").json({msg:"true"}) })
        .catch(err=>{ console.log(err) })
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  
module.exports = router;