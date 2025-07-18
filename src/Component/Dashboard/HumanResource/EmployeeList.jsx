import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import PayModal from "./PayModal";
import { Link } from "react-router";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  // Toggle verified status
  const handleVerified = async (id, isVerified) => {
    try {
      const { data } = await axiosSecure.patch(`/users/${id}`, {
        isVerified: !isVerified,
      });

      if (data.modifiedCount > 0) {
        toast.success("Verified status updated");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update verification");
    }
  };

  // Handle payment modal open
  const handlePayment = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-5 bg-white dark:bg-gray-900 p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Employee List
      </h2>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Verified</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Bank Account</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Pay</th>
            <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Details</th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-100">
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-400">
                No employees found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleVerified(user._id, user.isVerified)}
                    className="text-2xl"
                    title="Toggle Verification"
                    aria-label={user.isVerified ? "Verified" : "Not verified"}
                  >
                    {user.isVerified ? "✅" : "❌"}
                  </button>
                </td>
                <td className="px-6 py-4 text-center">{user.bank_account_no || "N/A"}</td>
                <td className="px-6 py-4 text-center font-semibold">৳ {user.salary}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    disabled={!user.isVerified}
                    onClick={() => handlePayment(user)}
                    className={`px-4 py-1 rounded-md text-white font-medium transition-colors duration-200 ${
                      user.isVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    title={user.isVerified ? "Make Payment" : "User not verified"}
                  >
                    Pay
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/dashboard/employeeDetails/${user.email}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition-colors duration-200">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedUser && (
        <PayModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userData={selectedUser}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default EmployeeList;
