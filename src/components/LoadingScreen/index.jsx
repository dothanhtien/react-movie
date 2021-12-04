import React, { useEffect } from "react";
import { Box } from "@mui/system";
import LoadingSpinner from "../../assets/img/loading-spinner.svg";

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
      flexDirection="column"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="1600"
    >
      <Box
        width="100%"
        flexGrow="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgba(0, 0, 0, 0.92)"
      >
        <img
          width="150px"
          height="auto"
          src={LoadingSpinner}
          alt="loading..."
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
