import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      sx={{ marginBottom: 2 }}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;
