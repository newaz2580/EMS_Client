import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure=axios.create({
baseURL:import.meta.env.VITE_API_KEY,
withCredentials:true
})

const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {userLogout}=useAuth()
    useEffect(()=>{
    axios.interceptors.response.use(
        res=>{
    return res
},
async error=>{
    console.log(error.response)
    if(error.response.status===401 || error.response.status===403){
        userLogout()
        navigate('/login')
    }
    return Promise.reject(error);
}
)
    },[navigate,userLogout])
    return axiosSecure
};

export default useAxiosSecure;