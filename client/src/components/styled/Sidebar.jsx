import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { updateChatId } from "../../redux/UserSlice";
import { useState } from "react";
import { messages } from "../../constants/sampleData";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showCurrentChat = (chatId) => {
    dispatch(updateChatId(chatId));
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredFriends = allUsers.filter(
    (u) =>
      user.friends.includes(u._id) &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchFriend = (friendId) => {
    const friendChatId = userChats.find(
      (chat) => chat.members.includes(friendId) && !chat.groupChat
    )?._id;
    showCurrentChat(friendChatId);
    navigate(`/chat/${friendId}`);
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
      <SearchInput
        placeholder="Search or start new chat"
        onChange={handleSearchChange}
        value={searchQuery}
      />

      <Stack sx={{ overflow: "scroll" }}>
        {searchQuery
          ? filteredFriends.map(({ _id, avatar, name }) => (
              <Box
                key={_id}
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
                onClick={() => searchFriend(_id)}
              >
                <Avatar
                  src={avatar}
                  alt={name}
                  sx={{ width: "50px", height: "50px" }}
                />
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <h2>{name}</h2>
                </div>
              </Box>
            ))
          : userChats.map(({ lastMessage, _id, members, groupChat }) => {
              let avatarUrl = "";
              let displayName = "";

              if (groupChat) {
                avatarUrl = groupChat.avatar;
                displayName = groupChat.name;
              } else {
                avatarUrl =
                  user._id == members[0]
                    ? allUsers.find((user) => user._id == members[1]).avatar
                    : allUsers.find((user) => user._id == members[0]).avatar;
                displayName =
                  user._id == members[0]
                    ? allUsers.find((user) => user._id == members[1]).name
                    : allUsers.find((user) => user._id == members[0]).name;
              }
              if (!messages.find((message) => message.chatId == _id)) {
                return;
              }
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
                      src={avatarUrl}
                      alt={displayName}
                      sx={{ width: "50px", height: "50px" }}
                    />
                    <div
                      style={{
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <h2>{displayName}</h2>

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
