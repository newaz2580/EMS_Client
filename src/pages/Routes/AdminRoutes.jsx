import React from 'react';
import useUserRole from '../../Component/hooks/userRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';

const AdminRoutes = ({children}) => {
    const [role,isLoading]=useUserRole()
    if(isLoading) return <LoadingSpinner/>
    if(role==='admin')return children
    return <Navigate to='/'></Navigate>
};

export default AdminRoutes;