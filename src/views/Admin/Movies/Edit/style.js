import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    labelMandatory: {
      color: theme.palette.error.main,
    },
  };
});

export default useStyles;
