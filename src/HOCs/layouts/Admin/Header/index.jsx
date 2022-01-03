import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { ACCESS_TOKEN } from "../../../../constants/appConfig";
import { createAction } from "../../../../store/actions";
import { actionType } from "../../../../store/actions/type";

const AdminHeader = ({ onDrawerToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const me = useSelector((state) => state.me);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMyProfileMenuItem = () => {
    setAnchorEl(null);
    navigate("/admin/my-profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(createAction(actionType.SIGNOUT_SUCCESS));
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // edge="start"
            onClick={onDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            {process.env.REACT_APP_NAME}
          </Button>
        </Box>

        {me && (
          <Box display="flex" alignItems="center">
            <Typography>Hi {me.hoTen ? me.hoTen : "guy"}</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="inherit"
              // edge="end"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleClickMyProfileMenuItem}>
                My profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
