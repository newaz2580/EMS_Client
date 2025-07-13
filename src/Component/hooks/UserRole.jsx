import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole  = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:role,isLoading}=useQuery({
        queryKey:['users',user?.email],
        enabled: !!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user-role/${user?.email}`)
            return res.data.role

        }
    })
    return [role,isLoading]
};

export default useUserRole ;