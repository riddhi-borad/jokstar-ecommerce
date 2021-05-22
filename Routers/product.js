const express = require("express");
const router = express.Router();
const Product=require("./../models/product");
const upload=require('./../config/multer')
router.post('/saveproduct',upload.array("image",4),(req,res)=>{
    const reqFiles = [];
    // const url = req.protocol + '://' + req.get('host')
    // console.log(req.files)
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }
    let addproduct={
    jbpId:req.body.jbpId,
    name:req.body.name,
    categoryId:req.body.categoryId,
    lvl2catId:req.body.lvl2catId,
    lvl3catId:req.body.lvl3catId,
    brand:req.body.brand,
    price:req.body.price,
    availableStock:req.body.availableStock,
    size:req.body.size,
    pattern:req.body.pattern,
    description:req.body.description,
    returnable:req.body.returnable,
    refundable:req.body.refundable,
    images:reqFiles,
    tnc:req.body.tnc,
    visibility:true,
    createdDt:Date(),
    updatedDt:Date()
    }
    new Product(addproduct).save()
    .then(()=>{
        res.status(200).json({msg:"product inserted !"});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/viewprod',(req,res)=>{
    Product.find({ })
    .populate('categoryId',{name:1})
    .populate('lvl2catId',{name:1})
    .populate('lvl3catId',{name:1})
    .populate('user',{_id:1,jbpId:1,fullName:1})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/editProd/:id", (req, res) => {
    Product.findOne({ _id: req.params.id })
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/prodDetail/:id", (req, res) => {
    Product.findOne({ _id: req.params.id })
    .populate('categories',{name:1})
    .populate('lvl2categories',{name:1})
    .populate('lvl3categories',{name:1})
      .then((result) => {
        res.status("200").json({result});
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;