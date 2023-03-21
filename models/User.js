//require mongoose, passport-Local-mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create User Schema
const userSchema = new mongoose.Schema({
   username: String,
   password: String
});


// hash password using passport-Local-mongoose plugin userSchema.plugin (passportLocalMongoose);
userSchema.plugin(passportLocalMongoose)

//export User model
module.exports = mongoose.model('User', userSchema);