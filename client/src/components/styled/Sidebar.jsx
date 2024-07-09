import {
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const chatList = [
  { name: "Abhay", text: "how r u?", chatId: "123456" },
  { name: "Chhillar", text: "kal krdunga", chatId: "24545" },
  { name: "Sukhu", text: "ek baat bta", chatId: "12345dfvbdf6" },
  { name: "Sukhu", text: "ek baat bta", chatId: "1233r23vsd456" },
  { name: "baby", text: "ok", chatId: "1234dsvsdv56" },
  { name: "Nice bro", text: "have you completed it?", chatId: "1234dsvsdv56" },
  {
    name: "Nice bro",
    text: "have you completed it? kjsdnvkjsdnvjndvsoj",
    chatId: "1234dsvsdv56",
  },
  { name: "Nice bro", text: "have you completed it?", chatId: "1234dsvsdv56" },
  { name: "Nice bro", text: "have you completed it?", chatId: "1234dsvsdv56" },
  { name: "baby", text: "ok", chatId: "1234dsvsdv56" },
  { name: "Sukhu", text: "ek baat bta", chatId: "1234dsvsdv56" },
];

const Sidebar = () => {
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #fff",
        backgroundColor: "#ddd",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f6f6f6",
          width: "100%",
          height: "40px",
          borderRadius: "20px",
          mb: 1,
          p: 2,
        }}
      >
        <SearchIcon />
        <TextField
          size="small"
          sx={{
            "& fieldset": { border: "none" },
            background: "transparent",
            width: "100%",
          }}
          type="text"
          placeholder="Search or start new chat"
        />
      </Box>

      <Stack sx={{ overflow: "scroll" }}>
        {chatList.map(({ name, text, chatId }, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/chat/${chatId}`}
          >
            <Box
              sx={{
                ":hover": { backgroundColor: "#fff" },
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                cursor: "pointer",

                borderRadius: "10px",
              }}
            >
              <Avatar
                src=""
                alt="Username"
                sx={{ width: "50px", height: "50px" }}
              />
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <h2>{name}</h2>
                <Typography
                  sx={{
                    textWrap: "nowrap",
                  }}
                >
                  {text.length > 25 ? `${text.substring(0, 24)}...` : text}
                </Typography>
              </div>
            </Box>
          </Link>
        ))}
      </Stack>
    </Container>
  );
};

export default Sidebar;
