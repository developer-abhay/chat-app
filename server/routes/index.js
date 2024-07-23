const { Router } = require("express");
const {
  signupMiddleware,
  loginMiddleware,
  isAuthenticated,
} = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");

const route = Router();
const { getAllUsers, login, signUp } = require("../controllers/user");
const {
  getAllRequests,
  sendRequest,
  cancelRequest,
  acceptRequest,
} = require("../controllers/request");
const { creategroup, getAllChats } = require("../controllers/chat");
const { getAllMessages } = require("../controllers/message");

// Public Routes ->  Login, SignUp
route.post("/user/login", loginMiddleware, login);
route.post("/user/signup", upload.single("avatar"), signupMiddleware, signUp);

// route.use(isAuthenticated);
// User Authentication through cookies for all routes below

// Get all Users
route.get("/user", getAllUsers);

// All Requests , Send , Cancel / Reject , Accept
route.get("/request/:id", getAllRequests);
route.post("/request", sendRequest);
route.put("/request", acceptRequest);
route.delete("/request", cancelRequest);

// Get all chats, Create group
route.get("/chat/:userId", getAllChats);
route.post("/chat/creategroup", creategroup);

// Get all Chat Messages , Send Message
route.get("/message/:chatId", getAllMessages);
// route.post("/message", sendMessage);

module.exports = { route };
