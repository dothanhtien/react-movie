import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Contact from "../../../HOCs/layouts/Home/Contact";
import { createLoadingSelector } from "../../../store/selector";
import { fetchMovieShowtimeDetails } from "../../../store/actions/booking";
import { connection } from "../../..";
import LoadingScreen from "../../../components/LoadingScreen";
import ScreenImage from "../../../assets/img/booking/screen-thumb.png";
import GradientButton from "../../../components/UI/Buttons/GradientButton";
import FreeSeatImage from "../../../assets/img/booking/free-seat.png";
import BookedSeatImage from "../../../assets/img/booking/booked-seat.png";
import BookingSeatImage from "../../../assets/img/booking/booking-seat.png";
import PlaceholderSeatImage from "../../../assets/img/booking/placeholder-seat.png";
import useStyles from "./style";

const Booking = () => {
  const { showtimeId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["FETCH_MOVIE_SHOWTIME"]);
  const isFetching = useSelector((state) => loadingSelector(state));
  const movieShowtimeDetails = useSelector(
    (state) => state.cinema.movieShowtimeDetails
  );
  const me = useSelector((state) => state.me);
  const [bookingSeats, setBookingSeats] = useState([]);
  const [placeholderSeats, setPlaceholderSeats] = useState([]);

  useEffect(() => {
    dispatch(fetchMovieShowtimeDetails({ maLichChieu: showtimeId }));

    // vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", showtimeId);
  }, [dispatch, showtimeId]);

  useEffect(() => {
    // load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (bookedSeats) => {
      let clonedBookedSeats = [...bookedSeats];

      clonedBookedSeats = clonedBookedSeats.reduce(
        (prevValue, currentValue) => {
          if (currentValue.taiKhoan !== me?.taiKhoan) {
            return [...prevValue, ...JSON.parse(currentValue.danhSachGhe)];
          }

          return prevValue;
        },
        []
      );

      setPlaceholderSeats(clonedBookedSeats);
    });

    // cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", () => {
      connection.invoke("huyDat", me?.taiKhoan, showtimeId);
    });

    return () => {
      connection.invoke("huyDat", me?.taiKhoan, showtimeId);
      window.removeEventListener("beforeunload", () => {
        connection.invoke("huyDat", me?.taiKhoan, showtimeId);
      });
    };
  }, [me, showtimeId]);

  const handleUpdateBookingSeats = (seatId) => {
    const clonedBookingSeats = [...bookingSeats];

    const foundIndex = bookingSeats.findIndex((item) => {
      return item === seatId;
    });
    if (foundIndex === -1) {
      clonedBookingSeats.push(seatId);
      setBookingSeats(clonedBookingSeats);
    } else {
      clonedBookingSeats.splice(foundIndex, 1);
      setBookingSeats(clonedBookingSeats);
    }

    connection.invoke(
      "datGhe",
      me.taiKhoan, // userId
      JSON.stringify(clonedBookingSeats),
      showtimeId // showtimeId
    );
  };

  const renderCheckoutBookingSeats = () => {
    let cardContent = null;

    if (!bookingSeats.length) {
      cardContent = (
        <Typography variant="body2">No seats selected yet</Typography>
      );
    } else {
      const clonedBookingSeats = [];

      bookingSeats.forEach((bookingSeat) => {
        clonedBookingSeats.push(
          movieShowtimeDetails.danhSachGhe.find(
            (item) => item.maGhe === bookingSeat
          )
        );
      });

      cardContent = (
        <>
          {clonedBookingSeats.map((item) => {
            return (
              <ListItem
                key={item.maGhe}
                secondaryAction={
                  <IconButton
                    color="error"
                    edge="end"
                    onClick={() => handleUpdateBookingSeats(item.maGhe)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`Seat ${item.tenGhe}`}
                  secondary={`${item.giaVe} VND`}
                />
              </ListItem>
            );
          })}
          <Divider />

          <Box mt={1} display="flex" justifyContent="space-between">
            <Typography variant="button">Total</Typography>
            <Typography variant="button">
              {clonedBookingSeats.reduce((prevValue, currentValue) => {
                return prevValue + currentValue.giaVe;
              }, 0)}
            </Typography>
          </Box>
        </>
      );
    }

    return (
      <Card>
        <CardContent>{cardContent}</CardContent>

        <CardActions>
          <GradientButton fullWidth>Check out</GradientButton>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      {isFetching && <LoadingScreen />}

      {movieShowtimeDetails && (
        <Container
          fixed
          sx={{
            minHeight: `calc(100vh - 61px - 191px - 330px)`,
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <Box>
            <Typography variant="h3" component="h1">
              {movieShowtimeDetails.thongTinPhim.tenPhim}
            </Typography>

            <Typography variant="button" display="block">
              {`${movieShowtimeDetails.thongTinPhim.tenCumRap} - ${movieShowtimeDetails.thongTinPhim.tenRap}`}
            </Typography>

            <Typography variant="button" display="block">
              {movieShowtimeDetails.thongTinPhim.diaChi}
            </Typography>

            <Typography variant="button" display="block">
              {`${movieShowtimeDetails.thongTinPhim.ngayChieu} - ${movieShowtimeDetails.thongTinPhim.gioChieu}`}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box my={4}>
                <img
                  src={ScreenImage}
                  alt="screen"
                  className={classes.blockImage}
                />
              </Box>
              <Box display="flex" flexWrap="wrap">
                {movieShowtimeDetails.danhSachGhe.map((seat) => {
                  const isBooking = bookingSeats.find(
                    (seatId) => seatId === seat.maGhe
                  );

                  const isPlacing = placeholderSeats.find(
                    (seatId) => seatId === seat.maGhe
                  );

                  return (
                    <Box key={seat.maGhe} className={classes.seatContainer}>
                      <Button
                        onClick={() => handleUpdateBookingSeats(seat.maGhe)}
                        disabled={seat.daDat || !!isPlacing}
                        disableRipple={true}
                        className={classes.seatButton}
                      >
                        {seat.daDat && (
                          <img
                            src={BookedSeatImage}
                            alt={seat.tenGhe}
                            className={classes.blockImage}
                          />
                        )}

                        {!seat.daDat && isBooking && (
                          <img
                            src={BookingSeatImage}
                            alt={seat.tenGhe}
                            className={classes.blockImage}
                          />
                        )}
                        
                        {!seat.daDat && !isBooking && (
                          <img
                            src={
                              isPlacing ? PlaceholderSeatImage : FreeSeatImage
                            }
                            alt={seat.tenGhe}
                            className={classes.blockImage}
                          />
                        )}

                        <Box className={classes.seatName}>{seat.tenGhe}</Box>
                      </Button>
                    </Box>
                  );
                })}
              </Box>

              <Divider sx={{ marginTop: 1 }} />

              <Box p={1}>
                {[
                  { src: BookedSeatImage, name: "Booked seat" },
                  { src: BookingSeatImage, name: "Booking seat" },
                  { src: PlaceholderSeatImage, name: "Placeholder seat" },
                  { src: FreeSeatImage, name: "Available seat" },
                ].map((item, index) => {
                  return (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        style={{ display: "block", width: "32px" }}
                      />
                      <Typography variant="overline" ml={1}>
                        {item.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              {renderCheckoutBookingSeats()}
            </Grid>
          </Grid>
        </Container>
      )}
      <Contact />
    </>
  );
};

export default Booking;
