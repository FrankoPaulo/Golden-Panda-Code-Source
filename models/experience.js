const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  experience: Number,
  level: Number

});

module.exports = mongoose.model("experience", xpSchema)