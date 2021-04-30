const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  attributs: {}

});

module.exports = mongoose.model("attributs", statSchema)