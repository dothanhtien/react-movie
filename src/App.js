import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// views
import SignIn from "./views/Auth/SignIn";

import Home from "./views/Home";
import Admin from "./views/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/admin" exact element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
