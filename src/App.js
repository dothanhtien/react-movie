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
import AdminLayout from "./HOCs/layouts/Admin";

// views
const SignIn = React.lazy(() => import("./views/Auth/SignIn"));
const SignUp = React.lazy(() => import("./views/Auth/SignUp"));

const Home = React.lazy(() => import("./views/Home"));
const HomeMovieDetail = React.lazy(() => import("./views/Home/MovieDetail"));
const Booking = React.lazy(() => import("./views/Home/Booking"));

const Dashboard = React.lazy(() => import("./views/Admin/Dashboard"));
const ManageMovies = React.lazy(() => import("./views/Admin/Movies/Manage"));
const NewMovie = React.lazy(() => import("./views/Admin/Movies/New"));
const EditMovie = React.lazy(() => import("./views/Admin/Movies/Edit"));
const MovieShowtimes = React.lazy(() =>
  import("./views/Admin/Movies/Showtimes")
);

const MyProfile = React.lazy(() => import("./views/Admin/MyProfile"));

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
            <Route
              path="/booking/:showtimeId"
              element={
                <RequireAuth redirectPath="/signin">
                  <Booking />
                </RequireAuth>
              }
            />
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

          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={
                <RequireAuth redirectPath="/signin">
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/movies"
              element={
                <RequireAuth redirectPath="/signin">
                  <ManageMovies />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/movies/new"
              element={
                <RequireAuth redirectPath="/signin">
                  <NewMovie />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/movies/:id/edit"
              element={
                <RequireAuth redirectPath="/signin">
                  <EditMovie />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/movies/:id/showtimes"
              element={
                <RequireAuth redirectPath="/signin">
                  <MovieShowtimes />
                </RequireAuth>
              }
            />

            <Route
              path="/admin/my-profile"
              element={
                <RequireAuth redirectPath="/signin">
                  <MyProfile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
