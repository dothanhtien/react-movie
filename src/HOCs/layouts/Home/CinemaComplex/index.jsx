import React, { useEffect, useRef } from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import { Avatar, Chip, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaComplexShowtimes } from "../../../../store/actions/cinema";
import TabPanel from "../../../../components/UI/TabPanel";
import useStyles from "./style";

const CinemaMovies = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedCinemaComplex, setSelectedCinemaComplex] = React.useState(0);
  const [selectedCinema, setSelectedCinema] = React.useState(0);
  const cinemaComplexShowtimes = useSelector(
    (state) => state.cinema.cinemaComplexShowtimes
  );
  const movieListRef = useRef(null);
  const cinemaComplexHeight = 74;

  useEffect(() => {
    dispatch(fetchCinemaComplexShowtimes());
  }, [dispatch]);

  const handleCinemaComplexTabChange = (e, newValue) => {
    setSelectedCinemaComplex(newValue);
    setSelectedCinema(0);
  };

  const handleCinemaTabChange = (e, newValue) => {
    movieListRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedCinema(newValue);
  };

  const renderMovieShowtimes = (movieShowtimes) => {
    let clonedMovieShowtimes = [...movieShowtimes];

    if (movieShowtimes.length > 5) {
      return (
        <>
          {clonedMovieShowtimes.splice(0, 4).map((showtime) => {
            return (
              <Chip
                key={showtime.maLichChieu}
                label={moment(showtime.ngayChieuGioChieu).format("hh:mm")}
                color="primary"
                variant="outlined"
                size="small"
                className={classes.showtimeItem}
              />
            );
          })}
          <Chip
            label="Show more..."
            color="primary"
            variant="outlined"
            size="small"
            className={classes.showtimeItem}
          />
        </>
      );
    } else {
      return movieShowtimes.map((showtime) => {
        return (
          <Chip
            key={showtime.maLichChieu}
            label={moment(showtime.ngayChieuGioChieu).format("hh:mm")}
            color="primary"
            variant="outlined"
            size="small"
            className={classes.showtimeItem}
          />
        );
      });
    }
  };

  return (
    <Box className={classes.cinemaComplexContainer}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedCinemaComplex}
        onChange={(e, newValue) => handleCinemaComplexTabChange(e, newValue)}
        className={classes.cinemaComplexList}
      >
        {cinemaComplexShowtimes &&
          cinemaComplexShowtimes.map((cinemaComplex) => {
            return (
              <Tab
                key={cinemaComplex.maHeThongRap}
                label={
                  <Box width="50px">
                    <img
                      src={cinemaComplex.logo}
                      alt={cinemaComplex.tenHeThongRap}
                      className={classes.cinemaComplexImage}
                    />
                  </Box>
                }
              />
            );
          })}
      </Tabs>

      {cinemaComplexShowtimes &&
        cinemaComplexShowtimes.map((cinemaComplex, index) => {
          return (
            <TabPanel
              key={cinemaComplex.maHeThongRap}
              value={selectedCinemaComplex}
              index={index}
            >
              <Box
                display="flex"
                height={cinemaComplexHeight * cinemaComplexShowtimes.length}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  scrollButtons={false}
                  value={selectedCinema}
                  onChange={(e, newValue) => handleCinemaTabChange(e, newValue)}
                  className={classes.cinemaList}
                >
                  {cinemaComplex.lstCumRap.map((cinema) => {
                    return (
                      <Tab
                        key={cinema.maCumRap}
                        label={
                          <Box className={classes.cinemaItem}>
                            <Avatar
                              alt={cinema.tenCumRap}
                              src={cinema.hinhAnh}
                              variant="square"
                              sx={{ marginRight: 2 }}
                            />
                            <Box textAlign="left">
                              <Typography variant="button" component="h3">
                                {cinema.tenCumRap}
                              </Typography>
                              <Typography variant="caption" component="h4">
                                {cinema.diaChi}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    );
                  })}
                </Tabs>

                <Box ref={movieListRef} className={classes.movieList}>
                  {cinemaComplex.lstCumRap.map((cinema, index) => {
                    return (
                      <TabPanel
                        key={cinema.maCumRap}
                        value={selectedCinema}
                        index={index}
                      >
                        {cinema.danhSachPhim.map((movie) => {
                          return (
                            <Box
                              key={movie.maPhim}
                              width="100%"
                              display="flex"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              p={2}
                            >
                              <Avatar
                                src={movie.hinhAnh}
                                alt={movie.tenPhim}
                                variant="square"
                                sx={{ marginRight: 2, paddingTop: 1 }}
                              />
                              <Box textAlign="left">
                                <Typography variant="button" component="h3">
                                  {movie.tenPhim}
                                </Typography>
                                <Box>
                                  {renderMovieShowtimes(
                                    movie.lstLichChieuTheoPhim
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </TabPanel>
                    );
                  })}
                </Box>
              </Box>
            </TabPanel>
          );
        })}
    </Box>
  );
};

export default CinemaMovies;
