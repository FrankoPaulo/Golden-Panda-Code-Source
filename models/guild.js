const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  prefix: {
    "type": String,
    "default": "!"
  },
  users: []
});

module.exports = mongoose.model("Guild", guildSchema)