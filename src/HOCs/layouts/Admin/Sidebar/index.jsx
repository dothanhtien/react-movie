import React from "react";
import { Box } from "@mui/system";
import { Drawer, List, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SingleSidebarItem from "./SingleSidebarItem";
import ComplexSidebarItem from "./ComplexSidebarItem";

const AdminSidebar = ({ open, onDrawerToggle, window }) => {
  const drawer = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <SingleSidebarItem
            icon={DashboardIcon}
            to="/admin"
            text="Dashboard"
          />
          <ComplexSidebarItem
            icon={MovieIcon}
            text="Movies"
            menu={[
              {
                icon: BallotOutlinedIcon,
                to: "/admin/movies",
                text: "Manage",
              },
              {
                icon: AddBoxOutlinedIcon,
                to: "/admin/movies/new",
                text: "Add",
              },
            ]}
          />
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
