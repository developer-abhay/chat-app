const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { route } = require("./routes");
const cookieParser = require("cookie-parser");
// Socket.io
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { Message, Chat } = require("./db");

require("dotenv").config();

const corsOptions = {
  origin: ["https://admin.socket.io", "http://localhost:5173"],
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST", "PUT", "DELETE"],
  // optionSuccessStatus: 200,
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket) => {
  // console.log(`${socket.id} user just connected!`);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("message", async (data) => {
    const { chatId, content, senderId, timeStamp } = data;
    socket.to(chatId).emit("messageResponse", data);

    await Message.create({
      chatId,
      content,
      senderId,
      timeStamp,
    });

    await Chat.findOneAndUpdate({ _id: chatId }, { lastMessage: content });
  });
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/v1", route);

httpServer.listen(process.env.PORT, () =>
  console.log("server is listening at PORT: " + process.env.PORT)
);
