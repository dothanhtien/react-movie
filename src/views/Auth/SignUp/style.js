import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
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
