import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Message from './Message';
import LoadingSpinner from '../../../pages/LoadingSpinner/LoadingSpinner';

const UserFeedBack = () => {
    const axiosSecure=useAxiosSecure()
    const {data:message,isLoading,isError}=useQuery({
        queryKey:['message'],
        queryFn:async()=>{
         try {
            const res=await axiosSecure.get('/user/message')
            return res.data
         } catch (error) {
            console.log(error)
         }
        }
    })
    if(isLoading) return <LoadingSpinner/>
    if(isError) return <p>{isError.message}</p>
    return (
        <div>
            <h1>UserFeedback</h1>
            {
                message?.map(mess=><Message key={mess._id} message={mess}></Message>)
            }
        </div>
    );
};

export default UserFeedBack;