import React, { useState } from "react";
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

const AdminSidebar = ({ open, onDrawerToggle, window }) => {
  const [expand, setExpand] = useState(false);

  const drawer = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => setExpand(!expand)}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movies" />
            {expand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expand} timeout="auto" unmountOnExit>
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
    </>
  );

  return (
    <>
      <Drawer
        container={
          window !== undefined ? () => window().document.body : undefined
        }
        variant="temporary"
        open={open}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: (theme) => theme.mixins.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: (theme) => theme.mixins.drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: (theme) => theme.mixins.drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
