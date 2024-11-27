import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Error404Page from "../pages/Error404Page";
import Projects from "../pages/Projects";
import LogIn from "../pages/LogIn";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="*" element={<Error404Page />} />
    </Routes> 
  )
}
