import React from 'react';

import { Navigate } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import useUserRole from '../../Component/hooks/UserRole';

const HrRoutes = ({children}) => {
    const [role,isLoading]=useUserRole()

    if(isLoading) return <LoadingSpinner/>
    if(role==='HR')return children
    return <Navigate to='/'></Navigate>
      
    
};

export default HrRoutes;