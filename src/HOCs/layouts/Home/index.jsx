import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import Header from "./Header";
import Footer from "./Footer";

const HomeLayout = () => {
  return (
    <Box height="100vh">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default HomeLayout;
