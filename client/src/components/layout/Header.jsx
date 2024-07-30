import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Badge,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
// Icons
import AdbIcon from "@mui/icons-material/Adb";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { orangePrimary } from "../../constants/colors";

import NavbarDialogComponent from "../shared/NavDialog";
import UserProfile from "../shared/UserProfile";

function Header() {
  const user = useSelector((state) => state.user);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsProfileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsProfileMenuOpen(false);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const mobileMenuList = [
    {
      title: "My Profile",
      Icon: <AccountCircle fontSize="large" />,
      onClick: handleMenuOpen,
    },
    {
      title: "Add Friend",
      Icon: <AddIcon fontSize="large" />,
      onClick: () => setAddFriendOpen(true),
    },
    {
      title: "Notifications",
      Icon: <NotificationsIcon fontSize="large" />,
      badge: { content: 10 },
      onClick: () => setNotificationsOpen(true),
    },
    {
      title: "New Group",
      Icon: <GroupIcon fontSize="large" />,
      onClick: () => setCreateGroupOpen(true),
    },
  ];

  // Mobile menu
  const mobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {mobileMenuList.map(({ title, Icon, onClick }) => (
        <MenuItem
          key={title}
          onClick={() => {
            onClick();
            handleMobileMenuClose();
          }}
          sx={{ px: 3, height: "60px", gap: "15px" }}
        >
          {Icon}

          <p>{title}</p>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ height: "70px" }}>
      <AppBar position="static" sx={{ height: "100%", bgcolor: orangePrimary }}>
        <Toolbar>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TEXTIN
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NavbarDialogComponent
              user={user}
              text="Add Friends"
              Icon={<AddIcon />}
              open={addFriendOpen}
              setOpen={setAddFriendOpen}
            />
            <NavbarDialogComponent
              user={user}
              text="Create Group"
              Icon={<GroupIcon />}
              open={createGroupOpen}
              setOpen={setCreateGroupOpen}
            />
            <NavbarDialogComponent
              user={user}
              text="Notifications"
              Icon={
                <Badge color="error">
                  <NotificationsIcon />
                </Badge>
              }
              open={notificationsOpen}
              setOpen={setNotificationsOpen}
            />
            <UserProfile
              user={user}
              isMenuOpen={isProfileMenuOpen}
              handleMenuClose={handleMenuClose}
              handleMenuOpen={handleMenuOpen}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Menu */}
      {mobileMenu}
    </Box>
  );
}

export default Header;
