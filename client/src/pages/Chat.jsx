import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import DescriptionIcon from "@mui/icons-material/Description";

import AppLayout from "../components/layout/AppLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chats, messages } from "../constants/sampleData";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);
  const chatId = useSelector((state) => state.chatId);

  const [currentChat, setCurrentChat] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAttachFile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAttachFileClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const chatBox = document.getElementById("messageBody");
    chatBox.scrollTop = chatBox.scrollHeight;
    setCurrentChat(userChats.find((chat) => chat._id == chatId));
  }, [chatId]);

  useEffect(() => {
    console.log(currentChat);
    //   const members = userChats.find((chat) => chat._id == chatId)?.members;
    //   console.log(members);
    //   const chatSenderId = user._id == members[0] ? members[1] : members[0];
    // } else {
    //   const members = userChats.find((chat) => chat._id == chatId)?.members;
    // }
  }, [currentChat]);

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
          src={currentChat.groupChat ? currentChat.groupChat.avatar : ""}
          alt="User-profile"
          sx={{ width: 52, height: 52, mr: 2 }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ mb: 1, fontWeight: 500 }}>
            {currentChat.groupChat ? currentChat.groupChat.name : ""}
          </h3>
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
        {messages.map(({ content, timeStamp, senderId }, index) => (
          <ChatText
            key={index}
            text={content}
            timeStamp={timeStamp}
            userId={user._id}
            senderId={senderId}
          />
        ))}
      </Box>
      {/* Chat Input */}
      <Box sx={{ backgroundColor: "lightgray", display: "flex" }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleAttachFile}
        >
          <AttachFileIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleAttachFileClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleAttachFileClose} sx={{ gap: 1 }}>
            <ImageIcon />
            Image
          </MenuItem>
          <MenuItem onClick={handleAttachFileClose} sx={{ gap: 1 }}>
            <VideocamIcon />
            Video
          </MenuItem>
          <MenuItem onClick={handleAttachFileClose} sx={{ gap: 1 }}>
            {" "}
            <MicIcon />
            Audio
          </MenuItem>
          <MenuItem onClick={handleAttachFileClose} sx={{ gap: 1 }}>
            {" "}
            <DescriptionIcon />
            Docs
          </MenuItem>
        </Menu>
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <TextField
          autoComplete="off"
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
