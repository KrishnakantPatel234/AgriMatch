const express = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const chats = await Chat.find({ userId: req.params.userId });
  res.json(chats);
});

router.get("/messages/:chatId", async (req, res) => {
  const msgs = await Message.find({ chatId: req.params.chatId });
  res.json(msgs);
});

router.post("/send", async (req, res) => {
  const { chatId, message, from, to } = req.body;

  await Message.create({ chatId, message, from, to });

  await Chat.findByIdAndUpdate(chatId, { lastMessage: message });

  res.json({ success: true });
});

module.exports = router;
