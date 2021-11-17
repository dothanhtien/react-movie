import AuthService from "./auth";
import MovieService from "./movie";
import BookingService from "./booking";
import CinemaService from "./cinema";
import UserService from "./user";

export const authService = new AuthService();
export const movieService = new MovieService();
export const bookingService = new BookingService();
export const cinemaService = new CinemaService();
export const userService = new UserService();
