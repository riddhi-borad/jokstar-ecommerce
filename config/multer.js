const multer=require("multer");
// const DIR="./public";
const path = require('path');

const storage=multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, path.join(__dirname, './public/'));
    },
    filename:(req,file,cb)=>{
        const filename=file.originalname.toLowerCase().split(" ").join("-");
        const date=Date.now();
        cb(null, date+"-"+filename);
    }
})


const upload=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="image/png" ||file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Only JPG, JPEG,PNG format allowed"));

        }
    }
})
module.exports=upload;
