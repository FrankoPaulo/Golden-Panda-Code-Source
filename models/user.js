const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  class: String,
  zone: String,
  warnlevel: Number

});

module.exports = mongoose.model("user", userSchema)