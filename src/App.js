import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants/appConfig";
import { fetchMe } from "./store/actions/auth";

// routes
import { IgnoreAuth, RequireAuth } from "./HOCs/routes";

// layouts
import AuthLayout from "./HOCs/layouts/Auth";
import HomeLayout from "./HOCs/layouts/Home";

// views
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";

import Home from "./views/Home";
import HomeMovieDetail from "./views/Home/MovieDetail";
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
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<HomeMovieDetail />} />
        </Route>

        <Route element={<AuthLayout />}>
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
        </Route>

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
