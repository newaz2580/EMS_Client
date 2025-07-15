import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WorkSheetModal from "../../../pages/Modal/WorkSheetModal";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Swal from "sweetalert2";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [workList, setWorkList] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const newWork = {
      email: user?.email,
      tasks,
      hours: Number(hours),
      date: startDate.toISOString().split("T")[0],
    };
    try {
      const res = await axiosSecure.post("/workSheet", newWork);
      console.log(res.data);
      toast.success("Data added Successfully");
      refetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const {
    data: workList,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["workSheet", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/workSheet?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log(workList)
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const data = await axiosSecure.delete(`/workSheet/${id}`);
        if (data.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Tasks has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    if (!editing) return;

    const { _id, tasks, hours, date } = editing;

    try {
      const res = await axiosSecure.patch(`/workSheet/${_id}`, {
        tasks,
        hours: Number(hours),
        date,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("✅ Task updated successfully!");
        setEditing(null);
        refetch();
      } else {
        toast.warning("⚠️ No changes detected.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Failed to update task.");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Work Sheet</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-4 mb-6"
      >
        <select
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Task</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>

        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="border p-2 rounded w-32"
          required
        />

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="border p-2 rounded"
          dateFormat="yyyy-MM-dd"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Task</th>
            <th className="p-2">Hours</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workList.length === 0 ? (
            <>
             
                <p className="text-center w-full">No Tasks Added Yet</p>
             
            </>
          ) : (
            <>
              {workList?.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.tasks}</td>
                  <td className="p-2">{item.hours}</td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditing(item)}
                      className="text-blue-600 mr-3 cursor-pointer"
                    >
                      🖊
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <WorkSheetModal
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default WorkSheet;
