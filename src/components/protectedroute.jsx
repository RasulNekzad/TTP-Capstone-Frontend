import React, {useContext} from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthProviderContext";
import {getAuth} from "firebase/auth";

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
const ProtectedRoute = ({redirectPath = "/login", children, page}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (page === "auth") {
    if (user) {
      return <Navigate to={"/"} replace/>;
    } else {
      return children;
    }
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute