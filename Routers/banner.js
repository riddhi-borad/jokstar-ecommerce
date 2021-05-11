const express = require("express");
const router = express.Router();
const Banner=require("./../models/banner");
const upload=require('./../config/multer')
router.post('/saveBanner',upload.single("image"),(req,res)=>{
    let addBanner={
    name:req.body.name,
    image:req.file.filename,
    visibility:true
}
new Banner(addBanner).save()
    .then(()=>{
        res.status(200).json({msg:"Banner image inserted successfully !"});
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/viewBanner',(req,res)=>{
    Banner.find({})
    .then((result)=>{
        console.log(res)
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports = router;