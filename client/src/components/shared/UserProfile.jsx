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

const UserProfile = ({ isMenuOpen, handleMenuOpen, handleMenuClose }) => {
  const menuId = "primary-search-account-menu";

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
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
            <Avatar />
            <Typography>username</Typography>
          </Stack>

          <TextField value="Abhay" variant="standard" placeholder="Full Name" />
          <TextField variant="standard" placeholder="Bio" />
          <Button size="small">Save Changes</Button>
          <Button
            sx={{ mt: 5 }}
            variant="outlined"
            color="error"
            onClick={handleMenuClose}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default UserProfile;
