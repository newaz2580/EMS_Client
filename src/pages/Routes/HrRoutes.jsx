import React from 'react';
import useUserRole from '../../Component/hooks/userRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';

const HrRoutes = ({children}) => {
    const [role,isLoading]=useUserRole()
    console.log(role)
    if(isLoading) return <LoadingSpinner/>
    if(role==='HR')return children
    return <Navigate to='/'></Navigate>
      
    
};

export default HrRoutes;