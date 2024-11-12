const express = require('express');

const morgan = require('morgan')

const app = express();

const userModel=require('./models/user');//in a database, to do anything with a user or any action to perform wrt to the user, we need this
//to basically perform any action related to a user in a database

const dbConnection =require('./config/db')

//express is like a closed toolbox which opens when it is called.
//this is assi gned to app.Now, to get the tools present in express,
//should type -> app."toolname"

app.use(morgan('dev'))//third party middleware

app.use(express.json())//builtin middleware
app.use(express.urlencoded({extended:true})) //builtin middleware
app.use(express.static("public")) // need to mention the folder in which you have created the file tha you want to go static with
// we did this to link the css file 

app.set("view engine", 'ejs')



app.get('/',(req, res)=>{ //this is the slash route funtion
    res.render('index')

})

app.get('/about',(req,res)=>{
    res.send("About page")
})

app.get('/profile',(req,res)=>{
    res.send("Profile page")
})
app.get('/aboutme',(req,res)=>{
    res.send("hi, its janenie")
})
//the database part-> to create a user in the database based on the information retrieved from the frontend
app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    const{username,email,password}=req.body //destructuring, all properties of req.body goes into them in the form of the variable

    //to create a user-> it'll be in object form
   const newUser= await userModel.create({
        username:username, //this is all read from req.body,that means you can access values
        email:email,
        password: password
    })
 
    res.send(newUser)
})

 
app.get('/get-users',(req,res)=>{
    userModel.findOne({
        username:'v'
    }).then((user)=>{

        console.log(user)//this will return the values if they exist or null if they don't -> on the console

        res.send(user)
    })
})
//updating the user information
app.get('/update-user',async(req,res)=>{
    await userModel.findOneAndUpdate({
        username:'a'
    },{
        email:'c@c.com'
    })
    res.send("user updated")
})
//above, we found the user with username a and then we change the email to c@c.com



app.get('/delete-user',async(req,res)=>{
    await userModel.findOneAndDelete({
        username:'a'
    })
    res.send('user deleted')
})

app.get('/delete-user1', async(req, res)=>{
    await userModel.findOneAndDelete({
        username:'janenie'
    })
    res.send('user 2 deleted')
})

//the route changes if we use different methods for both.
//that means, the route for register with post is 
//different from the route for register with get

app.post('/get-form-data', (req,res)=>{
    console.log(req.body) //data comes in req.query
    res.send('data received')
})


app.listen(910)

//get creates you a router from which you can send a request to the browser 
//'/' is the default route for any application. the above code means:
//if there is any request sent to the '/' route, then print hello world
//express also uses http behind the scenes lmao