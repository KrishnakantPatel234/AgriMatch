const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: String,
  from: String,
  to: String,
  message: String,
});

module.exports = mongoose.model("Message", messageSchema);
