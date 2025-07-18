
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { Link, NavLink, useNavigate } from "react-router";
import Employee from "../Employee/Employee";
import HumanResource from "../HumanResource/HumanResource";
import Admin from "../Admin/Admin";

import DarkModeToggler from "../../Shared/DarkModeToggler";
import useUserRole from "../../hooks/UserRole";
import { toast } from "react-toastify";


const Sidebar = () => {
  const { userLogout } = useAuth();
  const [isActive, setActive] = useState(true);
  const [role,isLoading]=useUserRole ()

const navigate=useNavigate()
  const handleLogout = () => {

       


    userLogout()
      .then(() => {
        toast.success('Logout Successful');
        navigate('/')
      })
      .catch((error) => toast.error(error));
  };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  if(isLoading)return <p>Loading....</p>
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
           <div className="flex justify-center items-center">
             <Link to="/">
              <img src='https://i.ibb.co/Lh0mPbxs/logo-2.jpg' alt="logo" width="80" height="80" className="rounded-full" />
            </Link>
            <DarkModeToggler/>
           </div>
            
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
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 text-black dark:bg-gray-900 dark:text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
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
               
              <h2 className="font-bold text-xl text-black dark:text-white">Employee Management</h2>
              <DarkModeToggler></DarkModeToggler>
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
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium text-black dark:text-white">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

