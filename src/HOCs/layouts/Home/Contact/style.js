import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    gradientText: {
      fontSize: "2.5rem",
      letterSpacing: "1px",
      backgroundImage:
        "radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
    },
  };
});

export default useStyles;
