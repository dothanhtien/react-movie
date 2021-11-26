import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "./style";

const Contact = () => {
  const classes = useStyles();

  return (
    <Box bgcolor="#121212" py={6} textAlign="center">
      <Typography variant="h6" color="#ffffff" mb={2}>
        Need help? Contact our support team on
      </Typography>
      <Typography variant="body" className={classes.gradientText}>
        0330 123 4567
      </Typography>
    </Box>
  );
};

export default Contact;
