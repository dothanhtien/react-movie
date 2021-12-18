import React, { useState } from "react";
import { Box } from "@mui/system";
import { Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display="flex">
      <AdminHeader onDrawerToggle={handleDrawerToggle} />
      <AdminSidebar open={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box component="main" flexGrow={1}>
        <Toolbar />
        <Box py={4}>
          <Container fixed>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
