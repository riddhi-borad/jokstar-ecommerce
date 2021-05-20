const mongoose=require('mongoose');
const Schema=mongoose.Schema
const timeZone = require('mongoose-timezone');
var newschema=new mongoose.Schema({
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
module.exports=lvl3Category=mongoose.model('lvl3categories',newschema)