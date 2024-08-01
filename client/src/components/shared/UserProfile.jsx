import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { orangePrimary } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/UserSlice";
import { persistor } from "../../redux/store";

const UserProfile = ({ user, isMenuOpen, handleMenuOpen, handleMenuClose }) => {
  const menuId = "primary-search-account-menu";
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <Tooltip title="Open settings">
          <Avatar
            sx={{
              ml: 1,
              bgcolor: "white",
              color: orangePrimary,
              width: "35px",
              height: "35px",
            }}
            alt="Remy Sharp"
            src=""
          />
        </Tooltip>
      </IconButton>
      {/* Drawer */}
      <Drawer
        id={menuId}
        anchor="top"
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          "&.MuiDrawer-root .MuiDrawer-paper": {
            m: 1,
            ml: "auto",
            borderRadius: 1,
            height: "fit-content",
            width: "fit-content",
          },
        }}
        keepMounted
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar src={user.avatar} sx={{ width: "70px", height: "70px" }} />
          <Typography variant="h5"> {user.name}</Typography>
          <Typography sx={{ fontWeight: "600", my: -1 }}>
            @{user.username}
          </Typography>
          <Typography variant="p"> {user?.bio}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#aaa" }}>
            Joined:{" "}
            <span style={{ fontWeight: "600" }}>{user.created_at} </span>
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(logout());
              persistor.purge().then(() => {
                console.log("Persisted state purged successfully");
              });
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default UserProfile;
