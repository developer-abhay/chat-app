const { Chat } = require("../db");

const getAllChats = async (req, res) => {
  const { userId } = req.params;
  const allUserChats = await Chat.find({ members: userId });

  res.status(200).send({ allUserChats });
};

const creategroup = async (req, res) => {
  const { creator, groupName, members } = req.body;

  await Chat.create({
    members: [...members, creator],
    groupChat: {
      name: groupName,
      avatar: "",
      creator,
      admins: [creator],
    },
  });

  res.status(200).send({ message: "Success" });
};

const leavegroup = async (req, res) => {
  const { userId, chatId } = req.body;

  await Chat.findOneAndUpdate(
    { _id: chatId },
    { $pull: { members: { $in: [userId] } } }
  );

  const allUserChats = await Chat.find({ members: userId });
  res.status(200).send({ allUserChats });
};

module.exports = { getAllChats, creategroup, leavegroup };
