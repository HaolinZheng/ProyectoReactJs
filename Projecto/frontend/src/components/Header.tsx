import { useState } from "react"
import { FaBars } from "react-icons/fa"

import Logo from "./Logo"
import UserGreet from "./UserGreet";
import Nav from "./Nav";

function Header () {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  function toggleSidebar() {
    setIsOpenSidebar(!isOpenSidebar);
  }

  return (
    <header className="bg-slate-950 text-white py-4">
      <div className="container mx-auto flex items-center ">
        <div className="hidden sm:block">
        <Nav />
        </div>
        <button onClick={toggleSidebar} className="sm:hidden"><FaBars size={30}/></button>
      </div>
    </header>
  )
}
export default Header;