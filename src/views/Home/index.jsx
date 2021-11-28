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

      <Box component="div" id="movieList" py={3}>
        <Container fixed>
          <MovieList />
        </Container>
      </Box>

      <Contact />
    </>
  );
};

export default Home;
