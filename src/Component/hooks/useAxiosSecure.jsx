import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useAuth();

  useEffect(() => {
    // Changed: Use axiosSecure instance here instead of default axios
    const interceptor = axiosSecure.interceptors.response.use(
      res => res,
      async error => {
        // No change here, just added optional chaining for safety
        if (error.response?.status === 401 || error.response?.status === 403) {
          await userLogout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Added: Cleanup interceptor when component unmounts to avoid memory leaks
    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [navigate, userLogout]);

  return axiosSecure;
};

export default useAxiosSecure;
