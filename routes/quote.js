//require express router
const router = require('express').Router();
// require Quote Model
const Quote = require("../models/Quote");


//create routes
//get home
router.get("/", (req, res) => {
   I //Lets check if user Logged in? then the access to this route will be redirected to this quotes page automatically
   if (req.isAuthenticated()) {
      res.redirect('/quotes')
   } else {
      res.render("/index")
   }
})

// get register
router.get("/register", (req, res) => {
   I //Lets check if user Logged in? then the access to this route will be redirected to this quotes page automatically
   if (req.isAuthenticated()) {
      res.redirect('/quotes')
   } else {
      res.render("/register")
   }
})


//login page
router.get("/login", (req, res) => {
   I //Lets check if user Logged in? then the access to this route will be redirected to this quotes page automatically
   if (req.isAuthenticated()) {
      res.redirect('/quotes')
   } else {
      res.render("/login")
   }
})

// get quotes page (fetch data from db and send to quotes page)
router.get("/quotes", async (req, res) => {
   try {
      //fetch all quotes from db
      const allQuotes = await Quote.find();
      res.render("quotes", { allQuotes, isAuth: req.isAuthenticated() });
      console.log(req.isAuthenticated());
   } catch (err) {
      res.send(err);
   }
});


//submit page
router.get("/submit", (req, res) => {
   I //Lets check if user Logged in? then the access to this route will be redirected to this quotes page automatically
   if (req.isAuthenticated()) {
      res.render('/submit')
   } else {
      res.redirect("/register")
   }
})


//POST
//submit a quote and add data to database 
router.post('/submit', async (req, res) => {
   console.log(req.body);
   try {
      const quote = new Quote({
         quote: req.body.quote,
         bgColor: req.body.bgcolor.substring(1) //[because bg color will send in hex format (#eeeee) so we need to remove #
      });
      //save quote in db
      const saveQuote = quote.save();
      console.log("saveQuote", saveQuote);
      //redirect to quotes if success
      !saveQuote && res.redirect('/submit');
      res.redirect('/quotes');
   }
   catch (err) {
      console.log(err);
      res.send(err);
   }
});


//like quotes
//Like quotes
router.post("/quotes/like", async (req, res) => {
   try {
      //find the post to update Likes
      const post = await Quote.findById(req.body.likesBtn);
      const updateLikes = await post.updateOne({ likes: post.likes + 1 });
      //redirect Lo quotes page
      res.redirect('/quotes');
   } catch (err) {
      res.send(err);
   }
});

module.exports = router;