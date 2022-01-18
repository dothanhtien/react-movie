import React from "react";
import useStyles from "./style";

const MandatoryLabel = ({ label }) => {
  const classes = useStyles();

  return (
    <>
      {label}
      <span className={classes.mandatoryLabel}>&nbsp;*</span>
    </>
  );
};

export default MandatoryLabel;
