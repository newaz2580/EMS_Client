import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Component/Dashboard/Sidebar/Sidebar';
import useAuth from '../Component/hooks/useAuth';
import useUserRole from '../Component/hooks/userRole';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [role, isRoleLoading] = useUserRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen md:flex bg-white dark:bg-gray-800 dark:text-white">
      {/* Left Side: Sidebar Component */}
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5 text-black dark:text-white">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
