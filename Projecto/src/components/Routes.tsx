import { Route, Routes } from "react-router-dom";
import LogInForm from "../pages/SignIn";
import Home from "../pages/Home";
import Error404Page from "../pages/Error404Page";
import Projects from "../pages/Projects";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/login" element={<LogInForm />}/>
      <Route path="/login" element={<SignInForm />}/>
      <Route path="*" element={<Error404Page />} />
    </Routes> 
  )
}
