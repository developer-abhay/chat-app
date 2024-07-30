import * as React from "react";

import { useState, useEffect } from "react";

import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import SearchInput from "./SearchInput";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  createGroupAPI,
} from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../lib/socket";
import { getRequests, login } from "../../redux/UserSlice";

export default function NavbarDialogComponent({ user, Icon, text }) {
  const allUsers = useSelector((state) => state.allUsers);
  const requests = useSelector((state) => state.requests);
  const [myNotifications, setMyNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // If notification item
  if (Icon.type.propTypes) {
    Icon = React.cloneElement(Icon, {
      badgeContent: myNotifications?.length, // Set the badgeContent directly on the Badge component
    });
  }
  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleClickOpen}>
        <Tooltip title={text}>{Icon}</Tooltip>
      </IconButton>
      {text == "Add Friends" && (
        <AddFriendDialog
          user={user}
          open={open}
          onClose={handleClose}
          allUsers={allUsers}
          requests={requests}
        />
      )}
      {text == "Create Group" && (
        <CreateGroupDialog
          open={open}
          onClose={handleClose}
          allUsers={allUsers}
          user={user}
        />
      )}
      {text == "Notifications" && (
        <NotificationDialog
          open={open}
          onClose={handleClose}
          user={user}
          allUsers={allUsers}
          requests={requests}
          myNotifications={myNotifications}
          setMyNotifications={setMyNotifications}
        />
      )}
    </>
  );
}

