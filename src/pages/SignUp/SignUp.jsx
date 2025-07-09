import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../Component/hooks/useAuth";
import { toast } from "react-toastify";
import SignupWithGoogle from "../SignupWithGoogle/SignupWithGoogle";
import { uploadImage } from "../../Api/Utils";

const Signup = () => {
    const {createUserSignupAccount,updateUserProfile}=useAuth()
    const [userRole,setUserRole]=useState('')
    const handleRegistrationForm =async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const bank_account_no = form.account_no.value;
    const salary = form.salary.value;
    const image = form?.image?.files[0];
    const imageURL=await uploadImage(image)
  
    console.log({name, email, password, bank_account_no, salary, imageURL,userRole});
    //save firebase
    try {
        const result=await createUserSignupAccount(email,password)
        console.log(result)
        toast.success('SignUp successful')
        await updateUserProfile(name,imageURL)

    } catch (error) {
        console.log(error)
    }

  };
  return (
    <div>
      <section classNameName="bg-gray-50 dark:bg-gray-900">
        <div classNameName="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
          <div classNameName="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div classNameName="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 classNameName="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                onSubmit={handleRegistrationForm}
                classNameName="space-y-4 md:space-y-6"
                action="#"
              >
                <div classNameName="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div classNameName="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="account"
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Bank Account no
                    </label>
                    <input
                      type="number"
                      name="account_no"
                      id="Account"
                      classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Account no"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="salary"
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      id="salary"
                      placeholder="your salary"
                      classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div classNameName="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="user_avatar"
                    >
                      Upload file
                    </label>
                    <input
                      classNameName="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                      name="image"
                      accept="image/*"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="countries"
                      classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select your Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={userRole}
                      onChange={(e)=>setUserRole(e.target.value)}
                      classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>hr</option>
                      <option>employee</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    classNameName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  classNameName="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <SignupWithGoogle/>
                <p classNameName="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/signup"
                    classNameName="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
