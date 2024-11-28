import { useState } from "react"
import { FaBars } from "react-icons/fa"

import Nav from "./Nav";
import Sidebar from "./Sidebar";

function Header () {

  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  function toggleSidebar() {
    setIsOpenSidebar(!isOpenSidebar);
  }

  return (
    <header className="bg-black text-white py-4">
      <div className="container px-2 sm:px-0 mx-auto flex items-center gap-4">
          
        <div className="hidden sm:block">
          <Nav />
        </div>

        { isOpenSidebar && <Sidebar toggle={toggleSidebar}/>}
        <button onClick={toggleSidebar} className="sm:hidden"><FaBars size={30}/></button>
        
      </div>
      
    </header>
  )
}
export default Header;