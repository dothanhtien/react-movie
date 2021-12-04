import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Rating, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoModal from "../../UI/Modals/VideoModal";
import useStyles from "./style";

const MovieItem = (props) => {
  const { maPhim, hinhAnh, tenPhim, danhGia, trailer } = props.movie;
  const classes = useStyles();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      <Box position="relative">
        <Box
          className={classes.movieImageContainer}
          onClick={() => navigate(`/movies/${maPhim}`)}
        >
          <img
            src={hinhAnh}
            alt={tenPhim}
            style={{ display: "block", width: "100%", height: 320 }}
          />
          <Box className={`movie-overlay ${classes.movieOverlay}`}>
            <IconButton
              size="large"
              className={classes.playButton}
              onClick={(e) => {
                setShowTrailer(true);
                e.stopPropagation();
              }}
            >
              <PlayArrowIcon />
            </IconButton>
          </Box>
        </Box>
        <Box textAlign="center" mt={2}>
          <Rating
            defaultValue={danhGia}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="h6" component="h3" minHeight={64}>
            {tenPhim.length > 40 ? tenPhim.substr(0, 36) + " ..." : tenPhim}
          </Typography>
        </Box>
      </Box>

      {showTrailer && (
        <VideoModal
          src={trailer}
          open={showTrailer}
          handleClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default MovieItem;
