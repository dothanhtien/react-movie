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
