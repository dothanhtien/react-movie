import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../../store/actions";
import { actionType } from "../../../../store/actions/type";
import { ACCESS_TOKEN } from "../../../../constants/appConfig";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const me = useSelector((state) => state.me);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(createAction(actionType.SIGNOUT_SUCCESS));
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#ffffff", color: "#0eae57" }}>
        <Container fixed>
          <Toolbar
            disableGutters={true}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button color="inherit" component={Link} to="/">
              {process.env.REACT_APP_NAME}
            </Button>

            {location.pathname === "/" && (
              <Button color="inherit" component="a" href="#cinemaList">
                Cinema complex
              </Button>
            )}

            {!me && (
              <>
                {location.pathname !== "/signin" && (
                  <Button color="inherit" component={Link} to="/signin">
                    Sign in
                  </Button>
                )}
                {location.pathname === "/signin" && (
                  <Button color="inherit" component={Link} to="/signup">
                    Sign up
                  </Button>
                )}
              </>
            )}

            {me && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  color="inherit"
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
                  <MenuItem onClick={() => navigate("/admin")}>
                    Admin page
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    My profile
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
