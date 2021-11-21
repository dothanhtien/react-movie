import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../utils/constants/appConfig";

const createRoute = (condition) => {
  return ({ children, redirectPath }) => {
    const location = useLocation();

    if (condition()) {
      return <Navigate to={redirectPath} state={{ from: location }} />;
    }

    return children;
  };
};

export const IgnoreAuth = createRoute(
  () => !!localStorage.getItem(ACCESS_TOKEN)
);

export const RequireAuth = createRoute(
  () => !localStorage.getItem(ACCESS_TOKEN)
);
