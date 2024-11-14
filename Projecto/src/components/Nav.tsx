import { Link } from "react-router-dom";

function Nav() {
  
  return (    
    <nav className="flex gap-10 justify-center items-center">
        <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        </div>
        <div className="border-l border-gray-300 h-6"></div>
        <div className="flex gap-4">
        <Link to="/login">Log In</Link>
        <Link to="/signin">Sign In</Link>
        </div>
    </nav>
  )
}
export default Nav;