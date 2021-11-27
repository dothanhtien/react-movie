import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "../../store/actions/movie";
import Carousel from "../../HOCs/layouts/Home/Carousel";
import MovieList from "../../components/Home/MovieList";
import Contact from "../../HOCs/layouts/Home/Contact";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (
    <>
      <Carousel />

      <Box py={3} component="div" id="movieList">
        <Container fixed>
          <MovieList />
        </Container>
      </Box>

      <Contact />
    </>
  );
};

export default Home;
