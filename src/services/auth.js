import axiosClient from "./axiosClient";
import * as yup from "yup";

export const signUpSchema = yup.object({
  taiKhoan: yup
    .string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "Username must not contain special characters")
    .max(100, "Username cannot be more than 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .max(255, "Email cannot be more than 255 characters"),
  soDt: yup
    .string()
    .matches(/^[0-9]*$/, "Phone number must be a number")
    .max(30, "Phone number cannot be more than 30 digits"),
  matKhau: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot be more than 100 characters"),
  matKhauXacNhan: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("matKhau")], "Password does not match")
    .max(100, "Password cannot be more than 100 characters"),
});

class AuthService {
  signIn(data) {
    return axiosClient.post("/api/QuanLyNguoiDung/DangNhap", data);
  }

  signUp(data) {
    return axiosClient.post("/api/QuanLyNguoiDung/DangKy", data);
  }
}

export default AuthService;
