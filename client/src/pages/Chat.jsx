import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

import { format } from "date-fns";
import {
  getChatMessages,
  // sendChatMessages
} from "../api/api";

import { socket } from "../App";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);
  const chatId = useSelector((state) => state.chatId);

  const [currentChat, setCurrentChat] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAttachFile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAttachFileClose = () => {
    setAnchorEl(null);
  };

  const fetchMessages = async () => {
    const allMessages = await getChatMessages(chatId);
    setChatMessages(allMessages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (typedMessage.trim()) {
      const msgObj = {
        chatId,
        senderId: user._id,
        content: typedMessage,
        timeStamp: new Date().toDateString(),
      };
      socket.emit("message", msgObj);
      setChatMessages((prev) => [...prev, msgObj]);
      setTypedMessage("");
    }
  };

  useEffect(() => {
    setCurrentChat(userChats.find((chat) => chat._id == chatId));
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const chatBox = document.getElementById("messageBody");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, [chatMessages]);

  useEffect(() => {
    socket.emit("join-chat", chatId);
  }, [chatId]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("messageResponse");
    };
  }, [socket]);

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
          src={
            currentChat.groupChat
              ? currentChat.groupChat.avatar
              : user._id == currentChat?.members?.[0]
              ? allUsers.find(({ _id }) => _id == currentChat?.members?.[1])
                  ?.avatar
              : allUsers.find(({ _id }) => _id == currentChat?.members?.[0])
                  ?.avatar
          }
          alt="User-profile"
          sx={{ width: 52, height: 52, mr: 2 }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "-5px", fontWeight: 600 }}>
            {currentChat.groupChat
              ? currentChat.groupChat.name
              : user._id == currentChat?.members?.[0]
              ? allUsers.find(({ _id }) => _id == currentChat?.members?.[1])
                  ?.name
              : allUsers.find(({ _id }) => _id == currentChat?.members?.[0])
                  ?.name}
          </h3>
          <p style={{ color: "gray" }}>
            {currentChat.groupChat
              ? `Created by
            ${
              allUsers.find(({ _id }) => _id == currentChat.groupChat.creator)
                .name
            }
             `
              : ""}
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
        {chatMessages.map(({ content, timeStamp, senderId }, index) => (
          <ChatText
            key={index}
            text={content}
            timeStamp={timeStamp}
            userId={user._id}
            senderId={senderId}
            allUsers={allUsers}
            isGroup={Boolean(currentChat.groupChat)}
          />
        ))}
      </Box>
      {/* Chat Input */}
      <form onSubmit={sendMessage}>
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
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          <Button type="submit">
            <SendIcon />
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AppLayout()(Chat);

const ChatText = ({ text, timeStamp, senderId, userId, isGroup, allUsers }) => {
  const sent = senderId == userId;
  const [senderName, setSenderName] = useState("");
  const [senderColor, setSenderColor] = useState("");

  const colors = ["red", "green", "black", "purple", "orange", "teal"];

  const formatDate = (date) => {
    return format(date, "dd MMMM HH:mm");
  };

  useEffect(() => {
    if (isGroup && !sent) {
      const senderIndex = allUsers.findIndex((user) => user._id === senderId);
      setSenderName(allUsers.find(({ _id }) => _id == senderId).username);
      setSenderColor(colors[senderIndex % colors.length]);
    }
  });

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
      <div
        style={{
          maxWidth: "80%",
          fontSize: "14px",
          width: "fit-content",
          borderRadius: "12px",
          padding: "5px 12px",
          backgroundColor: sent ? "#F7A4A4" : "lightgray",
          borderTopLeftRadius: sent ? "10px" : "0px",
          borderTopRightRadius: sent ? "0px" : "10px",
          float: "right",
        }}
      >
        {!sent && isGroup && (
          <p
            style={{
              fontSize: "10px",
              margin: "2px auto",
              fontWeight: "bold",
              color: senderColor,
              letterSpacing: "0.5px",
            }}
          >
            {senderName}
          </p>
        )}
        <p>{text}</p>
      </div>
      <p style={{ fontSize: " 9px", color: "gray", padding: "0px 2px" }}>
        {formatDate(timeStamp)}
      </p>
    </div>
  );
};
