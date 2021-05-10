const express = require("express");
const router = express.Router();
const Master=require("./../models/master");
router.post('/admin',(req,res)=>{
    
    let addmaster={
        id:Math.random(),
        usertype:req.body.usertype,
        accessCusSer:req.body.accessCusSer,
        accessorder:req.body.accessorder,
        paymentsetting:req.body.paymentsetting,
        createdDt:Date(),
        modifiedDt:Date()
}
new Master(addmaster).save()
    .then(()=>{
        res.status(200).json({msg:"data inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;