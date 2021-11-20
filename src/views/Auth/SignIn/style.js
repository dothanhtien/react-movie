import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    signinImg: {
      width: "75%",
      height: "auto",
      display: "block",
      margin: "auto",
    },
    gridImage: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  };
});

export default useStyles;
