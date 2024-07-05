import "./Sidebar.css";
import { Avatar, Box, Container, IconButton, TextField } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
const Sidebar = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "0.35",
        borderRight: "1px solid #fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "39px",
          padding: "10px",
          backgroundColor: "#f6f6f6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f6f6f6",
            width: "100%",
            height: "35px",
            borderRadius: "20px",
          }}
        >
          <SearchIcon />
          <TextField
            sx={{
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
            }}
            type="text"
            placeholder="Search or start new chat"
          />
        </Box>
      </Box>

      <Box className="sidebar-chats">
        <h1>Add a new Chat</h1>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </Box>
    </Container>
  );
};

export default Sidebar;
