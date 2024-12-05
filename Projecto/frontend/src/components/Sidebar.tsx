import { IoClose } from "react-icons/io5";

import Nav from "./Nav"

type SidebarProps = {
  toggle: () => void;
}

function Sidebar({ toggle }: SidebarProps) {
  return (
    <div className="fixed top-0 start-0 w-full h-full bg-indigo-400 flex items-center justify-center">
      <button onClick={toggle} className="absolute top-2 end-2">
        <IoClose size="35"/>
      </button>
      <nav className="text-2xl" vertical>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {!vertical && <div className="w-96"></div>}
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </nav>
    </div>
  )
}

export default Sidebar