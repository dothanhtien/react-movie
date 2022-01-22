import React, { useCallback, useEffect } from "react";
import { Button, FormGroup, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from "../../../store/selector";
import { fetchMe, updateProfile } from "../../../store/actions/auth";
import MandatoryLabel from "../../../components/UI/Labels/Mandatory";

const MyProfile = () => {
  const dispatch = useDispatch();
  const updatingProfileSelector = createLoadingSelector(["UPDATE_PROFILE"]);
  const updatingProfileErrorMessageSelector = createErrorMessageSelector([
    "UPDATE_PROFILE",
  ]);
  const me = useSelector((state) => state.me);
  const isUpdatingProfile = useSelector((state) =>
    updatingProfileSelector(state)
  );
  const updatingProfileError = useSelector((state) =>
    updatingProfileErrorMessageSelector(state)
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      matKhauXacNhan: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    resolver: yupResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (updatingProfileError === "Email đã tồn tại!") {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
    }
    if (updatingProfileError === "Tài khoản đã tồn tại!") {
      setError("taiKhoan", {
        type: "manual",
        message: "Username already exists",
      });
    }
    // eslint-disable-next-line
  }, [updatingProfileError]);

  const handleResetForm = useCallback(() => {
    reset(me);
    setValue("soDt", me?.soDT ? me.soDT : "");
    setValue("matKhau", "");
    setValue("matKhauXacNhan", "");
  }, [me, reset, setValue]);

  useEffect(() => {
    handleResetForm();
  }, [me, handleResetForm]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      updateProfile(data, () => {
        dispatch(fetchMe);

        // show success modal
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully",
          // timer: 5000,
          showConfirmButton: false,
          didClose: () => {
            // scroll to top
            window.scrollTo(0, 0);
          },
        });
      })
    );
  };

  return (
    <>
      <Typography variant="h3" component="h1" mb={2}>
        My profile
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="taiKhoan"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={<MandatoryLabel label="Username" />}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.taiKhoan}
              helperText={errors.taiKhoan?.message}
              disabled={true}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={<MandatoryLabel label="Email" />}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="hoTen"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />

        <Controller
          name="soDt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone number"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.soDt}
              helperText={errors.soDt?.message}
            />
          )}
        />

        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!errors.matKhau}
              helperText={errors.matKhau?.message}
            />
          )}
        />

        <Controller
          name="matKhauXacNhan"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password confirmation"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              error={!!errors.matKhauXacNhan}
              helperText={errors.matKhauXacNhan?.message}
            />
          )}
        />

        <FormGroup row sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginRight: 1 }}
            disabled={isUpdatingProfile}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleResetForm}
            disabled={isUpdatingProfile}
          >
            Reset
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default MyProfile;
