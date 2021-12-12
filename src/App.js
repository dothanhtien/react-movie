import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants/appConfig";
import { fetchMe } from "./store/actions/auth";
import ScrollToTop from "./components/ScrollToTop";
import LazyLoadingScreen from "./components/LazyLoadingScreen";

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
const Booking = React.lazy(() => import("./views/Home/Booking"));

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
      <ScrollToTop />
      <Suspense fallback={<LazyLoadingScreen />}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<HomeMovieDetail />} />
            <Route path="/booking/:showtimeId" element={<Booking />} />
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
