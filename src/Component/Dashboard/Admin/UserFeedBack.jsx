import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Message from './Message';
import LoadingSpinner from '../../../pages/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const UserFeedBack = () => {
    const axiosSecure=useAxiosSecure()
    const {data:message,isLoading,isError}=useQuery({
        queryKey:['message'],
        queryFn:async()=>{
         try {
            const res=await axiosSecure.get('/user/message')
            return res.data
         } catch (error) {
            toast.error(error)
         }
        }
    })
    if(isLoading) return <LoadingSpinner/>
    if(isError) return <p>{isError.message}</p>
    return (
        <div>
            <h1 className="text-black dark:text-white text-3xl" >UserFeedback</h1>
            <div>
                {
                message?.map(mess=><Message key={mess._id} message={mess}></Message>)
            }
            </div>
        </div>
    );
};

export default UserFeedBack;