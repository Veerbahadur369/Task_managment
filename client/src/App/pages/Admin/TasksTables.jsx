// components/TasksTable.jsx
import axios from "axios";
import { useEffect, useState } from "react";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/alltasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/admin/tasks/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
        Tasks
      </h2>

      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Description</th>
            <th className="px-3 py-2">Assigned User</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="px-3 py-2">{t.title}</td>
              <td className="px-3 py-2">{t.description}</td>
              <td className="px-3 py-2">{t.assignedUser}</td>
              <td className="px-3 py-2">
                <select
                  value={t.status}
                  onChange={(e) => updateStatus(t.id, e.target.value)}
                  className="p-1 rounded border text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
