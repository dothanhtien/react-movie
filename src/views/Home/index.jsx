import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../store/selector";
import { fetchAllMovies } from "../../store/actions/movie";
import Carousel from "../../HOCs/layouts/Home/Carousel";
import MovieList from "../../components/Home/MovieList";
import Contact from "../../HOCs/layouts/Home/Contact";
import LoadingScreen from "../../components/LoadingScreenStyle1";
import CinemaComplex from "../../HOCs/layouts/Home/CinemaComplex";

const Home = () => {
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["FETCH_MOVIES"]);
  const isFetching = useSelector((state) => loadingSelector(state));

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (
    <>
      {isFetching && <LoadingScreen />}

      <Carousel />

      <Box component="div" id="movieList" pt={12} pb={6}>
        <Container fixed>
          <MovieList />
        </Container>
      </Box>

      <Box component="div" id="cinemaList" pt={6} pb={12}>
        <Container fixed>
          <CinemaComplex />
        </Container>
      </Box>

      <Contact />
    </>
  );
};

export default Home;
