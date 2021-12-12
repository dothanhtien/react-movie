import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  blockImage: {
    display: "block",
    width: "100%",
  },
  seatContainer: {
    width: "calc(100% / 16)",
    padding: 4,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  seatButton: {
    padding: 0,
    minWidth: "initial",
  },
  seatName: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#ffffff",
    fontSize: "12px",
    cursor: "pointer",
    zIndex: 1,
  },
}));

export default useStyles;
