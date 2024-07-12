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
  sendFriendRequest,
} from "../../api/api";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarDialogComponent({
  user,
  Icon,
  text,
  myNotifications,
  setMyNotifications,
}) {
  const allUsers = useSelector((state) => state.allUsers);
  const requests = useSelector((state) => state.requests);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      {/* {text == "Create Group" && (
        <CreateGroupDialog
          open={open}
          onClose={handleClose}
          allUsers={allUsers}
        />
      )} */}
      {text == "Notifications" && (
        <NotificationDialog
          myNotifications={myNotifications}
          setMyNotifications={setMyNotifications}
          open={open}
          onClose={handleClose}
          user={user}
          allUsers={allUsers}
          requests={requests}
        />
      )}
    </>
  );
}

// Add friend Dialog
function AddFriendDialog({ user, onClose, open, allUsers, requests }) {
  const dispatch = useDispatch();
  const sendRequest = (receiverId) => {
    sendFriendRequest(user._id, receiverId, dispatch);
  };
  const cancelRequest = (receiverId) => {
    cancelFriendRequest(user._id, receiverId, dispatch);
  };
  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <Box sx={{ p: 2 }}>
        <SearchInput placeholder="Search Friends" />
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "400px",
          }}
        >
          {allUsers.length > 0 &&
            allUsers.map(({ _id, avatar, username }) => {
              const request = Boolean(
                requests?.find(({ receiverId }) => receiverId == _id)
              );

              if (user._id == _id || user.friends.includes(_id)) return;

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
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Dialog>
  );
}

// Create New group Dialog
// function CreateGroupDialog({ onClose, open, allUsers }) {
//   return (
//     <Dialog maxWidth="md" onClose={onClose} open={open}>
//       <Box sx={{ p: 2, px: 3 }}>
//         <DialogTitle sx={{ textAlign: "center", py: 0 }}>
//           Create New Group
//         </DialogTitle>
//         <TextField
//           sx={{ pt: 1, pb: 2 }}
//           type="text"
//           size="small"
//           placeholder="Enter group name"
//         />
//         <Typography>Add Members</Typography>
//         <List
//           sx={{
//             overflow: "scroll",
//             maxHeight: "280px",
//           }}
//         >
//           {allUsers.map(({ avatar, username }) => (
//             <ListItem disableGutters key={username}>
//               <ListItemAvatar>
//                 <Avatar
//                   src={avatar}
//                   sx={{ bgcolor: blue[100], color: blue[600] }}
//                 >
//                   <PersonIcon />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={username} />

//               <IconButton
//                 sx={{
//                   backgroundColor: "#eee",
//                   ":hover": { backgroundColor: "#ddd" },
//                 }}
//               >
//                 {/* {request ? <RemoveIcon /> : <AddIcon />} */}
//                 <AddIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//         <Stack
//           direction="row"
//           sx={{ mt: 3, gap: 4, justifyContent: "space-between" }}
//         >
//           <Button variant="outlined" color="error">
//             Cancel
//           </Button>
//           <Button variant="contained">Create</Button>
//         </Stack>
//       </Box>
//     </Dialog>
//   );
// }

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
  const acceptRequest = (senderId) => {
    acceptFriendRequest(senderId, user._id, dispatch);
  };

  const rejectRequest = (senderId) => {
    cancelFriendRequest(senderId, user._id, dispatch);
  };

  useEffect(() => {
    const notifyArray = requests.filter(
      ({ receiverId }) => user._id == receiverId
    );
    setMyNotifications(notifyArray);
  }, [requests]);

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <Box sx={{ p: 3 }}>
        <DialogTitle sx={{ textAlign: "center", py: 0 }}>
          {myNotifications.length == 0 ? "No Requests" : "Accept Requests"}
        </DialogTitle>

        {myNotifications.length != 0 && (
          <List
            sx={{
              overflow: "scroll",
              maxHeight: "280px",
            }}
          >
            {allUsers.map(({ _id, avatar, username }) => {
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
