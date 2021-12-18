export const actionType = {
  // auth
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNOUT_SUCCESS: "SIGNOUT_SUCCESS",
  SET_AUTH_ERROR: "SET_AUTH_ERROR",

  // movie
  FETCH_MOVIES_REQUEST: "FETCH_MOVIES_REQUEST",
  FETCH_MOVIES_SUCCESS: "FETCH_MOVIES_SUCCESS",
  FETCH_MOVIE_REQUEST: "FETCH_MOVIE_REQUEST",
  FETCH_MOVIE_SUCCESS: "FETCH_MOVIE_SUCCESS",
  FETCH_MOVIES_WITH_PAGINATION_REQUEST: "FETCH_MOVIES_WITH_PAGINATION_REQUEST",
  FETCH_MOVIES_WITH_PAGINATION_SUCCESS: "FETCH_MOVIES_WITH_PAGINATION_SUCCESS",
  CREATE_MOVIE_REQUEST: "CREATE_MOVIE_REQUEST",
  CREATE_MOVIE_SUCCESS: "CREATE_MOVIE_SUCCESS",
  DELETE_MOVIE_REQUEST: "DELETE_MOVIE_REQUEST",
  DELETE_MOVIE_SUCCESS: "DELETE_MOVIE_SUCCESS",

  // booking
  // cinema
  FETCH_CINEMA_COMPLEX_SHOWTIMES_SUCCESS:
    "FETCH_CINEMA_COMPLEX_SHOWTIMES_SUCCESS",
  FETCH_MOVIE_SHOWTIME_REQUEST: "FETCH_MOVIE_SHOWTIME_REQUEST",
  FETCH_MOVIE_SHOWTIME_SUCCESS: "FETCH_MOVIE_SHOWTIME_SUCCESS",

  // user
};