// Add friend Dialog
function AddFriendDialog({ user, onClose, open, allUsers, requests }) {
  const socket = getSocket();
  const dispatch = useDispatch();

  const sendRequest = (receiverId) => {
    socket.emit("send-request", { senderId: user._id, receiverId });
    dispatch(
      getRequests([
        ...requests,
        {
          senderId: user._id,
          receiverId,
          status: "pending",
          _id: Math.floor(Math.random() * 10000000000),
        },
      ])
    );
  };

  const cancelRequest = (receiverId) => {
    socket.emit("cancel-request", { senderId: user._id, receiverId });
    dispatch(
      getRequests(
        requests.filter(
          (req) => !(req.senderId == user._id && req.receiverId == receiverId)
        )
      )
    );
  };

  useEffect(() => {
    // Updating friend request list on rejection
    socket.on("rejectFriendRequest", (data) => {
      dispatch(
        getRequests(
          requests.filter(
            (req) =>
              !(
                req.senderId == data.senderId &&
                req.receiverId == data.receiverId
              )
          )
        )
      );
    });
  }, []);

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <Box sx={{ p: 2 }}>
        <SearchInput placeholder="Search People" />
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "400px",
          }}
        >
          {allUsers?.length > 0 &&
            allUsers.map(({ _id, avatar, username }) => {
              if (user._id == _id || user.friends?.includes(_id)) return;

              const request = Boolean(
                requests?.find(({ receiverId }) => receiverId == _id)
              );

              return (
                <ListItem disableGutters key={username}>
                  <ListItemAvatar>
                    <Avatar
                      src={avatar}
                      sx={{ bgcolor: blue[100], color: blue[600] }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={username} />

                  <Tooltip
                    title={`${request ? "Cancel Request" : "Send Request"}`}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: "#eee",
                        ":hover": { backgroundColor: "#ddd" },
                      }}
                      onClick={() =>
                        request ? cancelRequest(_id) : sendRequest(_id)
                      }
                    >
                      {request ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Dialog>
  );
}

// Notifications Dialogue
function NotificationDialog({
  onClose,
  open,
  requests,
  user,
  allUsers,
  myNotifications,
  setMyNotifications,
}) {
  const dispatch = useDispatch();
  const socket = getSocket();

  // Accept Request
  const acceptRequest = (senderId) => {
    socket.emit("accept-request", { senderId, receiverId: user._id });

    const newFriends = [...user.friends, senderId];
    console.log(user);
    dispatch(login({ ...user, friends: newFriends }));
    dispatch(
      getRequests(
        requests.filter(
          (req) => !(req.senderId == senderId && req.receiverId == user._id)
        )
      )
    );
  };

  // Reject Request
  const rejectRequest = (senderId) => {
    socket.emit("reject-request", { senderId, receiverId: user._id });
    dispatch(
      getRequests(
        requests.filter(
          (req) => !(req.senderId == senderId && req.receiverId == user._id)
        )
      )
    );
  };

  useEffect(() => {
    // Listening for incoming friend requests
    socket.on("receiveFriendRequest", (data) => {
      dispatch(getRequests([...requests, data]));
    });

    // removing notifications for cancelled requests
    socket.on("cancelFriendRequest", ({ senderId, receiverId }) => {
      dispatch(
        getRequests(
          requests.filter(
            (req) => !(req.senderId == senderId && req.receiverId == receiverId)
          )
        )
      );
    });

    // Cleanup the listener on component unmount
    return () => {
      socket.off("receiveFriendRequest");
      socket.off("cancelFriendRequest");
    };
  }, []);

  useEffect(() => {
    const notifyArray = requests?.filter(
      ({ receiverId }) => user._id == receiverId
    );
    setMyNotifications(notifyArray);
  }, [requests]);

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <Box sx={{ p: 3 }}>
        <DialogTitle sx={{ textAlign: "center", py: 0 }}>
          {myNotifications?.length == 0 ? "No Requests" : "Accept Requests"}
        </DialogTitle>

        {myNotifications?.length != 0 && (
          <List
            sx={{
              overflow: "scroll",
              maxHeight: "280px",
            }}
          >
            {allUsers?.map(({ _id, avatar, username }) => {
              const notify = Boolean(
                myNotifications.find(({ senderId }) => senderId == _id)
              );

              if (!notify) return;

              return (
                <ListItem disableGutters key={username}>
                  <ListItemAvatar>
                    <Avatar
                      src={avatar}
                      sx={{ bgcolor: blue[100], color: blue[600] }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={username} />

                  <IconButton
                    color="error"
                    sx={{
                      // backgroundColor: "#555",
                      ":hover": { backgroundColor: "#ddd" },
                      ml: 2,
                    }}
                    onClick={() => rejectRequest(_id)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    sx={{
                      // backgroundColor: "#eee",
                      ":hover": { backgroundColor: "#ddd" },
                    }}
                    onClick={() => acceptRequest(_id)}
                  >
                    <DoneIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Dialog>
  );
}

// Create New group Dialog
function CreateGroupDialog({ onClose, open, allUsers, user }) {
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const createGroup = () => {
    if (groupMembers.length < 3) {
      console.log("Group Should have atleast 3 members");
    } else {
      createGroupAPI(user._id, groupName, groupMembers);
    }
  };

  const updateMembers = (addedToGroup, memberId) => {
    if (addedToGroup) {
      setGroupMembers(groupMembers.filter((id) => id !== memberId));
    } else {
      setGroupMembers([...groupMembers, memberId]);
    }
    console.log(groupMembers);
  };

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <Box sx={{ p: 2, px: 3 }}>
        <DialogTitle sx={{ textAlign: "center", py: 0 }}>
          Create New Group
        </DialogTitle>
        <TextField
          sx={{ pt: 1, pb: 2 }}
          type="text"
          size="small"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Typography>Add Members</Typography>
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "280px",
          }}
        >
          {allUsers?.map(({ _id, avatar, username }) => {
            if (user._id == _id || !user.friends?.includes(_id)) return;
            const addedToGroup = groupMembers.includes(_id);
            return (
              <ListItem disableGutters key={username}>
                <ListItemAvatar>
                  <Avatar
                    src={avatar}
                    sx={{ bgcolor: blue[100], color: blue[600] }}
                  >
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={username} />
                <Tooltip title={`${addedToGroup ? "Remove" : "Add Request"}`}>
                  <IconButton
                    sx={{
                      backgroundColor: "#eee",
                      ":hover": { backgroundColor: "#ddd" },
                    }}
                    onClick={() => updateMembers(addedToGroup, _id)}
                  >
                    {addedToGroup ? <RemoveIcon /> : <AddIcon />}
                  </IconButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        <Stack
          direction="row"
          sx={{ mt: 3, gap: 4, justifyContent: "space-between" }}
        >
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={createGroup}>
            Create
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
