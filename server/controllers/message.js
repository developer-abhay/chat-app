const { Chat, Message } = require("../db");
const path = require("path");
const { uploadToCloudinary } = require("../utils/cloudinary");

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

const sendAttachment = async (req, res) => {
  const { chatId, senderId, timeStamp } = req.body;
  let attachment;

  if (req.file) {
    const attachmentPath = path.join(__dirname, "..", req.file.path);
    attachment = await uploadToCloudinary(attachmentPath);
  }

  const message = await Message.create({
    chatId,
    attachment: { url: attachment, type: req.file.mimetype },
    senderId,
    timeStamp,
  });

  await Chat.findOneAndUpdate(
    { _id: chatId },
    { lastMessage: { timeStamp, content: req.file.originalname } }
  );

  res.status(200).send({ message, lastMessage: req.file.originalname });
};

module.exports = { getAllMessages, sendAttachment };
