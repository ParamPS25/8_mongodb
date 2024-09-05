// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
//It provides a schema-based solution to model your application data, making it easier to work with MongoDB. 
// npm i mongoose => require('mongoose')

//1. Schema
//Definition: A schema defines the structure of documents within a collection. 
//It specifies the fields, their data types, default values, validation rules, and other properties.
//It acts as a blueprint for the data, ensuring consistency and enforcing rules on the data stored in the database.

//2. model
//Definition: A model is a compiled version of the schema. It provides an interface for interacting with the database, allowing you to create, read, update, and delete documents.
//It represents a collection of documents and includes methods for performing CRUD operations

const mongoose = require("mongoose");

//make connection to Mongodb
mongoose.connect("mongodb://127.0.0.1:27017/db1")

// create schema for user
const userSchema = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String, unique:true , lowecase:true},
    createdAt : {type:Date , default:Date.now}
});

// create model
const User = mongoose.model("users",userSchema);
// User -> model name
// users -> collection name in testdb

const eg_user = new User({          // new Instance of User
    name: 'John Doe', 
    email: 'john@example.com',
     age: 30 
})

//Use the model to interact with the collection
eg_user.save()
.then(user => console.log('User created:', user))
.catch(error => console.error('Error creating user:', error));

//output :

// User created: {
//     name: 'John Doe',
//     email: 'john@example.com',
//     _id: new ObjectId('66da14c0854f9ad411e10365'),
//     createdAt: 2024-09-05T20:29:52.303Z,
//     __v: 0
//   }


