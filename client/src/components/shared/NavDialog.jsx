import * as React from "react";
import PropTypes from "prop-types";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
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
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchInput from "./SearchInput";

const allUsers = [
  {
    avatar: "",
    username: "hachiko",
  },
  {
    avatar: "",
    username: "abhayxy",
  },
  {
    avatar: "",
    username: "zixxy",
  },
  {
    avatar: "",
    username: "nicehoonmay",
  },
  {
    avatar: "",
    username: "samayOp",
  },
  {
    avatar: "",
    username: "hachiko",
  },
  {
    avatar: "",
    username: "abhayxy",
  },
  {
    avatar: "",
    username: "zixxy",
  },
  {
    avatar: "",
    username: "nicehoonmay",
  },
  {
    avatar: "",
    username: "samayOp",
  },
  {
    avatar: "",
    username: "samayOp",
  },
  {
    avatar: "",
    username: "hachiko",
  },
  {
    avatar: "",
    username: "abhayxy",
  },
  {
    avatar: "",
    username: "zixxy",
  },
  {
    avatar: "",
    username: "nicehoonmay",
  },
  {
    avatar: "",
    username: "samayOp",
  },
];

function AddFriendDialog({ onClose, selectedValue, open }) {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    // onClose(value);
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
          {allUsers.map(({ avatar, username }) => (
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
                <Tooltip title="Add friend">
                  <AddIcon />
                </Tooltip>
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
  //   selectedValue: PropTypes.string.isRequired,
};

export function AddFriendDialogBtn() {
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
        <Tooltip title="Add Friends">
          <AddIcon />
        </Tooltip>
      </IconButton>
      <AddFriendDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
export function CreateGroupDialogBtn() {
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
        <Tooltip title="Add Friends">
          <GroupIcon />
        </Tooltip>
      </IconButton>
      <AddFriendDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
export function NotificationDialogBtn() {
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
        <Tooltip title="Add Friends">
          <Badge badgeContent="11" color="error">
            <NotificationsIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      <AddFriendDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
