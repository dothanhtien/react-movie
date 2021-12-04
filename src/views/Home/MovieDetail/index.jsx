import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../store/selector";
import { fetchMovieDetail } from "../../../store/actions/movie";
import Contact from "../../../HOCs/layouts/Home/Contact";
import GradientButton from "../../../components/UI/Buttons/GradientButton";
import LoadingScreen from "../../../components/LoadingScreen";
import VideoModal from "../../../components/UI/Modals/VideoModal";

const MovieDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["FETCH_MOVIE"]);
  const isFetching = useSelector((state) => loadingSelector(state));
  const movieDetail = useSelector((state) => state.movie.movieDetail);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {isFetching && <LoadingScreen />}

      <Container
        fixed
        sx={{
          minHeight: `calc(100vh - 61px - 191px - 330px)`,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {movieDetail && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <img
                src={movieDetail.hinhAnh}
                alt={movieDetail.biDanh}
                style={{ display: "block", width: "100%", marginBottom: 16 }}
              />
              <Box
                width="100%"
                textAlign="center"
                onClick={() => setShowTrailer(true)}
              >
                <GradientButton startIcon={<PlayArrowIcon />}>
                  Play trailer
                </GradientButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h3">{movieDetail.tenPhim}</Typography>
              </Box>

              <Box>
                <Rating
                  name="half-rating-read"
                  defaultValue={movieDetail.danhGia}
                  precision={0.5}
                  readOnly
                />
              </Box>

              <Box>
                <Typography variant="overline" component="p">
                  Overview
                </Typography>
                <Typography variant="body1">{movieDetail.moTa}</Typography>
              </Box>

              <Box>
                <Typography variant="overline" component="p">
                  The Cast
                </Typography>
                <Stack direction="row" spacing={2}>
                  {[1, 2, 3, 4, 5, 6].map((item) => {
                    return (
                      <Avatar
                        key={item}
                        alt={`cast ${item}`}
                        src={`https://i.pravatar.cc/300?u=${(Math.random() + 1)
                          .toString(36)
                          .substring(7)}`}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>

      <Contact />

      {showTrailer && (
        <VideoModal
          src={movieDetail.trailer}
          open={showTrailer}
          handleClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default MovieDetail;
