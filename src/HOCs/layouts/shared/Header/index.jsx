import React from "react";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

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
            {pathname === "/" && (
              <Button color="inherit" component="a" href="#cinemaList">
                Cinema complex
              </Button>
            )}
            {pathname !== "/signin" && (
              <Button color="inherit" component={Link} to="/signin">
                Sign in
              </Button>
            )}
            {pathname !== "/" && pathname !== "/signup" && (
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
