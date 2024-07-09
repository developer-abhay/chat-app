import { Avatar, Box, Container, IconButton, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import AppLayout from "../components/layout/AppLayout";
import { useEffect, useState } from "react";

const messages = [
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "2",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "2",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "2",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "2",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "2",
  },
  {
    text: "Hii buddy ! How are you ?",
    timeStamp: "Jan 26 2023, 12:02 am GMT",
    senderId: "1",
  },
];

const Chat = () => {
  const userId = "1";
  useEffect(() => {
    const chatBox = document.getElementById("messageBody");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, []);
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Avatar
          src=""
          alt="User-profile"
          sx={{ width: 52, height: 52, mr: 2 }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ mb: 1, fontWeight: 500 }}>Chhillar</h3>
          <p style={{ color: "gray" }}>
            Last seen Fri,04 Sep 2020 18:00:16 GMT
          </p>
        </div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* Chat Screen */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          p: 1,
        }}
        id="messageBody"
      >
        {messages.map(({ text, timeStamp, senderId }, index) => (
          <ChatText
            key={index}
            text={text}
            timeStamp={timeStamp}
            userId={userId}
            senderId={senderId}
          />
        ))}
      </Box>
      {/* Chat Input */}
      <Box sx={{ backgroundColor: "lightgray", display: "flex" }}>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <TextField
          type="input"
          placeholder="Type a message"
          sx={{
            "& fieldset": { border: "none" },
            width: " 100%",
            outline: "none",
            border: "none",
          }}
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default AppLayout()(Chat);

const ChatText = ({ text, timeStamp, senderId, userId }) => {
  const [sent, setSent] = useState(senderId == userId);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: sent ? "flex-end" : "flex-start",
        gap: "2px",
        marginTop: "5px",
      }}
    >
      <p
        style={{
          maxWidth: "80%",
          fontSize: "14px",
          width: "fit-content",
          borderRadius: "12px",
          padding: "5px 12px",
          backgroundColor: sent ? "aqua" : "lightgray",
          borderTopLeftRadius: sent ? "10px" : "0px",
          borderTopRightRadius: sent ? "0px" : "10px",
          float: "right",
        }}
      >
        {text}
      </p>
      <p style={{ fontSize: " 9px", color: "gray", padding: "0px 2px" }}>
        {timeStamp}
      </p>
    </div>
  );
};
