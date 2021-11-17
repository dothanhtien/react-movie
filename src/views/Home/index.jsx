import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box py={4}>
      <Container fixed>
        <Typography variant="h3" component="h1" mb={2}>
          Home page goes here!
        </Typography>

        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="outlined" component={Link} to="/admin">
            Admin page
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
