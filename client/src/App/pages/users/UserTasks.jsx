import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaClipboardCheck,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const statusStyles = {
  completed: {
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
    icon: <FaClipboardCheck />,
  },
  pending: {
    color: "text-yellow-600",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    icon: <FaClock />,
  },
  cancelled: {
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
    icon: <FaTimesCircle />,
  },
};

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks || []);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <FaTasks className="text-emerald-600 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Tasks
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 dark:text-gray-400">
          Loading tasks...
        </p>
      )}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center">
          <FaTasks className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No tasks assigned yet.
          </p>
        </div>
      )}

      {/* Tasks Grid */}
      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const status = statusStyles[task.status] || {};

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 space-y-4"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  {task.description}
                </p>

                {/* Status */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                  ${status.bg} ${status.color}`}
                >
                  {status.icon}
                  {task.status}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default UserTasks;
