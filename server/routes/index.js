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
  cancelRequest,
  acceptRequest,
} = require("../controllers/request");
const {
  creategroup,
  getAllChats,
  leavegroup,
  updateavatar,
} = require("../controllers/chat");
const { getAllMessages, sendAttachment } = require("../controllers/message");

// Public Routes ->  Login, SignUp
route.post("/user/login", loginMiddleware, login);
route.post("/user/signup", upload.single("avatar"), signupMiddleware, signUp);

// route.use(isAuthenticated);
// User Authentication through cookies for all routes below

// Get all Users
route.get("/user", getAllUsers);

// All Requests , Send , Cancel / Reject , Accept
route.get("/request/:id", getAllRequests);
// route.put("/request", acceptRequest);
// route.delete("/request", cancelRequest);

// Get all chats, Create group
route.get("/chat/:userId", getAllChats);
route.post("/chat/creategroup", creategroup);
route.post("/chat/updateavatar", upload.single("groupAvatar"), updateavatar);
route.post("/chat/leavegroup", leavegroup);

// Get all Chat Messages , Send Message
route.get("/message/:chatId", getAllMessages);
// route.post("/message", sendMessage);
route.post("/message/attachment", upload.single("attachment"), sendAttachment);

module.exports = { route };
