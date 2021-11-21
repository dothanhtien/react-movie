import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "./utils/constants/appConfig";
import { IgnoreAuth, RequireAuth } from "./HOCs/routes";
import { fetchMe } from "./store/actions/auth";

// views
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";

import Home from "./views/Home";
import Admin from "./views/Admin";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      dispatch(fetchMe);
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <IgnoreAuth redirectPath="/admin">
              <Home />
            </IgnoreAuth>
          }
        />
        <Route
          path="/signin"
          element={
            <IgnoreAuth redirectPath="/admin">
              <SignIn />
            </IgnoreAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <IgnoreAuth redirectPath="/admin">
              <SignUp />
            </IgnoreAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth redirectPath="/signin">
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
