const { User, Request, Chat } = require("../db");

const getAllRequests = async (req, res) => {
  const { id } = req.params;
  const allRequests = await Request.find({
    $or: [{ receiverId: id }, { senderId: id }],
  });
  res.status(200).send({ allRequests });
};

//unfriend
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } }
  );
  await User.findOneAndUpdate(
    { _id: friendId },
    { $pull: { friends: userId } }
  );
  await Chat.findOneAndDelete({
    members: [userId, friendId],
    groupChat: null,
  });

  const updatedUser = await User.findOne({ _id: userId });

  res.status(200).json({
    message: "Friend added successfully",
    user: updatedUser,
  });
};

//Cancel and Reject
const cancelRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;
  await Request.findOneAndDelete({
    senderId,
    receiverId,
  });
  const allRequests = await Request.find({
    $or: [{ receiverId }, { senderId }],
  });

  res.status(200).json({ allRequests });
};

// Accept friend Request
const acceptRequest = async (req, res) => {
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
};

module.exports = { getAllRequests, removeFriend, cancelRequest, acceptRequest };
