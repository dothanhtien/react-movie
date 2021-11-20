import axiosClient from "./axiosClient";

class AuthService {
  signIn(data) {
    return axiosClient.post("/api/QuanLyNguoiDung/DangNhap", data);
  }
}

export default AuthService;
