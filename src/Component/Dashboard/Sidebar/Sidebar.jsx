
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { Link, NavLink } from "react-router";
import Employee from "../Employee/Employee";
import HumanResource from "../HumanResource/HumanResource";
import Admin from "../Admin/Admin";
import useUserRole  from "../../hooks/userRole";


const Sidebar = () => {
  const { userLogout } = useAuth();
  const [isActive, setActive] = useState(true);
  const [role,isLoading]=useUserRole ()
  console.log(role,isLoading)
//   console.log(role,isLoading)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
//   if(isLoading)return <LoadingSpinner></LoadingSpinner>
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src='https://i.ibb.co/Lh0mPbxs/logo-2.jpg' alt="logo" width="80" height="80" className="rounded-full" />
            </Link>
            
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-sm rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/Lh0mPbxs/logo-2.jpg'
                  alt="logo"
                  width="100"
                  height="100"
                  className="rounded-full"
                />
              </Link>
              <h2 className="font-bold text-xl">Employee Management</h2>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="text-black">
             {/* <Employee/>
             <HumanResource/>
             <Admin/> */}
              {role==='Employee' && <Employee/>}
              {role ==='HR' && <HumanResource/>}
              {role ==='admin' && <Admin/>}
           

             
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          /> */}
          <button
            onClick={userLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

