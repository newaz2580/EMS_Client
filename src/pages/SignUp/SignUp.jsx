import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Component/hooks/useAuth";
import { toast } from "react-toastify";
import SignupWithGoogle from "../SignupWithGoogle/SignupWithGoogle";
import { saveUserInfo, uploadImage } from "../../Api/Utils";

const Signup = () => {
  const { createUserSignupAccount, updateUserProfile } = useAuth();
  const [userRole, setUserRole] = useState("");
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

 const handleRegistrationForm = async (e) => {
  setLoading(true);
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const designation = form.designation.value;
  const email = form.email.value;
  const password = form.password.value;
  const bank_account_no = form.account_no.value;
  const salary = form.salary.value;
  const image = form?.image?.files[0];

  // Password validation: At least 1 uppercase, 1 lowercase, and 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
  if (!passwordRegex.test(password)) {
    toast.error("Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character.");
    setLoading(false);
    return;
  }

  try {
    const imageURL = await uploadImage(image);
    const result = await createUserSignupAccount(email, password);
    toast.success("Sign up successful!");
    await updateUserProfile(name, imageURL);
    navigate("/");

    const userData = {
      name,
      designation,
      email,
      bank_account_no,
      salary,
      imageURL,
      role: userRole,
    };
    await saveUserInfo(userData);
    navigate("/");
  } catch (error) {
    toast.error(error?.message || "Signup failed. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form onSubmit={handleRegistrationForm} className="space-y-4">
              {/* Name and Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g., Sales Assistant"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Account no & Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Account No
                  </label>
                  <input
                    type="number"
                    name="account_no"
                    placeholder="1234567890"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Salary (৳)
                  </label>
                  <input
                    type="number"
                    name="salary"
                    placeholder="e.g., 50000"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Image & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="file-input file-input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select Role
                  </label>
                  <select
                    name="role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      -- Select Role --
                    </option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              <button disabled={loading} type="submit" className="btn btn-primary w-full">
                {loading ? <span className="loading loading-spinner loading-sm text-white"></span>:'Create an account'}
              </button>
            </form>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
              <SignupWithGoogle />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
