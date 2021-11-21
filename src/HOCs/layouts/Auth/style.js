import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    gridImage: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    authImage: {
      width: "75%",
      height: "auto",
      display: "block",
      margin: "auto",
    },
  };
});

export default useStyles;
