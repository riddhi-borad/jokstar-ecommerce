const express = require("express");
const router = express.Router();
const lvl3Category=require("./../models/lvl3categories");
router.post('/saveLvl3Category',(req,res)=>{
    let addlvl3Category={
    lvl3catId:Date.now()+Math.random()*99999,
    name:req.body.name,
    categoryId:req.body.categoryId,
    lvl2catId:req.body.lvl2catId,
    visibility:true
}
new lvl3Category(addlvl3Category).save()
    .then(()=>{
        res.status(200).json({msg:"lvl3Category inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;