import React from "react";
import { Typography } from "@mui/material";
import BackButton from "../../../../components/UI/Buttons/BackButton";

const MovieShowtimes = () => {
  return (
    <>
      <BackButton />
      <Typography variant="h3" component="h1">
        Movie Showtimes
      </Typography>
    </>
  );
};

export default MovieShowtimes;
