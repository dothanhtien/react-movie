import axiosClient from "./axiosClient";
import { GROUP_ID } from "../constants/appConfig";
import * as yup from "yup";

export const createUserSchema = yup.object({
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
  maLoaiNguoiDung: yup.string().required("User type is require"),
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

class UserService {
  fetchUsersWithPagination(params) {
    return axiosClient.get(
      "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
      { params: { MaNhom: GROUP_ID, ...params } }
    );
  }

  fetchUserTypes() {
    return axiosClient.get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  }

  fetchUserDetail(username) {
    return axiosClient.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${username}`
    );
  }

  findUsers(keyword) {
    return axiosClient.get("/api/QuanLyNguoiDung/TimKiemNguoiDung", {
      params: {
        MaNhom: GROUP_ID,
        tuKhoa: keyword,
      },
    });
  }

  createUser(data) {
    return axiosClient.post("/api/QuanLyNguoiDung/ThemNguoiDung", {
      maNhom: GROUP_ID,
      ...data,
    });
  }

  updateUser(data) {
    return axiosClient.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      maNhom: GROUP_ID,
      ...data,
    });
  }

  deleteUser(username) {
    return axiosClient.delete("/api/QuanLyNguoiDung/XoaNguoiDung", {
      params: { TaiKhoan: username },
    });
  }
}

export default UserService;
