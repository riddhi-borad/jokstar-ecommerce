const mongoose=require('mongoose');
var newschema={
    uniqid:{
        type:String,
        trim:true,
        required:true,
    },
    usertype:{
        type:String,
        trim:true,
        required:true,
    },
    accessCusSer:{
        type:String,
        trim:true,
        // required:true
    },
    accessorder:{
        type:String,
        trim:true,
        // required:true
    },
    paymentsetting:{
    type:String,
        trim:true,
        // required:true
    },
    createdDt:{
    type:Date,
    required:true
   },
   modifiedDt:{
    type:Date,
    required:true
   }
}
module.exports=Master=mongoose.model('masters',newschema)