import React from "react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/actions/auth";
import { ReactComponent as SigninImage } from "../../../assets/img/login-img.svg";
import useStyles from "./style";

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      signIn(data, () => {
        reset();
        navigate("/admin");
      })
    );
  };

  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Container fixed>
        <Grid container justifyContent="center" spacing={0}>
          <Grid item md={6} className={classes.gridImage}>
            <SigninImage className={classes.signinImg} />
          </Grid>

          <Grid
            item
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box maxWidth={400}>
              <Typography variant="h4" component="h1" mb={1} textAlign="center">
                {process.env.REACT_APP_NAME
                  ? process.env.REACT_APP_NAME
                  : "Sign in"}
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="taiKhoan"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Username"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="matKhau"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                    />
                  )}
                />

                {(!!Object.keys(errors).length || authError) && (
                  <Alert severity="error" style={{ marginTop: 8 }}>
                    Invalid email or password
                  </Alert>
                )}

                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: 16 }}
                  loading={false}
                >
                  Sign in
                </LoadingButton>

                <Button
                  fullWidth
                  component={Link}
                  to="/"
                  style={{ marginTop: 8 }}
                >
                  Don't have an account? Sign up now
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;
