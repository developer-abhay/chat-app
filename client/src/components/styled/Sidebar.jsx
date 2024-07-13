import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { updateChatId } from "../../redux/UserSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);

  const dispatch = useDispatch();

  const showCurrentChat = (chatId) => {
    dispatch(updateChatId(chatId));
  };
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
      <SearchInput placeholder="Search or start new chat" />

      <Stack sx={{ overflow: "scroll" }}>
        {userChats.map(({ lastMessage, _id, members, groupChat }) => {
          return (
            <Link
              key={_id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/chat/${_id}`}
              onClick={() => showCurrentChat(_id)}
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
                  src={
                    groupChat ? groupChat.avatar : ""
                    // : user._id == members[0]
                    // ? Users.find((user) => user._id == members[1]).avatar
                    // : Users.find((user) => user._id == members[0]).avatar
                  }
                  alt="Username"
                  sx={{ width: "50px", height: "50px" }}
                />
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <h2>
                    {
                      groupChat ? groupChat.name : ""
                      // : user._id == members[0]
                      // ? Users.find((user) => user._id == members[1]).name
                      // : Users.find((user) => user._id == members[0]).name
                    }
                  </h2>

                  <Typography
                    sx={{
                      textWrap: "nowrap",
                    }}
                  >
                    {lastMessage.length > 25
                      ? `${lastMessage.substring(0, 24)}...`
                      : lastMessage}
                  </Typography>
                </div>
              </Box>
            </Link>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Sidebar;
