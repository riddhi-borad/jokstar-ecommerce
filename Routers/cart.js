const express = require("express");
const router = express.Router();
const Cart=require("./../models/cart");
const Product=require("./../models/product");
router.post("/addCart", (req, res) => {
    Cart.findOne({ userId: req.body.userId, productId: req.body.productId }).then(
      (data) => {
        if (data == null) {
          let addcart = {
            productId: req.body.productId,
            userId: req.body.userId,
            quantity: req.body.quantity,
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
      .then((result) => {
        var price=[],total=[],a=0;
        for(var i in result){
            price.push(Number(result[i].productId.price)*Number(result[i].quantity))
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
  
  module.exports = router;