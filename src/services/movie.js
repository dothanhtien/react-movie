import axiosClient from "./axiosClient";
import { GROUP_ID } from "../constants/appConfig";
import * as yup from "yup";

export const createMovieSchema = yup.object({
  tenPhim: yup
    .string()
    .required("Movie name is required")
    .max(100, "Movie name cannot exceed 100 characters"),
  trailer: yup.string().url("The url of trailer is invalid"),
  ngayKhoiChieu: yup.string().required("Release date is required"),
  status: yup.string().required("Status is required"),
  hinhAnh: yup.string().required("Image is required").nullable(),
});

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

  createMovie(data) {
    return axiosClient.post("/api/QuanLyPhim/ThemPhimUploadHinh", data);
  }

  updateMovie(data) {
    return axiosClient.post("api/QuanLyPhim/CapNhatPhimUpload", data);
  }

  deleteMovie(id) {
    return axiosClient.delete("/api/QuanLyPhim/XoaPhim", {
      params: { MaPhim: id },
    });
  }
}

export default MovieService;
