const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");


const app = express();

// Must match your frontend
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"] // same as frontend
});

//------------------------------------
// SOCKET HANDLERS
//------------------------------------
io.on("connection", (socket) => {
  console.log("🔗 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

//------------------------------------
server.listen(5000, () => {
  console.log("🚀 AgroLink Backend running on port 5000");
});
