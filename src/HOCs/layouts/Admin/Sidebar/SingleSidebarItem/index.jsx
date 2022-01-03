import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SingleSidebarItem = ({ icon: IconComponent, to, text }) => {
  return (
    <ListItemButton component={Link} to={to}>
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default SingleSidebarItem;
