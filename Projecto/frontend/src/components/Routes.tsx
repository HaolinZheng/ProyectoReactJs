import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignUp";
import Home from "../pages/Home";
import Error404Page from "../pages/Error404Page";
import Projects from "../pages/Projects";
import LogIn from "../pages/LogIn";
import PublicRoute from "../pages/PublicRoute";
import PrivateRoute from "../pages/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/projects" element={<Projects />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </Routes>
  )
}
