const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new mongoose.Schema({
    lvl2catId:{
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
   visibility:{
        type:Boolean,
        required:true
    },
});
module.exports=lvl2Category=mongoose.model('lvl2categories',newschema)