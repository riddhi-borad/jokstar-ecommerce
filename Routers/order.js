const express = require("express");
const router = express.Router();
const Order=require("./../models/order");
const Product=require("./../models/product");
const Cart=require("./../models/cart");
router.post('/placeOrder',(req,res)=>{
    var orderId=Date.now()+Math.floor(Math.random()*99999)
 Cart.find({userId:req.body.userId})
    .populate("productId")
    .then(async(resp)=>{
        for(var i in resp){
            var discountedPrice,discount,discountType;
            if(resp[i].quantity>=1 && resp[i].quantity<=2){
            await    Quantity.findOne({prodId:resp[i].productId._id,quantity:"1-2"})
                .then((qunRange)=>{
                    discountedPrice=qunRange.discountedPrice;
                 discount=qunRange.discount
                 discountType=qunRange.discountType
                }).catch((err)=>{
                  console.log(err)
                })
               }
               else  if(resp[i].quantity>=3 && resp[i].quantity<=12){
                await    Quantity.findOne({prodId:resp[i].productId._id,quantity:"3-12"})
                .then((qunRange)=>{
                    discountedPrice=qunRange.discountedPrice;
                 discount=qunRange.discount
                 discountType=qunRange.discountType
                }).catch((err)=>{
                  console.log(err)
                })
               }
               else if(resp[i].quantity>=13){
                await    Quantity.findOne({prodId:resp[i].productId._id,quantity:"13+"})
                .then((qunRange)=>{
                 discountedPrice=qunRange.discountedPrice; 
                 discount=qunRange.discount
                 discountType=qunRange.discountType
                }).catch((err)=>{
                  console.log(err)
                })
               } 
            
            // if(resp[i].productId.discountPrice){
            //     price=resp[i].productId.discountPrice
            // }
            // else
            // {
            //     price=resp[i].productId.price
            // }
            let addorder={
                orderId:orderId,
                userId:resp[i].userId,
                jbpId:resp[i].productId.jbpId,
                ProductId:resp[i].productId._id,
                prodNm:resp[i].productId.name,
                prodPrice:resp[i].productId.price,
                prodimage:resp[i].productId.images[0],
                prodDesc:resp[i].productId.description,
                address:req.body.address,
                email:req.body.email,
                mobile:req.body.mobile,
                status:"Ordered",
                paymentMode:"Cash On Delivery",
                amount:Number(discountedPrice)*Number(resp[i].quantity),
                discountedPrice:discountedPrice,
                discount:discount,
                discountType:discountType,
                quantity:resp[i].quantity,
                returnStatus:req.body.returnStatus,
                refundStatus:req.body.refundStatus,
                createdDt:Date()
            }
            new Order(addorder).save()
                .then(()=>{ 
                    Cart.deleteMany({ userId: req.body.userId })
                    .then(() => {
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }).catch((err)=>{console.log(err);})
        }
        res.status(200).json({msg:"Ordered succesfully !"});
    })
    .catch((err)=>{
        console.log(err)
    })
})
router.get("/shopkeeperorder/:id", (req, res) => {
    Order.find({jbpId: req.params.id })
    .populate('userId', {fullName:1})
    .populate("user",{_id:1,fullName:1})
    .then((result) => {
      res.status("200").json({result});
    })
    .catch((err) => {
      console.log(err);
    });
})
module.exports = router;