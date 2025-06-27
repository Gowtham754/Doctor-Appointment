import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  return userData ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
