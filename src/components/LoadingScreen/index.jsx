import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  useEffect(() => {
    // hide scroll bar
    window.document.body.style.overflow = "hidden";

    return () => {
      window.document.body.style.overflow = "initial";
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="1600"
      bgcolor="rgba(255,255,255,0.95)"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
