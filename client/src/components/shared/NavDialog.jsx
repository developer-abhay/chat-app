import * as React from "react";
import PropTypes from "prop-types";
import {
  Badge,
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
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import SearchInput from "./SearchInput";

// Add friend Dialog
function AddFriendDialog({ onClose, open, allUsers, setAllUsers }) {
  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = (username) => {
    const newUsers = allUsers.map((user) =>
      user.username !== username ? user : { ...user, request: !user.request }
    );
    setAllUsers(newUsers);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <Box sx={{ p: 2 }}>
        <SearchInput placeholder="Search Friends" />
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "400px",
          }}
        >
          {allUsers.map(({ avatar, username, request }) => (
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
                onClick={() => handleListItemClick(username)}
              >
                {request ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

AddFriendDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  allUsers: PropTypes.array.isRequired,
  //   selectedValue: PropTypes.string.isRequired,
};

export function AddFriendDialogBtn({ allUsers, setAllUsers }) {
  const [open, setOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label=""
        color="inherit"
        onClick={handleClickOpen}
      >
        <Tooltip title="Add Friends">
          <AddIcon />
        </Tooltip>
      </IconButton>
      <AddFriendDialog
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
//
//
// Create New group Dialog
function CreateGroupDialog({ onClose, open, allUsers, setAllUsers }) {
  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = (username) => {
    const newUsers = allUsers.map((user) =>
      user.username !== username ? user : { ...user, request: !user.request }
    );
    setAllUsers(newUsers);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <Box sx={{ p: 2, px: 3 }}>
        <DialogTitle sx={{ textAlign: "center", py: 0 }}>
          Create New Group
        </DialogTitle>
        <TextField
          sx={{ pt: 1, pb: 2 }}
          type="text"
          size="small"
          placeholder="Enter group name"
        />
        <Typography>Add Members</Typography>
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "280px",
          }}
        >
          {allUsers.map(({ avatar, username, request }) => (
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
                onClick={() => handleListItemClick(username)}
              >
                {request ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Stack
          direction="row"
          sx={{ mt: 3, gap: 4, justifyContent: "space-between" }}
        >
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained">Create</Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

CreateGroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  allUsers: PropTypes.array.isRequired,
  //   selectedValue: PropTypes.string.isRequired,
};

export function CreateGroupDialogBtn({ allUsers, setAllUsers }) {
  const [open, setOpen] = React.useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label=""
        color="inherit"
        onClick={handleClickOpen}
      >
        <Tooltip title="Create Group">
          <GroupIcon />
        </Tooltip>
      </IconButton>
      <CreateGroupDialog
        // selectedValue={selectedValue}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
//
//
// Notifications Dialogue
function NotificationDialog({ onClose, open, allUsers, setAllUsers }) {
  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = (username) => {
    const newUsers = allUsers.map((user) =>
      user.username !== username ? user : { ...user, request: !user.request }
    );
    setAllUsers(newUsers);
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <Box sx={{ p: 3 }}>
        <DialogTitle sx={{ textAlign: "center", py: 0 }}>
          Accept Requests
        </DialogTitle>
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "280px",
          }}
        >
          {allUsers.map(({ avatar, username, request }) => (
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
                  mr: 1,
                }}
                onClick={() => handleListItemClick(username)}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                color="success"
                sx={{
                  // backgroundColor: "#eee",
                  ":hover": { backgroundColor: "#ddd" },
                }}
                onClick={() => handleListItemClick(username)}
              >
                <DoneIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

NotificationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  allUsers: PropTypes.array.isRequired,
  //   selectedValue: PropTypes.string.isRequired,
};

export function NotificationDialogBtn({ allUsers, setAllUsers }) {
  const [open, setOpen] = React.useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label=""
        color="inherit"
        onClick={handleClickOpen}
      >
        <Tooltip title="Notifications">
          <Badge badgeContent="11" color="error">
            <NotificationsIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      <NotificationDialog
        // selectedValue={selectedValue}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
