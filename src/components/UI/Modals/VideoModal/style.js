import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  iframeContainer: {
    position: "relative",
    width: 960,
    height: 540,

    [theme.breakpoints.down("lg")]: {
      width: 640,
      height: 360,
    },

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: 260,
    },
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(50%,-50%)",
    zIndex: 1,
  },
}));

export default useStyles;
