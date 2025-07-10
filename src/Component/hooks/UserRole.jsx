import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const UserRole = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:role,isLoading}=useQuery({
        queryKey:['users',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user-role/${user?.email}`)
             console.log(res.data)
            return res.data

        }
    })
    return [role,isLoading]
};

export default UserRole;