import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState("table");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });
 
  const handleMakeHR = async (id) => {
    await axiosSecure.patch(`/users/${id}`, { role: "HR" });
    refetch();
  };

  const handleFire = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be fired and unable to login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, fire!",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/users/${id}`, { status: "fired" });
      Swal.fire("Fired!", "User has been fired.", "success");
      refetch();
    }
  };

  const handleSalaryUpdate = async (id, currentSalary) => {
    const { value: increaseAmount } = await Swal.fire({
      title: "Increase Salary",
      input: "number",
      inputLabel: `Current Salary: ৳${currentSalary}`,
      inputPlaceholder: "Enter increase amount (e.g. 1000)",
      inputAttributes: { min: 1 },
      showCancelButton: true,
    });

    const increase = parseInt(increaseAmount);
    if (increase && increase > 0) {
      const updatedSalary = currentSalary + increase;
      await axiosSecure.patch(`/users/${id}`, { salary: updatedSalary });
      Swal.fire("Updated!", `Salary increased to ৳${updatedSalary}`, "success");
      refetch();
    } else if (increaseAmount) {
      Swal.fire("Error", "Enter a positive number greater than 0", "error");
    }
  };

  return (
    <div className="p-4  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">All Verified Employees</h2>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="btn btn-sm btn-primary"
        >
          Toggle to {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-black dark:text-white">
                <th>Name</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Role</th>
                <th>Make HR</th>
                <th>Fire</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-black dark:text-white">
                  <td>{user.name}</td>
                  <td>{user.designation}</td>
                  <td>৳{user.salary}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "HR" ? (
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => handleMakeHR(user._id)}
                      >
                        Make HR
                      </button>
                    ) : (
                      <span className="text-gray-500">Already HR</span>
                    )}
                  </td>
                  <td>
                    {user.status === "fired" ? (
                      <span className="text-red-500 font-semibold">Fired</span>
                    ) : (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleFire(user._id)}
                      >
                        Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="card bg-gray-50 dark:bg-base-100 shadow text-black dark:text-white"
            >
              <div className="card-body">
                <h2 className="card-title poppins-regular">{user.name}</h2>
                <p className="inter">Designation: {user.designation}</p>
                <p className="inter">Salary: ৳{user.salary}</p>
                <p className="inter">Role: {user.role}</p>
                <div className="mt-2 flex gap-2">
                  {user.role !== "hr" && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMakeHR(user._id)}
                    >
                      Make HR
                    </button>
                  )}
                  {user.status === "fired" ? (
                    <span className="text-red-500 font-bold">Fired</span>
                  ) : (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleFire(user._id)}
                    >
                      Fire
                    </button>
                  )}
                </div>
                <button
                  className="bg-blue-700 py-1 text-white rounded inter hover:bg-blue-900 translate-0.5 cursor-pointer mt-2"
                  onClick={() =>
                    handleSalaryUpdate(user._id, parseInt(user.salary))
                  }
                >
                  Increase Salary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
