import axiosClient from "./axiosClient";
import { GROUP_ID } from "../constants/appConfig";

class MovieService {
  fetchAllMovies(params) {
    return axiosClient.get("/api/QuanLyPhim/LayDanhSachPhim", {
      params: { maNhom: GROUP_ID, ...params },
    });
  }

  fetchMoviesWithPagination(params) {
    return axiosClient.get("/api/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: { maNhom: GROUP_ID, ...params },
    });
  }

  fetchMoviesByDate(params) {
    return axiosClient.get("/api/QuanLyPhim/LayDanhSachPhimTheoNgay", {
      params: { maNhom: GROUP_ID, ...params },
    });
  }

  fetchMovieDetail(id) {
    return axiosClient.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  }
}

export default MovieService;
