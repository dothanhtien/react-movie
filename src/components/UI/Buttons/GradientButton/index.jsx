import React from "react";
import { Button } from "@mui/material";
import useStyles from "./style";

const GradientButton = ({ startIcon: StartIcon, children, ...restProps }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      startIcon={StartIcon ? StartIcon : null}
      className={classes.button}
      {...restProps}
    >
      <span className={classes.text}>{children}</span>
    </Button>
  );
};

export default GradientButton;
