const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
  
});
module.exports=State=mongoose.model('states',newschema)