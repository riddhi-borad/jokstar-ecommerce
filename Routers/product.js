const express = require("express");
const router = express.Router();
const Product=require("./../models/product");
const Quantity=require("./../models/quantityRange");
const upload=require('./../config/multer');
const User = require("../models/registration");
router.post('/saveproduct',upload.array("image",4),(req,res)=>{
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }
    User.findOne({jbpId:req.body.jbpId,userType:"Shopkeeper"})
    .then((isuser)=>{
      if(isuser){
       
    Product.findOne({jbpId:req.body.jbpId,name:req.body.name,categoryId:req.body.categoryId, lvl2catId:req.body.lvl2catId,lvl3catId:req.body.lvl3catId,brand:req.body.brand,price:req.body.price,size:req.body.size,pattern:req.body.pattern,description:req.body.description})
    .then((response)=>{
      if(response)
      res.status("400").json({ msg:"Product already exists!! "})
      else{
        let addproduct={
        jbpId:req.body.jbpId,
        name:req.body.name,
        categoryId:req.body.categoryId,
        lvl2catId:req.body.lvl2catId,
        lvl3catId:req.body.lvl3catId,
        brand:req.body.brand,
        price:req.body.price,
        // discountPrice:Number(req.body.price)-Number(discount),
        availableStock:req.body.availableStock,
        size:req.body.size,
        pattern:req.body.pattern,
        description:req.body.description,
        returnable:req.body.returnable,
        refundable:req.body.refundable,
        images:reqFiles,
        tnc:req.body.tnc,
        visibility:true,
        // discount:req.body.discount,
        // discountType:req.body.discountType,
        createdDt:Date(),
        updatedDt:Date()
        }
        new Product(addproduct).save()
        .then((result)=>{
          var quantity=req.body.quantity.split(",");
          var discount=req.body.discount.split(",");
          var discountType=req.body.discountType.split(",");
          // var discountedPrice=req.body.discountedPrice.split(",");
          for(var i=0;i<quantity.length;i++){
            // ----discount calc start-----
            var dis,perdiscount;
            if(discountType[i]=="rs")
            {
              perdiscount=Number(discount[i])
            }else if(discountType[i]=="%"){
              dis=Number(req.body.price)*Number(discount[i])
              perdiscount=Number(dis)/Number(100)
            }
            // ----discount calc end-----
            let addquantity={
              prodId:result._id,
              quantity:quantity[i],
              // price:Number(req.body.price),
              discount:Number(discount[i]),
              discountType:discountType[i],
              discountedPrice:Number(req.body.price)-Number(perdiscount),
              // saved:Number(req.body.price)-(Number(req.body.price)-Number(vardiscount))
            }
            new Quantity(addquantity).save()
            .then(()=>{
              console.log("quantiy insterted")
            }).catch((err)=>{
                console.log(err);
            })
          }
            res.status(200).json({msg:"product inserted !"});
        }).catch((err)=>{
            console.log(err);
        })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  else{
    res.status("400").json({ msg:"Unauthorized access!!"})
  
  }
  })

  .catch((err)=>{
    console.log(err)
  })
})

router.get('/viewprod',async(req,res)=>{
  var arr=[]
   await Product.find({ })
  //  .limit(2).skip(2)
    .populate('categoryId',{name:1})
    .populate('lvl2catId',{name:1})
    .populate('lvl3catId',{name:1})
    .populate('user',{_id:1,fullName:1})
    .then(async(response)=>{
      for (var i = 0; i < response.length; i++) {
        await Quantity.find({ prodId: response[i]._id })
          .then((result) => {
            var obj = {
              prod: response[i],
              quantity: result,
            };
            arr.push(obj);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err)=>{
        console.log(err)
    })
    res.status("200").json(arr);
})

// router.get("/editProd/:id", (req, res) => {
//     Product.findOne({ _id: req.params.id })
//     .populate("categoryId",{name:1})
//     .populate("lvl2catId",{name:1})
//     .populate("lvl3catId",{name:1})
//       .then((result) => {
//         res.status("200").json({result});
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

router.get("/prodDetail/:id", async(req, res) => {
  var arr=[]
    await Product.findOne({ _id: req.params.id })
    .populate('categoryId',{name:1})
    .populate('lvl2catId',{name:1})
    .populate('lvl3catId',{name:1})
      .then(async(response) => {
          await Quantity.find({ prodId: response._id })
            .then((result) => {
              var obj = {
                prod: response,
                quantity: result,
              };
              res.status("200").json(obj);
            })
            .catch((err) => {
              console.log(err);
            });       
      })
      .catch((err) => {
        console.log(err);
      });
     
  });


  router.post("/updateProd",upload.array("image",4),(req, res) => {
    const reqFiles = [];
    if (req.files.length > 0)
    {for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }}
    let reqFiles1 = reqFiles.concat(req.body.preImg);
    // var dis,discount;
    // if(req.body.discountType=="rs")
    // {
    // discount=Number(req.body.discount)
    // }else if(req.body.discountType=="%"){
    // dis=Number(req.body.price)*Number(req.body.discount)
    // discount=Number(dis)/Number(100)
    // }
    Product.findOne({_id: req.body.id})
      .then((data) => {
        data.name=req.body.name;
        data.categoryId=req.body.categoryId;
        data.lvl2catId=req.body.lvl2catId;
        data.lvl3catId=req.body.lvl3catId;
        data.brand=req.body.brand;
        data.price=req.body.price;
        data.availableStock=req.body.availableStock;
        data.size=req.body.size;
        data.pattern=req.body.pattern;
        data.description=req.body.description;
        data.returnable=req.body.returnable;
        data.refundable=req.body.refundable;
        data.images=reqFiles1;
        data.tnc=req.body.tnc;
        // data.discountPrice=Number(req.body.price)-Number(discount);
        // data.discount=req.body.discount;
        // data.discountType=req.body.discountType;
        data.visibility=req.body.visibility;
        data.updatedDt=Date();
        data.save()
          .then(async() => {
            await  Quantity.deleteMany({prodId: req.body.id})
            .then((result)=>{
              var quantity=req.body.quantity.split(",");
              var discount=req.body.discount.split(",");
              var discountType=req.body.discountType.split(",");
             // var discountedPrice=req.body.discountedPrice.split(",");
              for(var i=0;i<quantity.length;i++){
                // ----discount calc start-----
                var dis,vardiscount;
                if(discountType[i]=="rs")
                {
                  vardiscount=Number(discount[i])
                }else if(discountType[i]=="%"){
                  dis=Number(req.body.price)*Number(discount[i])
                  vardiscount=Number(dis)/Number(100)
                }
                // ----discount calc end-----
                let addquantity={
                prodId:req.body.id,
                quantity:quantity[i],
                // price:Number(req.body.price),
                discount:Number(discount[i]),
                discountType:discountType[i],
                discountedPrice:Number(req.body.price)-Number(vardiscount),
                // saved:Number(req.body.price)-(Number(req.body.price)-Number(vardiscount))
                }
                new Quantity(addquantity).save()
                .then(()=>{
                  console.log("quantiy insterted")
                }).catch((err)=>{
                  console.log(err);
                })
              }
            })
            .catch((err)=>{
              console.log(err)
            })
            res.status("200").json({ msg: "Data Updated Successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get('/deleteProd/:id',(req,res)=>{
    Product.findOne({_id:req.params.id})
    .then((data)=>{
      data.visibility==true?data.visibility=false:data.visibility=true;
      data.updatedDt=Date();
      data.save()
        .then(response=>{ res.status("200").json({msg:"Change visibility Successfully!"}) })
        .catch(err=>{ console.log(err) })
    })
    .catch((err)=>{
      console.log(err);
    })
  })

module.exports = router;