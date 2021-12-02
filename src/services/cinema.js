import { GROUP_ID } from "../constants/appConfig";
import axiosClient from "./axiosClient";

class CinemaService {
  fetchCinemaComplexShowtimes(params) {
    return axiosClient.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: { maNhom: GROUP_ID, ...params },
    });
  }
}

export default CinemaService;
