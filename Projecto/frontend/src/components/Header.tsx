import { NavLink } from "react-router-dom";

interface NavProps {
  className?: string;
  vertical?: boolean;
}

function Header(props: NavProps) {

  const { className, vertical } = props;

  const classes = `flex gap-4 ${className} ${vertical ? 'flex-col items-center' : ''}`

  return (
    <header className="bg-black text-white py-4">
      <div className="container px-2 sm:px-0 mx-auto flex items-center gap-4">

        <nav className={classes}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {!vertical && <div className="w-96"></div>}
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </nav>

      </div>

    </header>
  )
}
export default Header;