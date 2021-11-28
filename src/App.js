import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants/appConfig";
import { fetchMe } from "./store/actions/auth";
import LoadingScreen from "./components/LoadingScreen";

// routes
import { IgnoreAuth, RequireAuth } from "./HOCs/routes";

// layouts
import AuthLayout from "./HOCs/layouts/Auth";
import HomeLayout from "./HOCs/layouts/Home";

// views
const SignIn = React.lazy(() => import("./views/Auth/SignIn"));
const SignUp = React.lazy(() => import("./views/Auth/SignUp"));

const Home = React.lazy(() => import("./views/Home"));
const HomeMovieDetail = React.lazy(() => import("./views/Home/MovieDetail"));

const Admin = React.lazy(() => import("./views/Admin"));

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
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
