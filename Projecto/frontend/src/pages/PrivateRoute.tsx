import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

function PrivateRoute() {
  const authContext = useContext(AuthContext);
  if (authContext?.isAuthenticated) return <Outlet /> 

  return <Navigate to="/login"/>

}

export default PrivateRoute