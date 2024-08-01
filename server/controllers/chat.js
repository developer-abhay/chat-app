const { Chat } = require("../db");
const path = require("path");
const { uploadToCloudinary } = require("../utils/cloudinary");

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

const updateavatar = async (req, res) => {
  const { userId, chatId } = req.body;
  let avatar;

  console.log(req.body);
  console.log(req.file);

  if (req.file) {
    const avatarPath = path.join(__dirname, "..", req.file.path);
    avatar = await uploadToCloudinary(avatarPath);

    await Chat.findOneAndUpdate(
      { _id: chatId },
      { "groupChat.avatar": avatar }
    );
    const allUserChats = await Chat.find({ members: userId });
    res.status(200).send({ allUserChats });
  } else {
    res.status(200).send({ message: "failed" });
  }
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

module.exports = { getAllChats, creategroup, updateavatar, leavegroup };
