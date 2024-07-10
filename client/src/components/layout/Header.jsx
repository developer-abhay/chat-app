import { useState } from "react";
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

import {
  AddFriendDialogBtn,
  CreateGroupDialogBtn,
  NotificationDialogBtn,
} from "../shared/NavDialog";
import UserProfile from "../shared/UserProfile";

function Header() {
  const [allUsers, setAllUsers] = useState([
    {
      avatar: "",
      username: "hachiko",
      request: false,
    },
    {
      avatar: "",
      username: "abhayxy",
      request: false,
    },
    {
      avatar: "",
      username: "zixxy",
      request: false,
    },
    {
      avatar: "",
      username: "nicehoonmay",
      request: false,
    },
    {
      avatar: "",
      username: "samayOp",
      request: false,
    },
    {
      avatar: "",
      username: "hachiko1",
      request: false,
    },
    {
      avatar: "",
      username: "abhayxy1",
      request: false,
    },
    {
      avatar: "",
      username: "zixxy1",
      request: false,
    },
    {
      avatar: "",
      username: "nicehoonmay1",
      request: false,
    },
    // {
    //   avatar: "",
    //   username: "samayOp1",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "samayOp2",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "hachiko2",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "abhayxy2",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "zixxy2",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "nicehoonmay2",
    //   request: false,
    // },
    // {
    //   avatar: "",
    //   username: "samayOp3",
    //   request: false,
    // },
  ]);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsProfileMenuOpen(true);
    console.log("open");
  };

  const handleMenuClose = () => {
    setIsProfileMenuOpen(false);
    console.log("close");
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
    },
    {
      title: "Notifications",
      Icon: <NotificationsIcon fontSize="large" />,
      badge: { content: 10 },
    },
    {
      title: "New Group",
      Icon: <GroupIcon fontSize="large" />,
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
      {mobileMenuList.map(({ title, Icon, onClick, badge }) => (
        <MenuItem
          key={title}
          onClick={onClick}
          sx={{ px: 3, height: "60px", gap: "15px" }}
        >
          {badge ? (
            <Badge badgeContent={badge.content} color="error">
              {Icon}
              {/* <AddIcon /> */}
            </Badge>
          ) : (
            Icon
          )}
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
            <AddFriendDialogBtn allUsers={allUsers} setAllUsers={setAllUsers} />
            <CreateGroupDialogBtn
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
            <NotificationDialogBtn
              allUsers={allUsers}
              setAllUsers={setAllUsers}
            />
            <UserProfile
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
