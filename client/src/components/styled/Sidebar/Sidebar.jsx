import "./Sidebar.css";
import { Avatar, Box, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const chatList = [
  { name: "Abhay", text: "how r u?" },
  { name: "Chhillar", text: "kal krdunga" },
  { name: "Sukhu", text: "ek baat bta" },
  { name: "baby", text: "ok" },
  { name: "Nice bro", text: "have you completed it?" },
];

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

      <Box sx={{ flex: "1", backgroundColor: "#fff", overflow: "scroll" }}>
        {chatList.map(({ name, text }, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "20px",
              cursor: "pointer",
              borderBottom: "1px solid #f6f6f6",
            }}
          >
            <Avatar src="" alt="Username" />
            <div className="sidebar-chat-details">
              <h2>{name}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default Sidebar;
