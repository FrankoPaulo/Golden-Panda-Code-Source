const mongoose = require("mongoose");

const battleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  kills: Number,
  deaths: Number,
  isBattle: Boolean

});

module.exports = mongoose.model("battle", battleSchema)