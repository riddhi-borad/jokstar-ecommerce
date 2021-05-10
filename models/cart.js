const mongoose=require('mongoose');
const Schema=mongoose.Schema
var newschema=new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"products",
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
    quantity:{
        type:Number,
        required:true
    }
     
})
module.exports=Cart=mongoose.model('carts',newschema)