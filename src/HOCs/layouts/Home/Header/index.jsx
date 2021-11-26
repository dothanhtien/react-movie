import React from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const Header = () => {
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#121212", color: "#0eae57" }}>
        <Container fixed>
          <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {process.env.REACT_APP_NAME}
            </Typography>
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
