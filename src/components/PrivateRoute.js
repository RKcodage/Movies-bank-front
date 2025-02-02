import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, userToken, ...rest }) => {
  return (
    <Route
      {...rest}
      element={userToken ? <Component {...rest} /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
