import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    signUpImg: {
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
    alertLink: {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    labelMandatory: {
      color: theme.palette.error.main,
    },
  };
});

export default useStyles;
