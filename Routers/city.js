const express = require("express");
const router = express.Router();
const City=require("./../models/city");
router.post('/saveCity',(req,res)=>{
    let addCity={
    name:req.body.name,
    stateId:req.body.stateId
}
new City(addCity).save()
    .then(()=>{
        res.status(200).json({msg:"City inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/viewCity',(req,res)=>{
   City.find({})
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router;