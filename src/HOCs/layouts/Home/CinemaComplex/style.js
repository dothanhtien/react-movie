import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cinemaComplexContainer: {
    display: "flex",
    border: "1px solid rgba(0, 0, 0, 0.12)",
  },
  cinemaComplexList: {
    width: "10%",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  cinemaComplexImage: {
    display: "block",
    width: "100%",
  },
  cinemaList: {
    width: "40%",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
  },
  cinemaItem: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  movieList: {
    width: "60%",
    overflow: "hidden auto",
    "&::-webkit-scrollbar": {
      width: "4px",
      backgroundColor: "#e8e3e3",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      WebkitBoxShadow: "inset 0 0 6px rgb(0 0 0 / 30%)",
    },
  },
  showtimeItem: {
    marginRight: 1,
    marginBottom: 1,
  },
}));

export default useStyles;
