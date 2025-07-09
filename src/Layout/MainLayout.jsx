import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
             <div className='min-h-[calc(100vh-340px)]'>
                 <Outlet/>
             </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;