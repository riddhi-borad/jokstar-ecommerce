const mongoose=require('mongoose');
const Schema=mongoose.Schema
var ObjectId=Schema.ObjectId;
var newschema=new mongoose.Schema({
    categoryId:{
        type:String,
        trim:true,
        required:true,

    },
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
module.exports=category=mongoose.model('categories',newschema)