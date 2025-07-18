import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import DarkModeToggler from '../Shared/DarkModeToggler';

const Navbar = () => {
  const { userLogout, user } = useAuth();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const navigate=useNavigate()
  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success('Logout Successful');
        setIsDropDownOpen(false);
        navigate('/')
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-white text-black dark:text-white border-gray-200 dark:bg-gray-900 sticky top-0 z-12">
      <div className="max-w-11/12 mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo & Dark Mode */}
        <div className='flex items-center'>
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://i.ibb.co/Lh0mPbxs/logo-2.jpg" className="h-8 rounded-full" alt="Logo" />
            <span className="text-2xl font-semibold">EMS</span>
          </Link>
          <div className='ml-2 mt-1'>
            <DarkModeToggler />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center md:order-2 space-x-3">
          {user ? (
            <button
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="user" />
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary text-white">Login</button>
            </Link>
          )}

          {/* Hamburger toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Dropdown */}
        {isDropDownOpen && (
          <div className="z-50 my-4 text-base absolute top-16 right-4 bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow">
            <ul className="py-2">
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Navigation Menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white">
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 dark:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
