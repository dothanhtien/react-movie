import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Shortcut from "../../../components/Admin/Dashboard/Shortcut";

const Dashboard = () => {
  const { me } = useSelector((state) => state);

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
            link="/admin"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Shortcut
            background="linear-gradient( 109.6deg,  rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )"
            icon={PersonAddAltIcon}
            text="Create user"
            link="/admin"
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
};

export default Dashboard;
