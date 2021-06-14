
const express=require('express');
const app=express();
app.use(express.static(__dirname+"/public"));
// app.use('/static', express.static(path.join(__dirname, 'public')))
var cors=require('cors');
app.use(cors({credentials: true,methods: "GET, POST"}));

let mongoose=require('mongoose');
    username="jokester";
    password="jokester";
    dbName='e-commerce';
    mongoDBUri=`mongodb+srv://${username}:${password}@cluster0.lvvsz.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoDBUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port=5000;

app.listen(port,()=>{
    console.log(port);
})
app.get('/',(req,res)=>{
    res.send('welcome')
})
const login=require('./Routers/login');
const registration=require("./Routers/registration");
const category=require("./Routers/category");
const lvl2category=require("./Routers/lvl2category");
const lvl3category=require("./Routers/lvl3category");
const product=require("./Routers/product");
const admin=require("./Routers/master");
const cart =require("./Routers/cart")
const order=require("./Routers/order");
const banner=require("./Routers/banner");
const offerbanner=require("./Routers/offersBanner");
const state=require("./Routers/state");
const city=require("./Routers/city");
const wish=require("./Routers/wish");
app.use('/',login,registration,category,lvl2category,lvl3category,product,admin,order,banner,state,city,cart,wish,offerbanner);
