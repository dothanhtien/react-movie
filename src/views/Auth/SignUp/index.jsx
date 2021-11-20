import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../store/actions/auth";
import { GROUP_ID } from "../../../utils/constants/appConfig";
import { ReactComponent as SigninImage } from "../../../assets/img/login-img.svg";
import useStyles from "./style";

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      matKhauXacNhan: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      hoTen: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    if (authError?.content === "Tài khoản đã tồn tại!") {
      setError("taiKhoan", { type: "manual", message: authError.content });
    }

    if (authError?.content === "Email đã tồn tại!") {
      setError("email", { type: "manual", message: authError.content });
    }
  }, [authError, setError]);

  const onSubmit = (data) => {
    setShowSuccessAlert(false);

    dispatch(
      signUp(data, () => {
        reset();
        setShowSuccessAlert(true);
      })
    );
  };

  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Container fixed>
        <Grid container justifyContent="center" alignItems="center" spacing={0}>
          <Grid item md={6} className={classes.gridImage}>
            <SigninImage className={classes.signUpImg} />
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
                  : "Sign up"}
              </Typography>

              {showSuccessAlert && (
                <Alert
                  severity="success"
                  onClose={() => setShowSuccessAlert(false)}
                >
                  The Account created successfully.{" "}
                  <Link to="/signin" className={classes.alertLink}>
                    Sign in now
                  </Link>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="taiKhoan"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={
                        <>
                          Username
                          <span className={classes.labelMandatory}>
                            &nbsp;*
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.taiKhoan?.message}
                      helperText={errors.taiKhoan?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="email"
                      label={
                        <>
                          Email
                          <span className={classes.labelMandatory}>
                            &nbsp;*
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.email?.message}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="hoTen"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Full name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="soDt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Phone number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.soDt?.message}
                      helperText={errors.soDt?.message}
                    />
                  )}
                />

                <Controller
                  name="matKhau"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      label={
                        <>
                          Password
                          <span className={classes.labelMandatory}>
                            &nbsp;*
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.matKhau?.message}
                      helperText={errors.matKhau?.message}
                    />
                  )}
                />

                <Controller
                  name="matKhauXacNhan"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      label={
                        <>
                          Password confirmation
                          <span className={classes.labelMandatory}>
                            &nbsp;*
                          </span>
                        </>
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.matKhauXacNhan?.message}
                      helperText={errors.matKhauXacNhan?.message}
                    />
                  )}
                />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: 16 }}
                  loading={false}
                >
                  Sign up
                </LoadingButton>

                <Button
                  fullWidth
                  component={Link}
                  to="/signin"
                  style={{ marginTop: 8 }}
                >
                  Already have account. Sign in now
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
