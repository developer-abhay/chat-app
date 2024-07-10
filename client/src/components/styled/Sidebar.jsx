import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import { Chats, Users } from "../../constants/sampleData";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
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
        {Chats.map(({ lastMessage, _id, members, groupChat }) => {
          console.log(user._id == members[0]);
          return (
            <Link
              key={_id}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/chat/${_id}`}
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
                  <h2>
                    {groupChat
                      ? groupChat.name
                      : user._id == members[0]
                      ? Users[members[1]]?.name
                      : Users[members[0]].name}
                  </h2>
                  {/* <h2>
                  {groupChat
                    ? groupChat.name
                    : user._id == members["0"]
                    ? Users[0].name
                    : "2"}
                </h2> */}
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
