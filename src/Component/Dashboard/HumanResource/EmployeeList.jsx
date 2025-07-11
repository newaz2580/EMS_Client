import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users");
      

      return res.data;
    },
  });
  console.log(data);

const handleVerified = async (id) => {
  try {
    const { data } = await axiosSecure.patch(`/users/${id}`);

    if (data.modifiedCount > 0) {
      toast.success("Verified successful");
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to verify user");
  }
};

  return (
    <div>
      <table className="w-full border text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Bank Account</th>
            <th>Salary</th>
            <th>Pay</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="border ">
          {data?.map((userData) => (
            <tr key={userData._id}>
              <td>{userData.name}</td>
              <td>{userData.email}</td>
              <td>{userData.isVerified ?
               <button>✅</button> : 
                <button onClick={()=>handleVerified(userData._id)}>❌</button>}</td>
              <td>{userData.bank_account_no}</td>
              <td>{userData.salary}</td>
              <td>pay</td>
              <th>detail</th>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <table></table>
    </div>
  );
};

export default EmployeeList;
