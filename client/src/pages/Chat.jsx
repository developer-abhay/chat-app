import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AppLayout from "../components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { getChatMessages } from "../api/api";

import { getSocket } from "../lib/socket";
import { getChats } from "../redux/UserSlice";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import ChatProfile from "../components/shared/ChatProfile";
import { VisuallyHiddenInput } from "../components/styled/StyledComponents";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);
  const chatId = useSelector((state) => state.chatId);

  const [currentChat, setCurrentChat] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [isAttachment, setIsAttachment] = useState(false);
  const [attachedFile, setAttachedFile] = useState();
  const [attachmentLoader, setAttachmentLoader] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [chatProfileOpen, setChatProfileOpen] = useState(false);

  const dispatch = useDispatch();

  const fetchMessages = async () => {
    const allMessages = await getChatMessages(chatId);
    setChatMessages(allMessages);
  };

  //Send Message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const socket = getSocket();

    if (!isAttachment) {
      // send text message
      if (typedMessage.trim()) {
        const msgObj = {
          chatId,
          senderId: user._id,
          content: typedMessage,
          timeStamp: new Date().toISOString(),
        };
        socket.emit("message", msgObj);
        const updatedChats = userChats.map((chat) =>
          chat._id == chatId
            ? {
                ...chat,
                lastMessage: {
                  content: typedMessage,
                  timeStamp: new Date().toISOString(),
                },
              }
            : chat
        );
        dispatch(getChats(updatedChats));
        setChatMessages((prev) => [...prev, msgObj]);
        setTypedMessage("");
      }
    }
    //Send attachment
    else {
      setAttachmentLoader(true);
      const attachmentForm = new FormData();
      attachmentForm.append("chatId", chatId);
      attachmentForm.append("senderId", user._id);
      attachmentForm.append("attachment", attachedFile);
      attachmentForm.append("timeStamp", new Date().toISOString());

      try {
        const config = {
          method: "post",
          withCredentials: true,
          body: attachmentForm,
        };

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/message/attachment`,
          config
        );

        const data = await response.json();

        setAttachedFile();
        setIsAttachment(false);
        setAttachmentLoader(false);

        // Emit a socket event with the file information
        socket.emit("attachment", { ...data, chatId });
        setChatMessages((prev) => [...prev, data.message]);

        const updatedChats = userChats.map((chat) =>
          chat._id == chatId
            ? {
                ...chat,
                lastMessage: {
                  content: data.lastMessage,
                  timeStamp: data.message.timeStamp,
                },
              }
            : chat
        );
        dispatch(getChats(updatedChats));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Send Attachments
  const fileInputRef = useRef(null);

  const cancelAttachment = () => {
    setIsAttachment(false);
    setAttachedFile();
  };

  const handleAttachFile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAttachFileClose = () => {
    setAnchorEl(null);
  };

  const handleFileClick = (accept) => {
    fileInputRef.current.accept = accept;
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTypedMessage("");
      setIsAttachment(true);
      setAttachedFile(file);
      handleAttachFileClose();
    }
  };

  useEffect(() => {
    const socket = getSocket();

    if (chatId) {
      fetchMessages();
      setCurrentChat(userChats.find((chat) => chat._id == chatId));

      socket.emit("join-chat", chatId);
      socket.on("messageResponse", ({ data, lastMessage }) => {
        const updatedChats = userChats.map((chat) =>
          chat._id == chatId ? { ...chat, lastMessage } : chat
        );
        dispatch(getChats(updatedChats));
        setChatMessages((prev) => [...prev, data]);
      });
      return () => {
        socket.emit("leave-chat", chatId);
        console.log("message event closed");
        socket.off("messageResponse");
      };
    }
  }, [chatId, userChats]);

  useEffect(() => {
    const chatBox = document.getElementById("messageBody");
    chatBox.scrollTop = chatBox.scrollHeight;
  }, [chatMessages]);

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chat Profile */}
      <ChatProfile
        open={chatProfileOpen}
        onClose={() => setChatProfileOpen(false)}
        currentChat={currentChat}
        allUsers={allUsers}
        userId={user?._id}
        chatId={chatId}
      />
      {/* Chat Header */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Link to={"/"}>
          <IconButton
            sx={{
              transition: "all 0.1s ease",
              ":hover": { backgroundColor: "#eee" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Link>

        <Avatar
          onClick={() => {
            setChatProfileOpen(true);
          }}
          src={
            currentChat?.groupChat
              ? currentChat.groupChat.avatar
              : user._id == currentChat?.members?.[0]
              ? allUsers.find(({ _id }) => _id == currentChat?.members?.[1])
                  ?.avatar
              : allUsers.find(({ _id }) => _id == currentChat?.members?.[0])
                  ?.avatar
          }
          alt="User-profile"
          sx={{
            ml: 1,
            width: 52,
            height: 52,
            mr: 2,
            ":hover": { cursor: "pointer" },
          }}
        />
        <div style={{ flex: 1 }}>
          <Typography
            variant="h5"
            onClick={() => {
              setChatProfileOpen(true);
            }}
            sx={{
              width: "fit-content",
              fontWeight: 600,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {currentChat?.groupChat
              ? currentChat.groupChat.name
              : user._id == currentChat?.members?.[0]
              ? allUsers.find(({ _id }) => _id == currentChat?.members?.[1])
                  ?.name
              : allUsers.find(({ _id }) => _id == currentChat?.members?.[0])
                  ?.name}
          </Typography>
          <p style={{ color: "gray" }}>
            {currentChat?.groupChat
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
        {chatMessages.map(
          ({ content, timeStamp, senderId, attachment }, index) => (
            <ChatText
              key={index}
              text={content}
              attachment={attachment}
              timeStamp={timeStamp}
              userId={user._id}
              senderId={senderId}
              allUsers={allUsers}
              isGroup={Boolean(currentChat.groupChat)}
            />
          )
        )}
      </Box>
      {/* Chat Input */}
      <form onSubmit={sendMessage}>
        <Box
          sx={{
            backgroundColor: "lightgray",
            display: "flex",
            alignItems: "center",
          }}
        >
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
            <MenuItem
              onClick={() => handleFileClick("image/*")}
              sx={{ gap: 1 }}
            >
              <ImageIcon />
              Image
            </MenuItem>
            <MenuItem
              onClick={() => handleFileClick("video/*")}
              sx={{ gap: 1 }}
            >
              <VideocamIcon />
              Video
            </MenuItem>
            <MenuItem
              onClick={() => handleFileClick("audio/*")}
              sx={{ gap: 1 }}
            >
              {" "}
              <MicIcon />
              Audio
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleFileClick(
                  "application/pdf, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint"
                )
              }
              sx={{ gap: 1 }}
            >
              {" "}
              <DescriptionIcon />
              Docs
            </MenuItem>
            <VisuallyHiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Menu>
          <IconButton>
            <SentimentVerySatisfiedIcon />
          </IconButton>
          {isAttachment && (
            <Box
              sx={{
                width: " 100%",
                height: "56px",
                mt: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#eee",
                  width: "fit-content",
                  p: 1,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <p>{attachedFile.name}</p>
                <CancelIcon
                  onClick={cancelAttachment}
                  sx={{
                    color: "#555",
                    cursor: "pointer",
                    ":hover": { color: "#222" },
                  }}
                />
              </Box>
            </Box>
          )}
          {!isAttachment && (
            <TextField
              multiline
              autoComplete="off"
              type="input"
              placeholder="Type a message"
              sx={{
                "& fieldset": { border: "none" },
                width: " 100%",
                outline: "none",
                border: "none",
                maxHeight: "90px",
                overflow: "scroll",

                mt: 1,
              }}
              value={typedMessage}
              onChange={(e) => {
                setTypedMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          )}

          {attachmentLoader ? (
            <div style={{ width: "50px" }}>
              <CircularProgress size={20} />
            </div>
          ) : (
            <Button type="submit">
              <SendIcon />
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default AppLayout()(Chat);

const ChatText = ({
  text,
  attachment,
  timeStamp,
  senderId,
  userId,
  isGroup,
  allUsers,
}) => {
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
  }, []);

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
          borderRadius: "10px",
          padding: attachment ? "5px 5px 0px 5px" : "5px 12px",
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
        {attachment && attachment?.type?.split("/")[0] == "image" && (
          <img
            style={{
              maxHeight: "180px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            src={attachment.url}
          />
        )}
        {attachment && attachment?.type?.split("/")[0] == "video" && (
          <video
            src={
              "https://res.cloudinary.com/dwo5iefqt/video/upload/v1722522990/ngq4mjqs4gt4q7teauoc.mp4"
            }
            type="video/mp4"
            style={{
              maxHeight: "180px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            autoplay
            controls
            muted
          ></video>
        )}
        {attachment && attachment?.type?.split("/")[0] == "application" && (
          <MuiLink
            href={attachment.url}
            target="_blank"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#222",
              pb: "5px",
              ":hover": { color: "#000" },
            }}
          >
            <InsertDriveFileIcon /> Doc
          </MuiLink>
        )}
        {text && <p>{text}</p>}
      </div>
      <p style={{ fontSize: " 9px", color: "gray", padding: "0px 2px" }}>
        {formatDate(timeStamp)}
      </p>
    </div>
  );
};
