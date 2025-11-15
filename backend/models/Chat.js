const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: String,
  farmerId: String,
  farmerName: String,
  lastMessage: String
});

module.exports = mongoose.model("Chat", chatSchema);