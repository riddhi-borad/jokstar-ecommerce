const mongoose=require('mongoose');
var newschema={
    userId:{
        type:String,
        trim:true,
        required:true,
    },
    fullName:{
        type:String,
        trim:true,
        required:true,
    },
    mail:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    mobile:{
        type:Number,
        trim:true,
        required:true
    },
    userType:{
        type:String,
        trim:true,
        required:true,
    },
    // Image:{
    //     type:String,
    //     trim:true,
    // },
    address:{
        type:String,
        trim:true,
        required:true,
    },
    pincode:{
        type:Number,
        trim:true,
        required:true
    },
    country:{
        type:String,
        trim:true,
        required:true
    },
    state:{
        type:String,
        trim:true,
        required:true
    },
    city:{
        type:String,
        trim:true,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
}
module.exports=User=mongoose.model('users',newschema)