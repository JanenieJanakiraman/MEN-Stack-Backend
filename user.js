//making a schema -> what are the basic properties of a certain object

//creating user schema

const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    //username, email,password
    username:String,
    email:String,
    password:String,
    
})

const userModel=mongoose.model('user',userSchema) //you enter the model name and the schema name


//to export it to app.js

module.exports=userModel