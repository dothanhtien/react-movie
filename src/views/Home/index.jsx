import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "../../store/actions/movie";
import Header from "../../HOCs/layouts/Home/Header";
import Carousel from "../../HOCs/layouts/Home/Carousel";
import MovieList from "../../components/Home/MovieList";
import Contact from "../../HOCs/layouts/Home/Contact";
import Footer from "../../HOCs/layouts/Home/Footer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (
    <Box height="100vh">
      <Header />

      <Carousel />

      <Box py={3} component="div" id="movieList">
        <Container fixed>
          <MovieList />
        </Container>
      </Box>

      <Contact />

      <Footer />
    </Box>
  );
};

export default Home;
