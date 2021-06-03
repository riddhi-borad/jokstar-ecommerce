const express = require("express");
const router = express.Router();
const Order=require("./../models/order");
const Product=require("./../models/product");
const Cart=require("./../models/cart");
router.post('/placeOrder',(req,res)=>{
    var orderId=Date.now()+Math.floor(Math.random()*99999)
 Cart.find({userId:req.body.userId})
    .populate("productId")
    .then((resp)=>{
        for(var i in resp){
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
                amount:Number(resp[i].productId.price)*Number(resp[i].quantity),
                discount:req.body.discount,
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