import * as React from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import SearchInput from "./SearchInput";

import { Users } from "../../constants/sampleData";

export default function NavbarDialogComponent({ user, Icon, text }) {
  const [open, setOpen] = React.useState(false);

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
        <AddFriendDialog open={open} onClose={handleClose} />
      )}
      {text == "Create Group" && (
        <CreateGroupDialog open={open} onClose={handleClose} />
      )}
      {text == "Notifications" && (
        <NotificationDialog open={open} onClose={handleClose} />
      )}
    </>
  );
}

// Add friend Dialog
function AddFriendDialog({ onClose, open }) {
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
          {Users.map(({ avatar, username }) => (
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
              >
                {/* {request ? <RemoveIcon /> : <AddIcon />} */}
                <AddIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}

// Create New group Dialog
function CreateGroupDialog({ onClose, open }) {
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
        />
        <Typography>Add Members</Typography>
        <List
          sx={{
            overflow: "scroll",
            maxHeight: "280px",
          }}
        >
          {Users.map(({ avatar, username }) => (
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
              >
                {/* {request ? <RemoveIcon /> : <AddIcon />} */}
                <AddIcon />
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

// Notifications Dialogue
function NotificationDialog({ onClose, open }) {
  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
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
          {Users.map(({ avatar, username }) => (
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
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                color="success"
                sx={{
                  // backgroundColor: "#eee",
                  ":hover": { backgroundColor: "#ddd" },
                }}
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
