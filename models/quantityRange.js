const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new mongoose.Schema({
    prodId:{
        type:Schema.Types.ObjectId,
        ref:"products",
    },
    quantity:{
        type:String,
        required:true,
    },
    // price:{
    //     type:Number,
    //     trim:true,
    //     required:true
    // },
    discount:{
        type:Number,
        trim:true,
    },
    discountType:{
        type:String,
        trim:true,
    },
    discountedPrice:{
        type:Number,
        trim:true,
    },
    // saved:{
    //     type:Number,
    //     trim:true
    // }
})
module.exports=Quantity=mongoose.model('Quantities',newschema)