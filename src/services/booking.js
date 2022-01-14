import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createMovieShowtimeSchema = yup.object({
  cinemaComplex: yup.string().required("Cinema complex is required"),
  cinemaGroup: yup.string().required("Cinema group is required"),
  showtime: yup.string().required("Showtime is required"),
  price: yup.string().required("Price is required"),
});
class BookingService {
  fetchMovieShowtimeDetails(params) {
    return axiosClient.get("/api/QuanLyDatVe/LayDanhSachPhongVe", { params });
  }

  createMovieShowtime(data) {
    return axiosClient.post("/api/QuanLyDatVe/TaoLichChieu", data);
  }
}

export default BookingService;
