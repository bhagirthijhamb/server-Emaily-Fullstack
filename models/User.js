// lets create Mongoose Model class
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// mongoose object has a property called Schema. Take it and assign it to a new variable called Schema
const { Schema } = mongoose;

// create user schema
const userSchema = new Schema({
  googleId: String
})

// load user schema into mongoose by saying .model('users', userSchema)
// loading this model into mongose creates a model class
mongoose.model('users', userSchema) // name of the collection - 'users'

// we can pull a model out of mongoose by giving a single argument like
// const User = mongoose.model('users')