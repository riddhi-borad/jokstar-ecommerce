const express = require("express");
const router = express.Router();
const State=require("./../models/state");
router.post('/saveState',(req,res)=>{
    let addState={
    name:req.body.name,
}
new State(addState).save()
    .then(()=>{
        res.status(200).json({msg:"State inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/viewState',(req,res)=>{
    State.find({})
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router;