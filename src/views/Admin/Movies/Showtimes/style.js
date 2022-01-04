import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    [theme.breakpoints.down("xl")]: {
      maxWidth: "calc(100vw -240px - 32px)",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "calc(100vw - 240px - 32px)",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "calc(100vw - 240px - 32px)",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "calc(100vw - 32px)",
    },
  },
}));

export default useStyles;
