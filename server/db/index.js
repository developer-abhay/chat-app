const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  avatar: String,
  bio: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: String, default: new Date().toDateString() },
});

const RequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const ChatSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groupChat: {
    name: { type: String },
    avatar: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admins: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
  },
  lastMessage: {
    content: { type: String, default: "" },
    timeStamp: { type: String, default: "" },
  },
});

const MessageSchema = new mongoose.Schema({
  content: { type: String },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  attachments: String,
  timeStamp: { type: String, default: new Date().toISOString() },
});

const User = mongoose.model("user", UserSchema);
const Request = mongoose.model("request", RequestSchema);
const Chat = mongoose.model("chat", ChatSchema);
const Message = mongoose.model("message", MessageSchema);

module.exports = { User, Request, Chat, Message };
