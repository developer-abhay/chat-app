import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import CreateIcon from "@mui/icons-material/Create";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getSocket } from "../../lib/socket";
import {
  fetchAllChats,
  leaveGroupAPI,
  unfriendAPI,
  updateGroupAvatarAPI,
} from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "../styled/StyledComponents";

const ChatProfile = ({
  open,
  onClose,
  currentChat,
  allUsers,
  userId,
  chatId,
}) => {
  const userChats = useSelector((state) => state.chats);

  const [tabValue, setTabValue] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isGroup, setIsGroup] = useState(false);
  const [members, setMembers] = useState([]);
  const [groupAvatar, setGroupAvatar] = useState();
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [friend, setFriend] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Update group Avatar
  const updateGroupAvatar = (e) => {
    setAvatarLoading(true);
    setGroupAvatar(e.target.files[0]);
  };

  // Tabs
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const leaveGroup = async () => {
    await leaveGroupAPI(userId, chatId, dispatch);
    onClose();
    navigate("/");
  };

  const unfriend = () => {
    unfriendAPI(userId, friend._id, dispatch);
    onClose();
    navigate("/");
  };

  useEffect(() => {
    if (groupAvatar) {
      const updateGroupForm = new FormData();
      updateGroupForm.append("userId", userId);
      updateGroupForm.append("chatId", chatId);
      updateGroupForm.append("groupAvatar", groupAvatar);

      updateGroupAvatarAPI(updateGroupForm, setAvatarLoading, dispatch);
    }
  }, [groupAvatar]);

  useEffect(() => {
    // if group chat , setting all necessary states
    if (currentChat?.groupChat) {
      setIsGroup(true);
      const membersArray = currentChat?.members?.map((member) =>
        allUsers.find((user) => user._id == member)
      );
      setMembers(membersArray);
      setIsAdmin(currentChat.groupChat.admins.includes(userId));
    }
    // if one to one chat , setting all necessary states
    else if (currentChat) {
      const membersArray = currentChat?.members?.map((member) =>
        allUsers.find((user) => user._id == member && user._id != userId)
      );
      membersArray?.[0]
        ? setFriend(membersArray?.[0])
        : setFriend(membersArray?.[1]);
      setIsGroup(false);
      setMembers([]);
    }
  }, [currentChat, userChats]);

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{
        "&.MuiDrawer-root .MuiDrawer-paper": {
          mt: "70px",
          mx: { xs: "auto", sm: 0 },
          ml: { sm: "45vw", md: "35vw", lg: "28vw" },
          borderRadius: 1,
          height: "fit-content",
          width: { xs: "95%", sm: "fit-content" },
          minWidth: "300px",
        },
      }}
      keepMounted
    >
      {isGroup && <BasicTabs handleChange={handleChange} value={tabValue} />}

      <CustomTabPanel value={tabValue} index={0}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {isGroup && (
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              onClick={() => {
                isAdmin ? "" : setErrorMsg("Only Admins can edit");
                setTimeout(() => {
                  setErrorMsg("");
                }, 1500);
              }}
            >
              <Avatar
                src={currentChat?.groupChat?.avatar}
                sx={{ width: 72, height: 72 }}
              />
              {(hovered || avatarLoading) && (
                <>
                  <IconButton
                    sx={{
                      position: " absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                      top: 0,
                      left: 0,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.4)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                    }}
                    component="label"
                  >
                    {hovered ? (
                      <CreateIcon sx={{ margin: "auto", color: "white" }} />
                    ) : (
                      <CircularProgress
                        sx={{ position: " absolute" }}
                        color="inherit"
                        size={20}
                      />
                    )}
                    {isAdmin && (
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          updateGroupAvatar(e);
                        }}
                      />
                    )}
                  </IconButton>
                </>
              )}
            </div>
          )}
          {!isGroup && (
            <Avatar src={friend?.avatar} sx={{ width: 72, height: 72 }} />
          )}
          <Typography variant="h5" sx={{ fontWeight: "600", mt: -1 }}>
            {isGroup ? currentChat?.groupChat?.name : friend?.name}
          </Typography>
          <Typography
            sx={{
              mt: -2,
              fontSize: "14px",
              color: "#aaa",
            }}
          >
            {isGroup ? (
              <>
                Created by
                <span style={{ fontWeight: "600" }}>
                  {" "}
                  :{" "}
                  {
                    allUsers.find(
                      ({ _id }) => _id == currentChat?.groupChat?.creator
                    )?.name
                  }
                </span>
              </>
            ) : (
              `@${friend?.username}`
            )}
          </Typography>
          {errorMsg && (
            <Typography variant="caption" color="error">
              {errorMsg}
            </Typography>
          )}

          {isGroup ? "" : <Typography>{friend?.bio}</Typography>}

          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            color="error"
            onClick={() => (isGroup ? leaveGroup() : unfriend())}
          >
            {isGroup ? "Leave Group" : "Unfriend"}
          </Button>
        </Box>
      </CustomTabPanel>

      {isGroup && (
        <CustomTabPanel value={tabValue} index={1}>
          {isGroup &&
            members?.map(({ _id, name, avatar, username }) => (
              <UserItem
                key={_id}
                _id={_id}
                name={name}
                avatar={avatar}
                username={username}
                isAdmin={isAdmin}
                userId={userId}
                currentChat={currentChat}
              />
            ))}
        </CustomTabPanel>
      )}
    </Drawer>
  );
};

export default ChatProfile;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ handleChange, value }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Members" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}

//

function UserItem({
  _id,
  name,
  avatar,
  username,
  isAdmin,
  userId,
  currentChat,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const makeAdmin = async () => {
    const socket = getSocket();
    socket.emit("makeAdmin", { memberId: _id, chatId: currentChat._id });
    await fetchAllChats(userId, dispatch);
    handleClose();
  };

  const removeFromGroup = async () => {
    const socket = getSocket();
    socket.emit("removeMember", { memberId: _id, chatId: currentChat._id });
    await fetchAllChats(userId, dispatch);
    handleClose();
  };

  return (
    <div>
      <Box
        sx={{
          ":hover": { backgroundColor: "#eee" },
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "10px",
        }}
        onClick={(e) => (isAdmin ? handleClick(e) : "")}
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
          <h3>{name}</h3>
          <p>@{username}</p>
        </div>

        {currentChat?.groupChat?.admins?.includes(_id) && (
          <Typography variant="caption" color="success">
            Admin
          </Typography>
        )}
      </Box>
      {userId !== _id && (
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <>
            <MenuItem onClick={removeFromGroup}>
              Remove {name.split(" ")[0]}
            </MenuItem>
            {!currentChat?.groupChat?.admins?.includes(_id) && (
              <MenuItem onClick={makeAdmin}>Make Admin</MenuItem>
            )}
          </>
        </Menu>
      )}
    </div>
  );
}
