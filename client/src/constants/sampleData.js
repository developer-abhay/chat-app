export const Chats = [
  {
    _id: 1,
    members: ["1", "2"],
    groupChat: null,
    lastMessage: "kya kr rha h ?",
  },
  {
    _id: 3,
    members: ["1", "3"],
    groupChat: null,
    lastMessage: "i will ask him",
  },
  { _id: 2, members: ["2", "3"], groupChat: null, lastMessage: "Whats up" },
  {
    _id: 4,
    members: ["1", "2", "3"],
    groupChat: {
      name: "Warriors",
      avatar:
        "https://i.pinimg.com/736x/36/db/a9/36dba9c5d5a175f394471c9c0174e38f.jpg",
      creator: "2",
    },
    lastMessage: "not possible",
  },
];

export const messages = [
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 1,
    chatId: 2,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 2,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 1,
    chatId: 2,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 2,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 1,
    chatId: 2,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 2,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 2,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 1,
    chatId: 2,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hii buddy ! How are you ?",
    senderId: 2,
    chatId: 1,
    attachments: "",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 1,
    chatId: 3,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 3,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
  {
    _id: 1,
    content: "Hi how are you",
    senderId: 3,
    chatId: 1,
    attachments: "",
    timeStamp: "12:00 PM",
  },
];

export const requests = [
  {
    _id: "",
    receiver: "username",
    senderId: { username: "", avatar: "" },
    status: "pending",
  },
];
