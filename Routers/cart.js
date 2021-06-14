const { request } = require("express");
const express = require("express");
const router = express.Router();
const Quantity=require('./../models/quantityRange');
const Cart=require("./../models/cart");
const Product=require("./../models/product");
const Wish=require("./../models/wish");
function addcart (req,res){
  Cart.findOne({ userId: req.body.userId, productId: req.body.productId }).then(
    (data) => {
      if (data == null) {
        let addcart = {
          productId: req.body.productId,
          userId: req.body.userId,
          quantity: req.body.quantity || 1,
        };
        Product.findOne({_id:req.body.productId})
              .then((resp)=>{
                  if(resp.availableStock < req.body.quantity){
                      res.status("400").json({msg:"Out of Stock"})
                  }
                  else{
                      new Cart(addcart)
                      .save()
                      .then(() => {
                          res.status("200").json({ msg: "Successfully added in cart!"}) 
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                      }
                  })
              .catch((err)=>{
                  console.log(err)
              })
      } else {
        Product.findOne({_id:req.body.productId})
          .then((resp)=>{
            if(resp.availableStock < Number(data.quantity) + Number(req.body.quantity)){
                res.status("400").json({msg:"Out of Stock"})
            }
            else{
              data.quantity = Number(data.quantity) + Number(req.body.quantity);
              data
              .save()
              .then(() => {res.status("200").json({ msg: "Successfully added in cart!" });})
              .catch((err) => {console.log(err);});
              }
          }).catch((err)=>{
            console.log(err)
          })
      }
    }
  );
}
router.post("/addCart", (req, res) => {
  addcart(req,res)
});

router.post("/updateCart", (req, res) => {
  Cart.findOne({
    _id: req.body.id,
    userId: req.body.userId,
    productId: req.body.productId,
  })
    .then((data) => {
      Product.findOne({_id:req.body.productId})
      .then((resp)=>{
          if(resp.availableStock < req.body.quantity){
              res.status("400").json({msg:"Out of Stock"})
          }
          else{
              data.quantity = req.body.quantity;
              data
              .save()
              .then((result) => {
                  res.status("200").json({result});
              })
              .catch((err) => {
                  console.log(err);
              });
          }
      })
      .catch((err)=>{console.log(err)})
      
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/viewCart/:id", function (req, res) {
  Cart.find({ userId: req.params.id })
  .populate("productId")
    .then(async(result) => {
      var price=[],total=[],a=0;
      for(var i in result){
        if(result[i].quantity>=1 && result[i].quantity<=2){
     await   Quantity.findOne({prodId:result[i].productId._id,quantity:"1-2"})
         .then((qunRange)=>{
          price.push(Number(qunRange.discountedPrice)*Number(result[i].quantity))
         }).catch((err)=>{
           console.log(err)
         })
        }
         else  if(result[i].quantity>=3 && result[i].quantity<=12){
          await    Quantity.findOne({prodId:result[i].productId._id,quantity:"3-12"})
          .then((qunRange)=>{
           price.push(Number(qunRange.discountedPrice)*Number(result[i].quantity))
          }).catch((err)=>{
            console.log(err)
          })
         }
          else if(result[i].quantity>=13){
            await   Quantity.findOne({prodId:result[i].productId._id,quantity:"13+"})
          .then((qunRange)=>{
           price.push(Number(qunRange.discountedPrice)*Number(result[i].quantity))
          }).catch((err)=>{
            console.log(err)
          })
         } 
      }
      for(var j in price)
      {
          a += Number(price[j]) 
      }
      total.push(a)
      var obj={
          cartdetail:result,
          price:price,
          total:total
      }
      res.status("200").json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
});
  
router.post("/deleteCart", function (req, res) {
  Cart.deleteOne({userId: req.body.userId,productId:request.body.productId })
  .then(()=>{
    res.status("200").json({msg:"remove cart item Successfully"})
  })
  .catch((err)=>{
    console.log(err)
  })
})


router.post("/wishToCart", async(req,res)=>{
   addcart(req,res)
   await Wish.deleteOne({userId:req.body.userId,productId:req.body.productId})
   .then(()=>{})
   .catch((err)=>{
     console.log(err)
   })
})
module.exports = router;
   