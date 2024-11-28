import { NavLink } from "react-router-dom";

interface NavProps {
  className?: string;
  vertical?: boolean;
}

function Nav(props: NavProps) {
  
  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${vertical ? 'flex-col items-center' : ''}`

  return (    
    <nav className={classes}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        {!vertical && <div className="w-96"></div>}
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
    </nav>
  )
}
export default Nav;