//require our packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const ejs = require("ejs");

//require router routes
const authRoute = require("./routes/auth");
const quoteRoute = require("./routes/quote")

//setupp application 
const app = express();

//setupp view engine EJS, body-
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


//setup session
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false
}));
console.log(process.env.SECRET);
//initialize passport
app.use(passport.initialize());
//use passport to deal with session 

app.use(passport.session())

//connecting to DB
mongoose.connect(process.env.DB_CONNECT)
   .then(() => console.log('db connect success'))
   .catch((err) => console.log('db connect error', err))


app.get('/', (req, res) => {
   res.render('index');// note that by default the views folder is considered
})
app.get('/register', (req, res) => {
   res.render('register');
})
app.get('/login', (req, res) => {
   res.render('login');
})
app.get('/submit', (req, res) => {
   res.render('submit');
})
// app.get('/quotes', (req, res) => {
//    res.render('quotes');
// })

//use auth routes
app.use('/', authRoute)
app.use('/', quoteRoute)
app.listen(process.env.PORT, () => {
   console.log('server on port', process.env.PORT);
})