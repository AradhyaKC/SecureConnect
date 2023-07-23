var express = require('express');
var router = express.Router();
var {User}=require("../models/user");
const connectApp=require('../secureConnect.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

});
router.get('/Login',async function(req,res){
  const {username,password}=req.body;
  if(await connectApp.Login(username,password,req.ip)){
    return res.status(200).json({"message":"success"});
  }else {
    return res.status(200).json({"message":"incorrect password or username"});
  }
});


router.post('/',async function( req,res){
  try{
    var {username,password}=req.body;

    var existingUsers=await User.find({"username":username});
    
    if(existingUsers.length>0){
      return res.status(200).json({"message":"error : a user with the same name alreaady exists"});
    }

    const newUser =new User();
    newUser.username=username;
    newUser.password=password;

    newUser.save();

    return res.status(200).json({'message':"success"});
  }catch(e){
    console.error(e);
  }
});




module.exports = {router};
