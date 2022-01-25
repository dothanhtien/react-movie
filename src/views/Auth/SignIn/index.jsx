import React from "react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, signIn } from "../../../store/actions/auth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
        dispatch(fetchMe);
        reset();

        if (location.state && location.state.from.pathname !== "/admin") {
          navigate(location.state.from.pathname);
        } else {
          navigate("/admin");
        }
      })
    );
  };

  return (
    <Box maxWidth={400}>
      <Typography variant="h4" component="h1" mb={1} textAlign="center">
        {process.env.REACT_APP_NAME ? process.env.REACT_APP_NAME : "Sign in"}
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
            Invalid username or password
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
          to="/signup"
          style={{ marginTop: 8 }}
        >
          Don't have an account? Sign up now
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;
