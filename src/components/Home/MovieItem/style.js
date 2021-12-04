import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  movieImageContainer: {
    position: "relative",
    cursor: "pointer",

    "&:hover": {
      "& .movie-overlay button": {
        transform: "scale(1)",
      },

      "&::before": {
        opacity: 0.5,
      },

      "&::after": {
        opacity: 0.5,
        background:
          "linear-gradient(to top,rgba(35,35,37,.9) 0,rgba(35,35,37,.5) 35%,rgba(22,22,23,0) 60%,rgba(0,0,0,0) 100%)",
      },
    },

    "&::before": {
      content: `""`,
      display: "block",
      position: "absolute",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: 0,
      transition: "all 400ms ease",
      background:
        "linear-gradient(to bottom, rgb(14 174 87) 0%, rgb(12 116 117) 100%)",
    },

    "&::after": {
      content: `""`,
      width: "100%",
      height: "100%",
      display: "block",
      position: "absolute",
      top: 0,
      transition: "all 400ms ease",
      background:
        "linear-gradient(to top,rgba(14,147,87,.9) 0,rgba(14,147,87,.5) 35%,rgba(22,22,23,0) 60%,rgba(0,0,0,0) 100%)",
      opacity: 0,
    },
  },
  movieOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    opacity: 1,
  },
  playButton: {
    backgroundColor: "#0EAE57",
    color: "#ffffff",
    transition: "all 400ms ease",
    transform: "scale(0)",

    "&:hover": {
      backgroundColor: "#0EAE57",
      boxShadow: "0 0 0 10px rgba(14, 174, 87, 0.4)",
    },
  },
}));

export default useStyles;
