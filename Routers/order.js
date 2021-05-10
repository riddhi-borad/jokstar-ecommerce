const express = require("express");
const router = express.Router();
const Order=require("./../models/order");
const Product=require("./../models/product");
router.post('/addorder',(req,res)=>{
    // Product.findOne({})
    let addorder={
    orderId:Date.now()+Math.random()*99999,
    userId:req.body.userId,
    ProductId:req.body.ProductId,
    prodNm:req.body.prodNm,
    prodPrice:req.body.prodPrice,
    prodimage:req.body.prodimage,
    prodDesc:req.body.prodDesc,
    address:req.body.address,
    email:req.body.email,
    mobile:req.body.mobile,
    status:req.body.status,
    paymentMode:req.body.paymentMode,
    amount:req.body.amount,
    discount:req.body.discount,
    quantity:req.body.quantity,
    returnStatus:req.body.returnStatus,
    refundStatus:req.body.refundStatus
}
new Order(addorder).save()
    .then(()=>{
        res.status(200).json({msg:"Ordered succesfully !"});
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;