import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { updateChatId } from "../../redux/UserSlice";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getSocket } from "../../lib/socket";
import { fetchAllChats } from "../../api/api";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const userChats = useSelector((state) => state.chats);
  const [searchQuery, setSearchQuery] = useState("");
  const chatId = useSelector((state) => state.chatId);

  const [sortedChats, setSortedChats] = useState(userChats);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (date) => {
    return format(date, "HH:mm");
  };

  const showCurrentChat = (chatId) => {
    dispatch(updateChatId(chatId));
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredFriends = allUsers?.filter(
    (u) =>
      user.friends?.includes(u._id) &&
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchFriend = (friendId) => {
    const friendChatId = userChats.find(
      (chat) => chat.members.includes(friendId) && !chat.groupChat
    )?._id;
    showCurrentChat(friendChatId);
    navigate(`/chat/${friendId}`);
    setSearchQuery("");
  };

  useEffect(() => {
    if (userChats?.length > 0) {
      setSortedChats(
        [...userChats].sort((chat1, chat2) => {
          const dateA = chat1.lastMessage?.timeStamp
            ? new Date(chat1.lastMessage.timeStamp)
            : new Date(0);
          const dateB = chat2.lastMessage?.timeStamp
            ? new Date(chat2.lastMessage.timeStamp)
            : new Date(0);
          return dateB - dateA;
        })
      );
    }
  }, [userChats]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("refetch-chats", async (data) => {
      console.log("event");
      if (data.chatId != chatId) {
        console.log("executed");
        await fetchAllChats(user._id, dispatch);
      }
    });
  }, []);

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
          : sortedChats?.map(({ lastMessage, _id, members, groupChat }) => {
              let avatarUrl = "";
              let displayName = "";
              let active = chatId == _id;

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
              if (!groupChat && !lastMessage?.content) {
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
                      ":hover": { backgroundColor: active ? "#fff" : "#eee" },
                      backgroundColor: active ? "#fff" : "",
                      width: "100%",
                      height: "65px",
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
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Stack direction={"row"} alignItems={"center"}>
                        <Typography
                          style={{
                            flex: "1",
                            fontSize: "24px",
                            fontWeight: "600",
                            lineHeight: "25px",
                          }}
                        >
                          {displayName}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                          {lastMessage?.timeStamp
                            ? formatDate(lastMessage?.timeStamp)
                            : ""}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          textWrap: "nowrap",
                        }}
                      >
                        {lastMessage?.content?.length > 25
                          ? `${lastMessage.content.substring(0, 24)}...`
                          : lastMessage.content}
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
