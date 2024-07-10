export const Users = [
  {
    _id: 1,
    username: "abhay12",
    name: "Abhay Sharma",
    avatar:
      "https://play-lh.googleusercontent.com/HHJb4ew7S16SHjqNjp1nEkVKn8L2j1rXPjVmF4fqf-mGjZYYIjhHYKjUJSLbB7SRx1HS=w240-h480-rw",
    bio: "Hi I am here",
    password: "123",
    joinedAt: "15 April 2003",
  },
  {
    _id: 2,
    username: "hachicko",
    name: "Surojit",
    avatar:
      "https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg",
    bio: "Using react",
    password: "1234",
    joinedAt: "10 june 2023",
  },
  {
    _id: 3,
    username: "zinxg",
    name: "Alok",
    avatar: "",
    bio: "World is cruel",
    password: "12345",
    joinedAt: "1 jan 2022",
  },
];

export const Chats = [
  {
    _id: 1,
    members: ["1", "2"],
    groupChat: null,
    lastMessage: "kya kr rha h ?",
  },
  { _id: 2, members: ["2", "3"], groupChat: null, lastMessage: "Whats up" },
  {
    _id: 3,
    members: ["1", "3"],
    groupChat: null,
    lastMessage: "i will ask him",
  },
  {
    _id: 4,
    members: ["1", "2", "3"],
    groupChat: { name: "Warriors", avatar: "", creator: "2" },
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
];

export const requests = [
  {
    _id: "",
    receiver: "username",
    senderId: { username: "", avatar: "" },
    status: "pending",
  },
];
