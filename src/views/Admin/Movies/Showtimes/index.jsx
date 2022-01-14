import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieShowtimes } from "../../../../store/actions/movie";
import { format } from "date-fns";
import BackButton from "../../../../components/UI/Buttons/BackButton";
import NewShowtimeModal from "../../../../components/Admin/Movies/NewShowtimeModal";
import Swal from "sweetalert2";
import useStyles from "./style";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const MovieShowtimes = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const movieShowtimes = useSelector((state) => state.movie.movieShowtimes);
  const [value, setValue] = React.useState(0);
  const [showNewShowtimeModal, setShowNewShowtimeModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchMovieShowtimes(params.id));
  }, [dispatch, params.id]);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleCreateShowtimeSuccess = () => {
    dispatch(fetchMovieShowtimes(params.id));

    Swal.fire({
      icon: "success",
      title: "Movie showtime created successfully",
      // timer: 5000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <BackButton />

      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={{ xs: 2, md: 0 }}
      >
        <Typography variant="h3" component="h1" mb={2}>
          Movie Showtimes
        </Typography>

        <Button
          variant="contained"
          onClick={() => setShowNewShowtimeModal(true)}
        >
          New showtime
        </Button>
      </Stack>

      <Typography variant="h6" mb={2}>
        {movieShowtimes?.tenPhim}
      </Typography>

      <Box className={classes.tabsContainer}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {movieShowtimes &&
            movieShowtimes.heThongRapChieu.map((cinemaComplex) => {
              return (
                <Tab
                  key={cinemaComplex.maHeThongRap}
                  label={
                    <Box width="50px">
                      <img
                        src={cinemaComplex.logo}
                        alt={cinemaComplex.tenHeThongRap}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  }
                  {...a11yProps(cinemaComplex.maHeThongRap)}
                />
              );
            })}
        </Tabs>
      </Box>

      {movieShowtimes &&
        movieShowtimes.heThongRapChieu.map((cinemaComplex, index) => {
          return (
            <TabPanel
              key={cinemaComplex.maHeThongRap}
              value={value}
              index={index}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {cinemaComplex.cumRapChieu.map((cinemaGroup) => {
                      return (
                        <TableRow
                          key={cinemaGroup.maCumRap}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Typography variant="h6">
                              {cinemaGroup.tenCumRap}
                            </Typography>
                            {cinemaGroup.lichChieuPhim.map((showtime) => {
                              return (
                                <Box key={showtime.maLichChieu} my={2}>
                                  <Typography variant="body2">
                                    Showtime ID:{" "}
                                    <strong>{showtime.maLichChieu}</strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Cinema: <strong>{showtime.tenRap}</strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Showtime:
                                    <strong>
                                      {format(
                                        new Date(showtime.ngayChieuGioChieu),
                                        "dd/MM/yyyy HH:mm"
                                      )}
                                    </strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Length:{" "}
                                    <strong>{showtime.thoiLuong} min</strong>
                                  </Typography>
                                  <Typography variant="body2">
                                    Price: <strong>{showtime.giaVe} VND</strong>
                                  </Typography>
                                </Box>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          );
        })}

      {showNewShowtimeModal && (
        <NewShowtimeModal
          open={showNewShowtimeModal}
          onClose={() => setShowNewShowtimeModal(false)}
          onSuccess={handleCreateShowtimeSuccess}
          movieId={params.id}
        />
      )}
    </>
  );
};

export default MovieShowtimes;
