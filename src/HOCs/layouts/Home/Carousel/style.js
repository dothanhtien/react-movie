import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  sliderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `linear-gradient( to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100% )`,
  },
  sliderImage: {
    display: "block",
    width: "100%",
    maxHeight: "90vh",
  },
  sliderContent: {
    position: "absolute",
    top: "50%",
    width: "100%",
    transform: `translateY(-50%)`,
  },
  silderContentCategory: {
    color: "#0eae57",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "0.875rem",
  },
  sliderContentTitle: {
    fontSize: "3.25rem",
    fontWeight: theme.typography.fontWeightLight,
    letterSpacing: "3px",
    marginBottom: theme.spacing(4),
    color: "#ffffff",
  },
  sliderContentDescription: {
    display: "inline-block",
    marginBottom: theme.spacing(4),
    color: "#ffffff",
  },
  sliderButton: {
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
        left: "-0.9375rem",
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
  playTrailer: {
    zIndex: 1,
  },
  sliderPagination: {},
  sliderPaginationBullet: {
    width: "10px",
    height: "10px",
    display: "inline-block",
    margin: "0 4px",
    borderRadius: "100%",
    background: "#fff",
    cursor: "pointer",
    transform: "translateY(-30px)",

    "&.active": {
      background: "#0eae57",
    },
  },
  scrollArrowContainer: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
    cursor: "pointer",
  },
  scrollArrowIcon: {
    display: "block",
  },
}));

export default useStyles;
