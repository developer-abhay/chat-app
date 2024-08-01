const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");
const cookieParser = require("cookie-parser");
// Socket.io
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { Message, Chat, Request, User } = require("./db");
const { randomUUID } = require("crypto");

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

  console.log(`User ${userId} connected`);

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

    socket.broadcast.emit("refetch-chats", { chatId });
  });

  //Send Request
  socket.on("send-request", async (data) => {
    const { senderId, receiverId } = data;
    const recipientSocketId = userSocketIDs.get(receiverId);

    io.to(recipientSocketId).emit("receiveFriendRequest", {
      _id: Math.floor(Math.random() * 10000000000),
      senderId,
      receiverId,
      status: "pending",
    });

    await Request.create({
      senderId,
      receiverId,
    });
  });

  // cancel request
  socket.on("cancel-request", async (data) => {
    const { senderId, receiverId } = data;
    const recipientSocketId = userSocketIDs.get(receiverId);

    io.to(recipientSocketId).emit("cancelFriendRequest", {
      senderId,
      receiverId,
    });

    await Request.findOneAndDelete({
      senderId,
      receiverId,
    });
  });

  // Accept Request
  socket.on("accept-request", async (data) => {
    const { senderId, receiverId } = data;
    const senderSocketId = userSocketIDs.get(senderId);

    io.to(senderSocketId).emit("acceptFriendRequest", {
      senderId,
      receiverId,
    });

    await User.findOneAndUpdate(
      { _id: receiverId },
      { $push: { friends: senderId } }
    );
    await User.findOneAndUpdate(
      { _id: senderId },
      { $push: { friends: receiverId } }
    );
    await Chat.create({
      members: [receiverId, senderId],
      groupChat: null,
    });
    await Request.findOneAndDelete({
      senderId,
      receiverId,
    });
  });

  // Reject Request
  socket.on("reject-request", async (data) => {
    const { senderId, receiverId } = data;
    const senderSocketId = userSocketIDs.get(senderId);

    io.to(senderSocketId).emit("rejectFriendRequest", {
      senderId,
      receiverId,
    });

    await Request.findOneAndDelete({
      senderId,
      receiverId,
    });
  });

  // Group Created
  socket.on("createGroup", async (data) => {
    const { creator, groupName, members } = data;

    await Chat.create({
      members: [...members, creator],
      groupChat: {
        name: groupName,
        avatar: "",
        creator,
        admins: [creator],
      },
    });

    const creatorSocketId = userSocketIDs.get(creator);
    if (creatorSocketId) {
      io.to(creatorSocketId).emit("added-to-group", { groupName });
    }

    members.forEach((memberId) => {
      const memberSocketId = userSocketIDs.get(memberId);
      if (memberSocketId) {
        io.to(memberSocketId).emit("added-to-group", { groupName });
      }
    });
  });

  // Remove member from group
  socket.on("removeMember", async (data) => {
    const { memberId, chatId } = data;

    await Chat.findOneAndUpdate(
      { _id: chatId },
      { $pull: { members: { $in: [memberId] } } }
    );

    const memberSocketId = userSocketIDs.get(memberId);
    if (memberSocketId) {
      io.to(memberSocketId).emit("removed-from-group", { chatId });
    }
  });

  // Make Admin
  socket.on("makeAdmin", async (data) => {
    const { memberId, chatId } = data;

    await Chat.findOneAndUpdate(
      { _id: chatId },
      { $push: { "groupChat.admins": memberId } }
    );

    const memberSocketId = userSocketIDs.get(memberId);
    if (memberSocketId) {
      io.to(memberSocketId).emit("made-admin", { chatId });
    }
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
