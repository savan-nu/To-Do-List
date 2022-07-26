const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname +"/date.js");
const app = express();

console.log(date);
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB" , {useNewurlParser : true});

const itemSchema = {
    name: String
};
const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name: "Priyank"
});
const item2 = new Item({
    name: "Savan"
});
const item3 = new Item({
    name: "Kuki"
});

const constItems = [item1,item2,item3];


app.use(bodyParser.urlencoded({extended:true}));
var data = ["Web-Development" , "Competitive"]; 
let workdata = []; 

app.get("/",(req,res)=>{
    
    Item.find({} , (err,foundItems)=>{
        if(foundItems.length === 0){
            Item.insertMany(constItems,(err)=>{
    if(err){
        console.log(err);
        }
        else{
            console.log("constant item added succesfully");
        }
});


        }
        console.log(foundItems);
        res.render("list" , {title:day , newitem: foundItems});    
    })
    let day = date.getDate();
   
}) 
app.post("/",(req,res)=>{
    console.log(req.body);
    let item = req.body.work;
    if(req.body.buttontitle == "WorkList"){
        workdata.push(item);
        res.redirect("/work");
    }
    else{
    data.push(item);
    //res.send(`${data}`);
    res.redirect("/");
    }
});
app.get("/work" , function(req,res){
    res.render("list" , {title:"WorkList" , newitem:workdata});
});
app.post("/work",(req,res)=>{
    let item = req.body.work;
    workdata.push(item);
    //res.send(`${data}`);
    res.redirect("/work");
})
app.listen(3000,()=>{
    console.log("server running on port 3000");
}
);
