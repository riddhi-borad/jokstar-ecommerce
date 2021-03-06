const mongoose=require('mongoose');
const Schema=mongoose.Schema
const timeZone = require('mongoose-timezone');
var newschema=new mongoose.Schema({
   jbpId:{
        type:String,
        trim:true,
        required:true,
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"categories",
    },
    lvl2catId:{
        type:Schema.Types.ObjectId,
        ref:"lvl2categories",
    },
    lvl3catId:{
        type:Schema.Types.ObjectId,
        ref:"lvl3categories",
    },
    brand:{
        type:String,
        trim:true,
        // required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    availableStock:{
        type:Number,
        trim:true,
        required:true
    },
    size:{
        type:String,
        trim:true,
        // required:true,
    },
    pattern:{
        type:String,
        trim:true,
        // required:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    returnable:{
        type:String,
        trim:true,
        // required:true,
    },
    refundable:{
        type:String,
        trim:true,
        // required:true,
    },
    images:{
        type:Array,
        trim:true,
        // required:true,
    },
    tnc:{
        type:String,
        trim:true,
        // required:true,
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
    },
    // discount:{
    //     type:Number,
    //     trim:true
    // },
    // discountPrice:{
    //     type:Number,
    //     trim:true
    // },
    // discountType:{
    //     type:String,
    //     trim:true
    // }
},


// custome column reference
{
    toObject: {virtuals:true},
    toJSON: {virtuals:true} 
});


newschema.virtual('user', {
    ref: 'users',
    localField: 'jbpId',
    foreignField: 'jbpId',
    justOne: true // for many-to-1 relationships
  });
  newschema.plugin(timeZone, { paths: ['createdDt', 'updatedDt'] });
module.exports=Product=mongoose.model('products',newschema)