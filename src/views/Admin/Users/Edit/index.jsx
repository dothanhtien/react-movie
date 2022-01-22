import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../../../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import {
  fetchUserDetail,
  fetchUserTypes,
  updateUser,
} from "../../../../store/actions/user";
import { useParams } from "react-router-dom";
import BackButton from "../../../../components/UI/Buttons/BackButton";
import MandatoryLabel from "../../../../components/UI/Labels/Mandatory";

const EditUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const updatingUserSelector = createLoadingSelector(["UPDATE_USER"]);
  const { userDetail, userTypes } = useSelector((state) => state.user);
  const isUpdatingUser = useSelector((state) => updatingUserSelector(state));

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
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
    resolver: yupResolver(createUserSchema),
  });

  useEffect(() => {
    dispatch(fetchUserTypes());
    dispatch(fetchUserDetail(params.username));
  }, [dispatch, params.username]);

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line
  }, [userDetail]);

  const onSubmit = (data) => {
    dispatch(
      updateUser(data, () => {
        // reset form
        handleResetForm();

        // show success modal
        Swal.fire({
          icon: "success",
          title: "User updated successfully",
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

  const handleResetForm = () => {
    reset(userDetail);
    setValue("matKhau", "");
    setValue("matKhauXacNhan", "");
  };

  return (
    <>
      <BackButton />
      <Typography variant="h3" component="h1" mb={2}>
        Edit user
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
            />
          )}
        />

        <Controller
          control={control}
          name="maLoaiNguoiDung"
          render={({ field }) => {
            return (
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.maLoaiNguoiDung?.message}
              >
                <InputLabel id="user-type-select-label">
                  {<MandatoryLabel label="User type" />}
                </InputLabel>
                <Select
                  {...field}
                  labelId="user-type-select-label"
                  id="user-type-select"
                  label={<MandatoryLabel label="User type" />}
                >
                  {userTypes &&
                    userTypes.map((userType) => {
                      return (
                        <MenuItem
                          key={userType.maLoaiNguoiDung}
                          value={userType.maLoaiNguoiDung}
                        >
                          {userType.tenLoai}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {errors.maLoaiNguoiDung?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />

        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={<MandatoryLabel label="Password" />}
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
              label={<MandatoryLabel label="Password confirmation" />}
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
            disabled={isUpdatingUser}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleResetForm}
            disabled={isUpdatingUser}
          >
            Reset
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default EditUser;
