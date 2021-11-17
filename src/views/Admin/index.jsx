import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <Box py={4}>
      <Container fixed>
        <Typography variant="h3" component="h1" mb={2}>
          Admin page goes here!
        </Typography>
        <Button variant="outlined" component={Link} to="/">
          Home page
        </Button>
      </Container>
    </Box>
  );
};

export default Admin;
