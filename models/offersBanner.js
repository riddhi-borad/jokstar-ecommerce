const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   visibility:{
        type:Boolean,
        required:true
    },
    
   
});
module.exports=OfferBanner=mongoose.model('offerbanners',newschema)