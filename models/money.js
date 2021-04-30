const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  money: Number,
  eventcoins: Number

});

module.exports = mongoose.model("money", moneySchema)