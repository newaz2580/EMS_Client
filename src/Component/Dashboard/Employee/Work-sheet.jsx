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
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const newWork = {
      name: user.displayName,
      email: user?.email,
      tasks,
      hours: Number(hours),
      date: startDate.toISOString().split("T")[0],
    };
    try {
      const res = await axiosSecure.post("/workSheet", newWork);
      toast.success("✅ Task added successfully!");
      refetch();
      setTasks("");
      setHours("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to add task");
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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      const data = await axiosSecure.delete(`/workSheet/${id}`);
      if (data.data.deletedCount) {
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        refetch();
      }
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
        toast.success("✅ Task updated!");
        setEditing(null);
        refetch();
      } else {
        toast.warning("⚠️ No changes detected.");
      }
    } catch (error) {
      toast.error("❌ Update failed.");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500 dark:text-red-400">Error loading data</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        📝 Work Sheet
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 items-center"
      >
        <select
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          className="select select-bordered w-full dark:bg-gray-800 dark:text-white"
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
          className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          required
        />

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="input input-bordered w-full dark:bg-gray-800 dark:text-white"
          dateFormat="yyyy-MM-dd"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full bg-white dark:bg-gray-800 dark:text-white rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {workList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 dark:text-gray-400">
                  No tasks added yet.
                </td>
              </tr>
            ) : (
              workList.map((item) => (
                <tr
                  key={item._id}
                  className="text-black dark:text-white"
                >
                  <td>{item.tasks}</td>
                  <td>{item.hours}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      onClick={() => setEditing(item)}
                      className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                    >
                      🖊 Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <WorkSheetModal
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default WorkSheet;
