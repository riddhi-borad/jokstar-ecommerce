const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema={
    orderId:{
        type:String,
        trim:true,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
    ProductId:{
        type:Schema.Types.ObjectId,
        ref:"products",
    },
    // prodNm:{
    //     type:String,
    //     trim:true,
    //     // required:true
    // },
    // prodPrice:{
    //     type:Number,
    //     trim:true,
    //     required:true,
    // },
    // prodimage:{
    //     type:String,
    //     trim:true,
    //     required:true,
    // },
    // prodDesc:{
    //     type:String,
    //     trim:true,
    //     required:true,
    // },
    address:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    mobile:{
        type:Number,
        trim:true,
        required:true,
    },
    status:{
        type:String,
        trim:true,
        required:true,
    },
    paymentMode:{
        type:String,
        trim:true,
        required:true,
    },
    amount:{
        type:Number,
        trim:true,
        required:true,
    },
    quantity:{
        type:Number,
        trim:true,
        required:true,
    },
    discount:{
        type:Number,
        trim:true,
        required:true,
    },
    returnStatus:{
        type:String,
        trim:true,    
    },
    refundStatus:{
        type:String,
        trim:true
    }
}
module.exports=Order=mongoose.model('orders',newschema)