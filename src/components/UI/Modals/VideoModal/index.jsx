import React, { useState } from "react";
import { Box } from "@mui/system";
import { Backdrop, CircularProgress, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./style";

const VideoModal = ({ open, handleClose, src, title }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box className={classes.iframeContainer}>
        <Fab size="small" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </Fab>
        {isLoading && (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        )}

        <iframe
          width="100%"
          height="100%"
          src={src}
          title={title ? title : "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowffullscreen="true"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </Box>
    </Backdrop>
  );
};

export default VideoModal;
