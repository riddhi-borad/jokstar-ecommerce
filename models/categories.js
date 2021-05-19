const mongoose=require('mongoose');
const Schema=mongoose.Schema
var ObjectId=Schema.ObjectId;
var newschema=new mongoose.Schema({
    jbpId:{
        type:String,
        trim:true,
        required:true
    },
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
module.exports=category=mongoose.model('categories',newschema)