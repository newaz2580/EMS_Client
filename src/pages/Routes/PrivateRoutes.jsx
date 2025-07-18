import React from 'react';
import useAuth from '../../Component/hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';

const PrivateRoutes = ({children}) => {
    const location=useLocation()
    const {user,loading}=useAuth()
    if(loading) return <LoadingSpinner/>
    if(!user) return <Navigate state={location?.pathname} to='/'></Navigate>
      
    return children;
};

export default PrivateRoutes;