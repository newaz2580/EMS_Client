import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router';
import Footer from '../Component/Footer/Footer';
import LoadingSpinner from '../pages/LoadingSpinner/LoadingSpinner';

const MainLayout = () => {
     const {state}=useNavigate()
    return (
        <div>
            <Navbar/>
             <div className='min-h-[calc(100vh-340px)]'>
               {state=='loading'?<LoadingSpinner></LoadingSpinner>:<Outlet/>} 
             </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;