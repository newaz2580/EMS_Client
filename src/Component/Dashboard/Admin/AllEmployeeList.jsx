import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllEmployeeList = () => {
    const axiosSecure=useAxiosSecure()
    const {data}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/users/verified')
            return res.data
        }
    })
    console.log(data)
    return (
        <div>
            
        </div>
    );
};

export default AllEmployeeList;