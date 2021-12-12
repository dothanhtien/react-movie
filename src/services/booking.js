import axiosClient from "./axiosClient";

class BookingService {
  fetchMovieShowtimeDetails(params) {
    return axiosClient.get("/api/QuanLyDatVe/LayDanhSachPhongVe", { params });
  }
}

export default BookingService;
