import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Shortcut = ({ background, icon: IconComponent, link, text }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(link)}>
      <CardActionArea>
        <CardContent
          sx={{
            background: background
              ? background
              : "radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )",
          }}
        >
          <IconComponent
            color="primary"
            sx={{
              display: "block",
              margin: "auto",
              fontSize: 80,
              color: "#ffffff",
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            color="white"
          >
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Shortcut;
