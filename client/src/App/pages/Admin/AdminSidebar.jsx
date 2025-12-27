// components/AdminSidebar.jsx
import { motion } from "framer-motion";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-emerald-700 text-white p-6 flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <nav className="space-y-4 flex-1">
        <Link to="/admin" className="pb-3">
        <button className="w-full text-left px-4 py-2 rounded-lg  hover:bg-emerald-600 focus:bg-emerald-600">
          Dashboard
        </button>
        </Link>
        <Link to="/admin/users" className="pb-3">
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-600 focus:bg-emerald-600">
          Users
        </button>
        </Link>
        <Link to="/admin/tasks" className="pb-3">
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-600 focus:bg-emerald-600">
          All Tasks
        </button>
        </Link>

        <Link to="/admin/CreateTasks" className="pb-3">
        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-600 focus:bg-emerald-600">
           <MdAdd className="inline mr-2 text-3xl"/> Create Task
        </button>
        </Link>
      </nav>

      <button className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
        Logout
      </button>
    </motion.aside>
  );
};

export default AdminSidebar;
