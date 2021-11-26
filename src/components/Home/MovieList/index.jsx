import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import MovieItem from "../MovieItem";

const MovieList = () => {
  const movieList = useSelector((state) => state.movie.movieList);

  return (
    <Grid container spacing={4}>
      {movieList.map((movie) => {
        return (
          <Grid key={movie.maPhim} item xs={12} sm={6} md={4} lg={3}>
            <MovieItem movie={movie} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieList;
