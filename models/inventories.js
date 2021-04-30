const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  inventory: [],
  equipment: {}
});

module.exports = mongoose.model("inventory", inventorySchema)