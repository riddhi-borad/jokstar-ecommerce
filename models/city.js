const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"states",
    },
});
module.exports=City=mongoose.model('cities',newschema)