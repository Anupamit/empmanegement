import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, fallbackPath }) => {
  return isAuthenticated ? <Route element={<Component />} /> : <Navigate to={fallbackPath} />;
};

export default PrivateRoute;
