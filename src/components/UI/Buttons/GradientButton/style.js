import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    "&.MuiButton-root": {
      backgroundImage:
        "radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );",
      borderRadius: "30px",
      letterSpacing: "3px",
      padding: "0.75rem 1.5rem",
      fontSize: "13px",
      position: "relative",
      overflow: "hidden",

      "&:hover::before": {
        width: "140%",
      },

      "&::before": {
        content: `""`,
        position: "absolute",
        top: 0,
        left: "-1rem",
        width: 0,
        height: "100%",
        transform: `skewX(30deg)`,
        background: "#0eae57",
        transition: "0.4s",
        zIndex: 0,
      },

      "& .MuiButton-startIcon": {
        zIndex: 1,
      },
    },
  },
  text: {
    zIndex: 1,
  },
});

export default useStyles;
