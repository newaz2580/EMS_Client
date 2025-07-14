import React, { useState } from 'react';
import { Link } from 'react-router'; 
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userLogout, user } = useAuth();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success('Logout Successful');
        setIsDropDownOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://i.ibb.co/Lh0mPbxs/logo-2.jpg" className="h-8 rounded-full" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EMS</span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <button
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="user" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="ml-3 text-amber-50 btn btn-primary">Login</button>
              </Link>
            </>
          )}

          {isDropDownOpen && (
            <div className="z-50 my-4 text-base list-none absolute top-16 right-4 bg-white dark:bg-gray-700 divide-y divide-gray-100 rounded-lg shadow">
              <ul className="py-2">
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            
            <li>
              {
                user && <Link
                to="/dashboard"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
              >
                Dashboard
              </Link>
              }
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500"
              >
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
