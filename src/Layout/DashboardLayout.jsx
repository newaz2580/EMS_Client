import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Sidebar from '../Component/Dashboard/Sidebar/Sidebar';
import useAuth from '../Component/hooks/useAuth';
import useUserRole from '../Component/hooks/userRole';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';

const DashboardLayout = () => {
   const {  loading } = useAuth();
  const [role, isRoleLoading] = useUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  
  if (location.pathname === '/dashboard') {
    if (role === 'Employee') return <Navigate to="/dashboard/workSheet" replace />;
    if (role === 'HR') return <Navigate to="/dashboard/employeeList" replace />;
    if (role === 'admin') return <Navigate to="/dashboard/allEmployeeList" replace />;
  }
    return (
        <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5 text-black'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
      
    </div>
    );
};

export default DashboardLayout;