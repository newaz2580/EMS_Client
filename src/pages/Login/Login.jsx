import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Component/hooks/useAuth";
import { toast } from "react-toastify";
import SignupWithGoogle from "../SignupWithGoogle/SignupWithGoogle";
import { saveUserInfo } from "../../Api/Utils";

const Login = () => {
  const {signInUser}=useAuth()
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleLogin=(e)=>{
  e.preventDefault()
  setLoading(true)
  const form=e.target;
  const email=form.email.value;
  const password=form.password.value;
  // console.log(email,password)
  signInUser(email,password)
  .then(result=>{
    // console.log(result)
     const name=result.user.displayName;
            const email=result.user.email;
            const photoURL=result.user.photoURL;
            const userData={name,email,photoURL}
            userData.designation='Sales Assistant';
            userData.bank_account_no='254687562322';
            userData.salary='25000';
            userData.status='active'
            userData.userRole="Employee"
            saveUserInfo(userData)
            toast.success('Login Successful')
            navigate('/')
            setLoading(false)
  }).catch(error=>{
    toast.error(error)
    setLoading(false)
  })
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  
                </div>
               
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? <span className='loading loading-spinner loading-sm'></span>:'Login'}
                </button>
                
               
              </form>
               <p className="text-sm mt-2 font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                   to='/signup'
                    className="font-medium  text-primary-600 hover:underline dark:text-primary-500"
                  >
                    SignUp
                  </Link>
                </p>
              <div>
                  <SignupWithGoogle/>
                  
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
