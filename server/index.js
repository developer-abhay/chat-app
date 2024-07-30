const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");
const cookieParser = require("cookie-parser");
// Socket.io
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { Message, Chat } = require("./db");

require("dotenv").config();

const userSocketIDs = new Map();

const corsOptions = {
  origin: [
    "https://admin.socket.io",
    "http://localhost:5173",
    "https://textin.vercel.app",
  ],
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST", "PUT", "DELETE"],
  // optionSuccessStatus: 200,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  userSocketIDs.set(userId.toString(), socket.id);

  // Switch Chat or Join Chat
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  // Switch/Leave Chat
  socket.on("leave-chat", (chatId) => {
    socket.leave(chatId);
  });

  // Send Message
  socket.on("message", async (data) => {
    const { chatId, content, senderId, timeStamp } = data;

    socket
      .to(chatId)
      .emit("messageResponse", { data, lastMessage: { timeStamp, content } });

    await Message.create({
      chatId,
      content,
      senderId,
      timeStamp,
    });

    await Chat.findOneAndUpdate(
      { _id: chatId },
      { lastMessage: { timeStamp, content } }
    );
  });

  //Send Request
  socket.on("send-request", async (data) => {
    const { senderId, receiverId } = data;
    const recipientSocketId = userSocketIDs.get(recipientId);
    const receiverSocketId = getUserSocketId(receiverId);

    // socket.to(chatId).emit("requestNotification", {
    //   data,
    //   lastMessage: { timeStamp, content },
    // });

    // res.status(200).json({ allRequests });

    await Request.create({
      senderId,
      receiverId,
    });

    const allRequests = await Request.find({
      $or: [{ receiverId }, { senderId }],
    });
  });

  //Disconnect User
  socket.on("disconnect", () => {
    userSocketIDs.delete(userId.toString());
    console.log(`User ${userId} disconnected, cleaned up from map`);
  });
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/v1", route);

httpServer.listen(process.env.PORT, () =>
  console.log("server is listening at PORT: " + process.env.PORT)
);

module.exports = { userSocketIDs };
