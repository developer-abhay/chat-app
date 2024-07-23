const { Chat, Message } = require("../db");

const getAllMessages = async (req, res) => {
  const { chatId } = req.params;

  const allMessages = await Message.find({
    chatId,
  }).select(["-_id", "-__v"]);
  res.status(200).send({ allMessages });
};

// const sendMessage = async (req, res) => {
//   const { chatId, content, senderId } = req.body;

//   const message = await Message.create({
//     chatId,
//     content,
//     senderId,
//   });

//   await Chat.findOneAndUpdate({ _id: chatId }, { lastMessage: content });

//   res.status(200).send({ message });
// };

module.exports = { getAllMessages };
