import DatePicker from "react-datepicker"
const WorkSheetModal=({editing,setEditing,handleUpdate})=> {
  return (
    <>
     {editing && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[350px]">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <select
              value={editing.tasks}
              onChange={(e) =>
                setEditing({ ...editing, tasks: e.target.value })
              }
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
              onChange={(e) =>
                setEditing({ ...editing, hours: e.target.value })
              }
              className="border p-2 rounded mb-2 w-full"
            />

            <DatePicker
              selected={new Date(editing.date)}
              onChange={(date) =>
                setEditing({
                  ...editing,
                  date: date.toISOString().split("T")[0],
                })
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
                onClick={handleUpdate}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default WorkSheetModal