const express = require("express");
const router = express.Router();
const OfferBanner=require("./../models/offersBanner");
const upload=require('./../config/multer')
router.post('/saveOffersBanner',upload.single("image"),(req,res)=>{
    let offerBanner={
    name:req.body.name,
    image:req.file.filename,
    visibility:true
}
new OfferBanner(offerBanner).save()
    .then(()=>{
        res.status(200).json({msg:"Image inserted successfully !"});
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/viewOffersBanner',(req,res)=>{
    OfferBanner.find({})
    .then((result)=>{
        // console.log(res)
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports = router;