import axiosClient from "./axiosClient";
import { GROUP_ID } from "../constants/appConfig";

class UserService {
  fetchUsersWithPagination(params) {
    return axiosClient.get(
      "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
      { params: { MaNhom: GROUP_ID, ...params } }
    );
  }
}

export default UserService;
