const mongoose=require('mongoose');
const Schema=mongoose.Schema
var ObjectId=Schema.ObjectId;
var newschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
   visibility:{
        type:Boolean,
        required:true
    },
  });
module.exports=category=mongoose.model('categories',newschema)