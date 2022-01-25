import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Shortcut from "../../../components/Admin/Dashboard/Shortcut";
import { Box } from "@mui/system";
import { format } from "date-fns";

const Dashboard = () => {
  const { me } = useSelector((state) => state);

  if (me?.maLoaiNguoiDung === "KhachHang") {
    return (
      <>
        <Typography variant="h3" component="h1" mb={4}>
          Welcome back{me?.hoTen ? `, ${me.hoTen}!` : "!"}
        </Typography>

        <Typography variant="h6" mb={4}>
          Booking information
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {!!me.thongTinDatVe?.length ? (
                me.thongTinDatVe?.map((bookingInfo) => {
                  return (
                    <TableRow
                      key={bookingInfo.maVe}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Avatar
                          variant="square"
                          alt={bookingInfo.tenPhim}
                          src={bookingInfo.hinhAnh}
                          sx={{
                            width: 120,
                            height: "auto",
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">
                          {bookingInfo.tenPhim}
                        </Typography>
                        <Box my={2}>
                          <Typography variant="body2">
                            Booked date:{" "}
                            <strong>
                              {format(
                                new Date(bookingInfo.ngayDat),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </strong>
                          </Typography>
                          <Typography variant="body2">
                            Length:{" "}
                            <strong>{bookingInfo.thoiLuongPhim} min</strong>
                          </Typography>
                          <Typography variant="body2">
                            Price: <strong>{bookingInfo.giaVe} VND</strong>
                          </Typography>

                          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                          <Typography variant="subtitle2" mb={2}>
                            Seat list
                          </Typography>
                          {bookingInfo.danhSachGhe.map((seat) => {
                            return (
                              <Typography key={seat.maGhe} variant="body2">
                                {`Seat ${seat.tenGhe} - ${seat.tenCumRap} - ${seat.tenHeThongRap}`}
                              </Typography>
                            );
                          })}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>You haven't booked any ticket yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h3" component="h1" mb={4}>
          Welcome back{me?.hoTen ? `, ${me.hoTen}!` : "!"}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Shortcut
              background="radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )"
              icon={LocalMoviesIcon}
              text="Movie list"
              link="/admin/movies"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Shortcut
              background="linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))"
              icon={AddPhotoAlternateIcon}
              text="Create movie"
              link="/admin/movies/new"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Shortcut
              background="linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
              icon={GroupIcon}
              text="User list"
              link="/admin/users"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Shortcut
              background="linear-gradient( 109.6deg,  rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )"
              icon={PersonAddAltIcon}
              text="Create user"
              link="/admin/users/new"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Shortcut
              background="radial-gradient( circle farthest-corner at 10% 20%,  rgba(253,193,104,1) 0%, rgba(251,128,128,1) 90% )"
              icon={AccountBoxIcon}
              text="My profile"
              link="/admin/my-profile"
            />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Dashboard;
