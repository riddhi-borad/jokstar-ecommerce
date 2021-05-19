const mongoose=require('mongoose');
const timeZone = require('mongoose-timezone');
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
    createdDt:{
        type:Date,
        required:true
    },
    updatedDt:{
        type:Date,
        required:true
    }
  });
  newschema.plugin(timeZone, { paths: ['createdDt', 'updatedDt'] });
module.exports=category=mongoose.model('categories',newschema)