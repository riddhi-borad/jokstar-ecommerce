const mongoose=require('mongoose');
const timeZone = require('mongoose-timezone');
var newschema=new mongoose.Schema({
    jbpId:{
        type:String,
        trim:true,
        // required:true
    },
    fullName:{
        type:String,
        trim:true,
        // required:true,
    },
    mail:{
        type:String,
        trim:true,
        // required:true,
    },
    password:{
        type:String,
        trim:true,
        // required:true
    },
    mobile:{
        type:Number,
        trim:true,
        required:true
    },
    userType:{
        type:String,
        trim:true,
        // required:true,
    },
    Image:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
        // required:true,
    },
    pincode:{
        type:Number,
        trim:true,
        // required:true
    },
    country:{
        type:String,
        trim:true,
        // required:true
    },
    state:{
        type:String,
        trim:true,
        // required:true
    },
    city:{
        type:String,
        trim:true,
        // required:true
    },
    isActive:{
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
})
newschema.plugin(timeZone, { paths: ['createdDt', 'updatedDt'] });
module.exports=User=mongoose.model('users',newschema)