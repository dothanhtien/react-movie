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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../../../../services/user";
import MandatoryLabel from "../../../../components/UI/Labels/Mandatory";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUserTypes } from "../../../../store/actions/user";
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from "../../../../store/selector";
import Swal from "sweetalert2";

const NewUser = () => {
  const dispatch = useDispatch();
  const { userTypes } = useSelector((state) => state.user);
  const creatingUserSelector = createLoadingSelector(["CREATE_USER"]);
  const creatingUserErrorMessageSelector = createErrorMessageSelector([
    "CREATE_USER",
  ]);
  const isCreatingUser = useSelector((state) => creatingUserSelector(state));
  const createUserError = useSelector((state) =>
    creatingUserErrorMessageSelector(state)
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
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
  }, [dispatch]);

  useEffect(() => {
    if (createUserError === "Email đã tồn tại!") {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
    }
    if (createUserError === "Tài khoản đã tồn tại!") {
      setError("taiKhoan", {
        type: "manual",
        message: "Username already exists",
      });
    }
    // eslint-disable-next-line
  }, [createUserError]);

  const onSubmit = (data) => {
    dispatch(
      createUser(data, () => {
        // reset form
        handleResetForm();

        // show success modal
        Swal.fire({
          icon: "success",
          title: "User created successfully",
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
    reset();
  };

  return (
    <>
      <Typography variant="h3" component="h1" mb={2}>
        New user
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
                  // onChange={handleChangeCinemaComplex}
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
            disabled={isCreatingUser}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleResetForm}
            disabled={isCreatingUser}
          >
            Reset
          </Button>
        </FormGroup>
      </form>
    </>
  );
};

export default NewUser;
