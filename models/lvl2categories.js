const mongoose=require('mongoose');
const Schema=mongoose.Schema
const timeZone = require('mongoose-timezone');
var newschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    lvl2catId:{
        type:String,
        trim:true,
        required:true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories",
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
module.exports=lvl2Category=mongoose.model('lvl2categories',newschema)