import { GROUP_ID } from "../constants/appConfig";
import axiosClient from "./axiosClient";

class CinemaService {
  fetchCinemaComplexShowtimes(params) {
    return axiosClient.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: { maNhom: GROUP_ID, ...params },
    });
  }

  fetchCinemaComplexes(params) {
    return axiosClient.get("/api/QuanLyRap/LayThongTinHeThongRap", { params });
  }

  fetchCinemaGroupByCinemaComplex(cinemaComplex) {
    return axiosClient.get("/api/QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: { maHeThongRap: cinemaComplex },
    });
  }
}

export default CinemaService;
