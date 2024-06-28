// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ userLogin }) => {
//   const isLoggedIn = !!sessionStorage.getItem("accessToken");
//   return isLoggedIn ? userLogin : <Navigate to="/chat" />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ userLogin, isLoggedIn }) => {
  return isLoggedIn ? userLogin : <Navigate to="/login" />;
};

export default PrivateRoute;
