import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    mandatoryLabel: {
      color: theme.palette.error.main,
    },
  };
});

export default useStyles;
