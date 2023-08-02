import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ path, element: Component, isAuthenticated, fallbackPath }) => {
  return isAuthenticated ? (
    <Navigate to={fallbackPath} />
  ) : (
    <Route path={path} element={<Component />} />
  );
};

export default PublicRoute;
