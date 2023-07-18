import React from "react";
import { Navigate } from "react-router";

/**
 * default redirectPath is login
 * user is a flag for determining whether user is logged in
 * children is the child component being wrapped by this component
 * Reference: https://www.robinwieruch.de/react-router-private-routes/
 * Example:
 * <ProtectedRoute user={user}>
        <User />
    </ProtectedRoute>
    ^ If user is not logged in, the user will be redirected to login 
    Else the registered user will be directed to the intended path
 * Modify as needed 
 */
const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute