const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new mongoose.Schema({
    lvl3catId:{
        type:String,
        trim:true,
        required:true,
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories",
    },
    lvl2catId:{
        type:Schema.Types.ObjectId,
        ref:"lvl2categories",
    },
   visibility:{
        type:Boolean,
        required:true
    },
});
module.exports=lvl3Category=mongoose.model('lvl3categories',newschema)