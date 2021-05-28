const express = require("express");
const router = express.Router();
const Wish=require("./../models/wish");

router.post("/addWishList", (req, res) => {
    let addWish = {
        productId: req.body.productId,
        userId: req.body.userId,
      };
    new Wish(addWish)
        .save()
        .then(() => {
            res.status("200").json({ msg: "Successfully added in wishList!"}) 
        })
        .catch((err) => {
            console.log(err);
        });   
  });

 router.get("/viewWishList/:id", (req, res) => {
    Wish.find({userId:req.params.id})
    .populate("productId")
    .then((result)=>{
        res.status("200").json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
 })
  
 router.post("/deleteWishItem", function (req, res) {
    Wish.deleteOne({userId: req.body.userId,productId:request.body.productId })
    .then(()=>{
      res.status("200").json({msg:"Remove wishlist item Successfully"})
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  module.exports = router;