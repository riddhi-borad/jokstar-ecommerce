const express = require("express");
const router = express.Router();
const Category=require("./../models/categories");
const upload=require('./../config/multer')
router.post('/saveCategory',upload.single("image"),(req,res)=>{
    let addCategory={
    categoryId:Date.now()+Math.random()*99999,
    name:req.body.name,
    image:req.file.filename,
    visibility:true
}
new Category(addCategory).save()
    .then(()=>{
        res.status(200).json({msg:"category inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;