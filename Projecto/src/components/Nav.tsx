import { Link } from "react-router-dom";

function Nav() {
  
  return (    
    <nav className="flex gap-10 justify-center">
        <Link to="/">Home</Link>
        <a href="" target="_blank">About us</a>
      <a href="" target="_blank">Contact</a>
    </nav>
  )
}
export default Nav;