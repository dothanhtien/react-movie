import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const AdminSidebar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: (theme) => theme.mixins.drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: (theme) => theme.mixins.drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movies" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/admin/movies"
              >
                <ListItemIcon>
                  <BallotOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/admin/movies/new"
              >
                <ListItemIcon>
                  <AddBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
