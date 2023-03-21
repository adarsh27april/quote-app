//require mongoose
const mongoose = require('mongoose');

// Create Quote Schema
const quoteSchema = new mongoose.Schema({
   quote: String,
   bgColor: {
      type: String,
      default: '46244c',
   },
   likes: {
      type: Number,
      default: 0
   }
},
   { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);