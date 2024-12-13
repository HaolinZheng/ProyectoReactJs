import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

interface NavProps {
  className?: string;
  vertical?: boolean;
}

function Header(props: NavProps) {

  const { className, vertical } = props;
  const isLoged = useContext(AuthContext)

  const classes = `flex gap-4 ${className} ${vertical ? 'flex-col items-center' : ''}`

  return (
    <header className="bg-black text-white py-4">
      <div className="container px-2 sm:px-0 mx-auto flex items-center gap-4">

        <nav className={classes}>
          {!isLoged?.isAuthenticated && <NavLink to="/">Home</NavLink>}
          {isLoged?.isAuthenticated && <NavLink to="/projects">Projects</NavLink>}
          {!isLoged?.isAuthenticated && <NavLink to="/login">Log In</NavLink>}
          {!isLoged?.isAuthenticated && <NavLink to="/signin">Sign In</NavLink>}
          {isLoged?.isAuthenticated && <button
              onClick={isLoged.logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Log Out
            </button> }
        </nav>

      </div>

    </header>
  )
}
export default Header;