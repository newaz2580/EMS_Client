import React from 'react';
import useAuth from '../hooks/useAuth';
import { MdOutlineWbSunny } from "react-icons/md";
import { GoMoon } from "react-icons/go";

const DarkModeToggler = () => {
    const {darkMode,setDarkMode}=useAuth()
    
    return (
        <div>
           <button onClick={()=>setDarkMode(!darkMode)}>{darkMode ? <MdOutlineWbSunny size={25} />:<GoMoon size={25} />}</button>
        </div>
    );
};

export default DarkModeToggler;