const { User, Request, Chat } = require("../db");

const getAllRequests = async (req, res) => {
  const { id } = req.params;
  const allRequests = await Request.find({
    $or: [{ receiverId: id }, { senderId: id }],
  });
  res.status(200).send({ allRequests });
};

// const sendRequest = async (req, res) => {
//   const { senderId, receiverId } = req.body;
//   await Request.create({
//     senderId,
//     receiverId,
//   });
//   const allRequests = await Request.find({
//     $or: [{ receiverId }, { senderId }],
//   });
//   res.status(200).json({ allRequests });
// };

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

module.exports = { getAllRequests, cancelRequest, acceptRequest };
