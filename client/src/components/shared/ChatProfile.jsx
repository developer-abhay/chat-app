import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
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
import { leaveGroupAPI } from "../../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatProfile = ({
  open,
  onClose,
  currentChat,
  allUsers,
  userId,
  chatId,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [isGroup, setIsGroup] = useState(false);
  const [members, setMembers] = useState([]);
  const [friend, setFriend] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tabs
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const leaveGroup = async () => {
    await leaveGroupAPI(userId, chatId, dispatch);
    onClose();
    navigate("/");
  };

  useEffect(() => {
    // if group chat , setting all necessary states
    if (currentChat?.groupChat) {
      setIsGroup(true);
      const membersArray = currentChat?.members?.map((member) =>
        allUsers.find((user) => user._id == member)
      );
      setGroupDescription(currentChat.groupChat.description);
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
  }, [currentChat]);

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
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onClick={() => {
              isAdmin
                ? console.log("hello")
                : setErrorMsg("Only Admins can edit");
              setTimeout(() => {
                setErrorMsg("");
              }, 1500);
            }}
          >
            <Avatar
              src={isGroup ? currentChat?.groupChat?.avatar : friend?.avatar}
              sx={{ width: 72, height: 72 }}
            />
            {hovered && (
              <div
                style={{
                  position: " absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "100%",
                  backgroundColor: "black",
                  opacity: "0.7",
                  top: 0,
                  left: 0,
                }}
              >
                <CreateIcon sx={{ margin: "auto", color: "white" }} />
              </div>
            )}
          </div>
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

          {isGroup ? (
            <TextField
              sx={{ width: "100%" }}
              autoComplete="off"
              value={groupDescription}
              onChange={(e) => {
                isAdmin
                  ? setGroupDescription(e.target.value)
                  : setErrorMsg("Only Admins can edit");
                setTimeout(() => {
                  setErrorMsg("");
                }, 1500);
              }}
              variant="standard"
              placeholder={isGroup ? "Description" : "Bio"}
            />
          ) : (
            <Typography>{friend?.bio}</Typography>
          )}

          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            color="error"
            onClick={leaveGroup}
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

function UserItem({ _id, name, avatar, username, isAdmin, currentChat }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const makeAdmin = () => {
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
        <MenuItem onClick={handleClose}>Remove {name.split(" ")[0]}</MenuItem>
        <MenuItem onClick={makeAdmin}>Make Admin</MenuItem>
      </Menu>
    </div>
  );
}
