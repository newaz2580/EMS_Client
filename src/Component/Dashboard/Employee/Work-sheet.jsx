import React, {useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from '@tanstack/react-query'
  // let [isOpen, setIsOpen] = useState(true)

// returns user.email
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosSecure=useAxiosSecure()

  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [workList, setWorkList] = useState([]);
  const [editing, setEditing] = useState(null);


 




  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWork = {
      email: user?.email,
      tasks,
      hours: Number(hours),
      date: startDate.toISOString().split("T")[0],
    };
    try {
        const res=await axiosSecure.post('/workSheet',newWork)
        console.log(res.data)
        toast.success('Data added Successfully')
          refetch()
        
    } catch (error) {
        console.log(error)
    } 
  
   
  };
const handleUpdate=()=>{

}
  const {data:workList,isLoading,isError,refetch}=useQuery({
          queryKey:['workSheet',user?.email],
          queryFn:async()=>{
            const res=await axiosSecure(`/workSheet?email=${user?.email}`)
            return res.data
          
          }
        })
        // console.log(workList)
const handleDelete=async(id)=>{
  
  try {
    const data=await axiosSecure.delete(`/workSheet/${id}`)
    if(data.data.deletedCount){
      toast.success('Deleted Successful')
      refetch()
    }
  } catch (error) {
    console.log(error)
  }
}

 if(isLoading) return <p>Loading......</p>
   if (isError) return <p>Error: {error.message}</p>;

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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add 
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
          {workList?.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.tasks}</td>
              <td className="p-2">{item.hours}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">
                <button onClick={handleUpdate} className="text-blue-600 mr-3 cursor-pointer">🖊</button>
                <button onClick={()=>handleDelete(item._id)}  className="text-red-600 cursor-pointer">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[350px]">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <select
              value={editing.tasks}
              onChange={(e) => setEditing({ ...editing, tasks: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            >
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
              <option value="Paper-work">Paper-work</option>
            </select>

            <input
              type="number"
              value={editing.hours}
              onChange={(e) => setEditing({ ...editing, hours: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />

            <DatePicker
              selected={new Date(editing.date)}
              onChange={(date) =>
                setEditing({ ...editing, date: date.toISOString().split("T")[0] })
              }
              className="border p-2 rounded mb-4 w-full"
              dateFormat="yyyy-MM-dd"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
