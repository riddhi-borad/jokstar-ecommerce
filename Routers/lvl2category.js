const express = require("express");
const router = express.Router();
const lvl2Category=require("./../models/lvl2categories");
router.post('/saveLvl2Category',(req,res)=>{
    let addlvl2Category={
    lvl2catId:Date.now()+Math.random()*99999,
    name:req.body.name,
    categoryId:req.body.categoryId,
    visibility:true
}
new lvl2Category(addlvl2Category).save()
    .then(()=>{
        res.status(200).json({msg:"lvl2Category inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;