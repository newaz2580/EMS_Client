import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../Component/hooks/useAuth";
import { toast } from "react-toastify";
import SignupWithGoogle from "../SignupWithGoogle/SignupWithGoogle";
import { saveUserInfo, uploadImage } from "../../Api/Utils";

const Signup = () => {
  const { createUserSignupAccount, updateUserProfile } = useAuth();
  const [userRole, setUserRole] = useState("");

  const handleRegistrationForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const designation = form.designation.value;
    const email = form.email.value;
    const password = form.password.value;
    const bank_account_no = form.account_no.value;
    const salary = form.salary.value;
    const image = form?.image?.files[0];
    const imageURL = await uploadImage(image);

    //save firebase
    try {
      const result = await createUserSignupAccount(email, password);
      console.log(result);
      toast.success("SignUp successful");
      await updateUserProfile(name, imageURL);
      const userData = {
        name,
        designation,
        email,
        bank_account_no,
        salary,
        imageURL,
        Role: userRole,
      };
      console.log(userData);
      await saveUserInfo(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                onSubmit={handleRegistrationForm}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Designation"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder=" Sales Assistant, Social Media executive, Digital Marketer"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="account"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Bank Account no
                    </label>
                    <input
                      type="number"
                      name="account_no"
                      id="Account"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Account no"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="salary"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      id="salary"
                      placeholder="your salary"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="user_avatar"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select your Role
                    </label>
                    <select
                      name="role"
                      required
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" disabled>
                        -- Select Role --
                      </option>
                      <option value="Employee">Employee</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <SignupWithGoogle />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
