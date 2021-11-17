import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import Home from "./views/Home";
import Admin from "./views/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/admin" exact element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
