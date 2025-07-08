import React from 'react';
import useAuth from '../../Component/hooks/useAuth';
import { Navigate } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';

const PrivateRoutes = ({children}) => {
    const {user,loading}=useAuth()
    if(loading) return <LoadingSpinner/>
    if(!user) return <Navigate to='/'></Navigate>
      
    return children;
};

export default PrivateRoutes;