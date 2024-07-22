const { Router, query } = require("express");
const {
  signupMiddleware,
  loginMiddleware,
  upload,
} = require("../middlewares/index");
const path = require("path");
const { User, Request, Chat } = require("../db");
const route = Router();
const { uploadToCloudinary } = require("../utils/cloudinary");
const { resolveSoa } = require("dns");

// Get all Users
route.get("/", async (req, res) => {
  const allUsers = await User.find(
    {},
    { name: true, username: true, avatar: true }
  );
  res.status(200).send({ users: allUsers });
});

// Login Route
route.post("/login", loginMiddleware, (req, res) => {
  const user = req.userObj; //from middleware
  res.status(200).send({ user });
});

// Sign Up Route
route.post(
  "/signup",
  upload.single("avatar"),
  signupMiddleware,
  async (req, res) => {
    const { name, username, bio } = req.body;
    const password_hash = req.hashedPassword;
    let avatar;

    if (req.file) {
      const avatarPath = path.join(__dirname, "..", req.file.path);
      avatar = await uploadToCloudinary(avatarPath);
    }

    try {
      const user = await User.create({
        name,
        username,
        password_hash,
        bio,
        avatar,
      });

      res.status(200).send({
        user: {
          name: user.name,
          username: user.username,
          bio: user.bio,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      res.status(500).send({
        error: "An error occurred while creating the user.",
      });
    }
  }
);

// Get all requests
route.get("/request/:id", async (req, res) => {
  const { id } = req.params;
  const allRequests = await Request.find({
    $or: [{ receiverId: id }, { senderId: id }],
  });
  res.status(200).send({ allRequests });
});

// Send Request
route.post("/request", async (req, res) => {
  const { senderId, receiverId } = req.body;
  await Request.create({
    senderId,
    receiverId,
  });
  const allRequests = await Request.find({
    $or: [{ receiverId }, { senderId }],
  });
  res.status(200).json({ allRequests });
});

// Cancel Request and Reject Request
route.delete("/request", async (req, res) => {
  const { senderId, receiverId } = req.body;
  await Request.findOneAndDelete({
    senderId,
    receiverId,
  });
  const allRequests = await Request.find({
    $or: [{ receiverId }, { senderId }],
  });

  res.status(200).json({ allRequests });
});

// accept request
route.put("/request", async (req, res) => {
  const { senderId, receiverId } = req.body;

  const receiver = await User.findOne({ _id: receiverId });

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }
  // Check if the sender is already a friend
  if (receiver.friends.includes(senderId)) {
    return res.status(400).json({ message: "User is already a friend" });
  }

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

  const updatedUser = await User.findOne({ _id: receiverId });
  const allRequests = await Request.find({
    $or: [{ receiverId }, { senderId }],
  });
  res.status(200).json({
    message: "Friend added successfully",
    user: updatedUser,
    allRequests,
  });
});

// Create group request
route.post("/createchat", async (req, res) => {
  const { creator, groupName, members } = req.body;

  if (groupName) {
    await Chat.create({
      members: [...members, creator],
      groupChat: {
        name: groupName,
        avatar: "",
        creator,
      },
      lastMessage: "Hello",
    });
  } else {
    await Chat.create({
      members,
      groupChat: null,
      lastMessage: "Hello",
    });
  }
});

//Get all chats
route.get("/chats/:userId", async (req, res) => {
  const { userId } = req.params;

  const allUserChats = await Chat.find({ members: userId });

  res.status(200).send({ allUserChats });
});

module.exports = { route };
