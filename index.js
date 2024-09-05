// CRUD operation on user using mongodb and express

//bodyParser.json() is a middleware function provided by the body-parser library.
//When you use app.use(bodyParser.json()), it tells your Express application,
// to use this middleware to automatically parse the JSON data in the body of incoming requests. 
//This means that if a client sends a request with a JSON payload, the middleware will parse it and make it available on req.body

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())  //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
//app.use(bodyParser.urlencoded({extended:true})) //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option // typically used when submitting form data via HTTP POST requests

mongoose.connect("mongodb://127.0.0.1:27017/testdb",{     
})
console.log("connection established")

//create a Schema
const UserSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String ,required:true},
    age : Number,
});

//create a Model
const User = mongoose.model("users",UserSchema);     
// User -> model name
// users -> collection name in testdb

app.get('/users',async(req,res)=>{
    try{
        const all_users = await User.find(); //await keyword ensures that the server waits for the User.find() operation to complete before sending the response, without blocking other operations.
        res.status(200).json(all_users);
    }
    catch(err){
        res.json({message:err.message});
    }
});

app.post('/users',async(req,res)=>{
    const user_body = new User({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
    })

    // user_body.save().then((val)=>res.json(val))              // can simply be done like this too
    // .catch((err)=>res.status(400).json({message:err}))
    try{
        const newUser = await user_body.save();
        res.status(201).json(newUser);
        
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

app.put('/users/:id',async(req,res)=>{
   try{ 
    console.log(req.params.id) // to see what its sending
    const myUser = await User.findById(req.params.id)  // specifally find document wrt to id
    if(!myUser) return res.status(404).json({message:"user not found"});

    myUser.name = req.body.name   || myUser.name   // if not put(updated)name then accept by default myUser.name which is as it is
    myUser.email = req.body.email || myUser.email
    myUser.age = req.body.age     || myUser.age

    const updatedUser = await myUser.save();
    res.json(updatedUser);
    }
    catch(err){
        res.json({message:err.message})
    }
});

app.delete('/users/:id',async(req,res)=>{
    try{
    const myUser = await User.findById(req.params.id);
    if(!myUser) return res.status(404).json({message:"user not found"});

    console.log(myUser);
    await myUser.deleteOne();
    res.json({ message: 'User deleted' });
    }
    catch(err){
        res.json({message:err.message})
    }

})

app.listen(8080,()=>{
    console.log("server started")
})

// When you perform database operations, they can take time, 
//especially if the database is large or the network is slow. 
//Using await allows your application to continue executing other tasks while 
//waiting for the database operation to complete, rather than blocking the main thread1.