// components/CreateTask.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = () => {
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      status: "pending",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/admin/allusers",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axios.post(
        "http://localhost:4000/api/admin/createtask",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Task created successfully!");
      reset();
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task");
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          Create Task
        </h2>

        {/* Task Title */}
        <input
          {...register("title", { required: "Task title is required" })}
          className="w-full p-2 rounded border"
          placeholder="Task Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Task Description */}
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full p-2 rounded border"
          placeholder="Task Description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Assign to User */}
        <select
          {...register("assignedTo", { required: "Select a user" })}
          className="w-full p-2 rounded border"
        >
          <option value="">Assign to user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {errors.assignedTo && (
          <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
        )}

        {/* Task Status */}
        <select {...register("status")} className="w-full p-2 rounded border">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
          Create Task
        </button>
      </motion.form>
    </>
  );
};

export default CreateTask;
