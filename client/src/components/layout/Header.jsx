import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Badge,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
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

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const settings = ["My Account", "Logout"];

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      onClick: handleProfileMenuOpen,
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
        <MenuItem onClick={onClick} sx={{ px: 3, height: "60px", gap: "15px" }}>
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
  // Profile Menu
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={handleMenuClose}>
          <Typography textAlign="center">{setting}</Typography>
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
            <AddFriendDialogBtn />
            <CreateGroupDialogBtn />
            <NotificationDialogBtn />

            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
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
      {/* Profile Menu */}
      {profileMenu}
    </Box>
  );
}

export default Header;
