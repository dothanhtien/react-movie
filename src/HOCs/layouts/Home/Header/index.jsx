import React from "react";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#121212", color: "#0eae57" }}>
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
            <Button color="inherit" component={Link} to="/signin">
              Sign in
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
