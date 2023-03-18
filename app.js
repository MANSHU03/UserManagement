//jshint esversion:6
const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose = require("mongoose");

const app= express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://127.0.0.1:27017/test');

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });
const User = new mongoose.model("User", {
  email: String,
  password: String,
  secret: String,
});

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/Forgot_Password",function(req,res){
  res.render("Forgot_Password");
})

app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
    secret: req.body.sec
  });

newUser.save().then(function(){

    console.log("saved data");
    res.render("secrets");

});
});

app.post("/login",function(req,res)
{
  const username=req.body.username;
  const password=req.body.password;
  User.findOne({email:username}).then(function(a){

        if(a.password===password)
        {res.render("secrets");}
        else{console.log("wrong password");

          res.render("login");
        }

  });
});

app.post("/Forgot_Password",function(req,res) {
  const username=req.body.username;
  const password=req.body.password;
  const secret=req.body.sec;
  User.updateOne({email:username , secret:secret},{password:password}).then(function(a)
{
//  a.password=password;
  res.render("login");
});

});


app.listen(3000,function(){
  console.log("server started on port 3000");
});
