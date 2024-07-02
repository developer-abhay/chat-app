import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import "./ChatScreen.css";

const ChatScreen = () => {
  return (
    <div className="chat">
      {/* Chat Header */}
      <div className="chat-header">
        <Avatar src="" alt="User-profile" />
        <div className="chat-profile-info">
          <h3>Name is This</h3>
          <p>Last seen Fri,04 Sep 2020 18:00:16 GMT</p>
        </div>
        <div className="chat-header-options">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* Chat Screen */}
      <div className="chat-body">
        <div className="chat-received">
          <p className="text">Hello</p>
          <p className="time">Jan 26 2023, 12:02 am GMT</p>
        </div>
        <div className="chat-sent">
          <p className="text">Hello how are you ? </p>
          <p className="time">Jan 26 2023, 12:02 am GMT</p>
        </div>
        <div className="chat-received">
          <p className="text">Hello</p>
          <p className="time">Jan 26 2023, 12:02 am GMT</p>
        </div>
        <div className="chat-sent">
          <p className="text">Hello how are you ? </p>
          <p className="time">Jan 26 2023, 12:02 am GMT</p>
        </div>
        <div className="chat-sent">
          <p className="text">
            Hello how are you ? dvsd dsvdv dsvjnsdkjvnsodxvnoj{" "}
          </p>
          <p className="time">Jan 26 2023, 12:02 am GMT</p>
        </div>
      </div>
      {/* Chat Input */}
      <div className="chat-input-container">
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <input type="text" placeholder="Type a message" />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatScreen;
