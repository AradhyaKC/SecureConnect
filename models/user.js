const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema =new Schema({
    username:{type:String,required:true},
    password:{type:String, required:false, minLength:3, maxLength:100},
});

const User= mongoose.model('User',UserSchema);
const authenticateUser=async(username,password)=>{
    const userFound = await User.findOne({ 'username': username });
  
    if (userFound == null) {
      return "the user does not exist";
    } else if (userFound.password != password) {
      return "wrong password";
    }
  
    return "success";
  }


module.exports ={User,authenticateUser};