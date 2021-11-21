import React from "react";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ReactComponent as AuthImage } from "../../../assets/img/auth-img.svg";
import useStyles from "./style";

const AuthLayout = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Container fixed>
        <Grid container justifyContent="center" alignItems="center" spacing={0}>
          <Grid item md={6} className={classes.gridImage}>
            <AuthImage className={classes.authImage} />
          </Grid>

          <Grid
            item
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthLayout;
