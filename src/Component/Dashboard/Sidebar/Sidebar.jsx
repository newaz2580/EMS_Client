import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/UserRole";
import DarkModeToggler from "../../Shared/DarkModeToggler";
import { toast } from "react-toastify";
import Employee from "../Employee/Employee";
import HumanResource from "../HumanResource/HumanResource";
import Admin from "../Admin/Admin";

const Sidebar = () => {
  const { userLogout } = useAuth();
  const [isActive, setActive] = useState(true);
  const [role, isLoading] = useUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success("Logout Successful");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleToggle = () => setActive(!isActive);

  if (isLoading) return <p>Loading...</p>;

  const activeClass =
    "bg-gray-300 dark:bg-gray-700 font-bold shadow-inner";

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="flex items-center p-4">
          <NavLink to="/">
            <img
              src="https://i.ibb.co/Lh0mPbxs/logo-2.jpg"
              alt="logo"
              width="80"
              height="80"
              className="rounded-full"
            />
          </NavLink>
          <DarkModeToggler />
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
          isActive ? "-translate-x-full" : ""
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Logo */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-sm rounded-lg justify-center items-center mx-auto mb-4">
            <NavLink to="/">
              <img
                src="https://i.ibb.co/Lh0mPbxs/logo-2.jpg"
                alt="logo"
                width="100"
                height="100"
                className="rounded-full"
              />
            </NavLink>
            <h2 className="font-bold text-xl text-black dark:text-white ml-2">
              Employee Management
            </h2>
            <DarkModeToggler />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col mt-6 space-y-1">
            {/* Overview */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                  isActive ? activeClass : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`
              }
            >
              Overview
            </NavLink>

            {/* Role-based Links */}
            {role === "Employee" && <Employee />}
            {role === "HR" && <HumanResource />}
            {role === "admin" && <Admin />}
          </nav>
        </div>

        {/* Profile & Logout */}
        <div>
          <hr className="border-gray-300 dark:border-gray-600 mb-2" />

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-2 rounded transition-colors duration-200 ${
                isActive ? activeClass : "hover:bg-gray-200 dark:hover:bg-gray-600"
              }`
            }
          >
            <FiUser className="w-5 h-5 mr-3 text-gray-700 dark:text-gray-200" />
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium text-black dark:text-white">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
