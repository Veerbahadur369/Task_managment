import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaTasks, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
     ${
       isActive
         ? "bg-emerald-600 text-white"
         : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
     }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-bold text-emerald-600 mb-6">
        User Panel
      </h2>

      <nav className="space-y-2">
        <NavLink to="/user" end className={linkClass}>
          <FaUser />
          Profile
        </NavLink>

        <NavLink to="/user/tasks" className={linkClass}>
          <FaTasks />
          Tasks
        </NavLink>

        <NavLink to="/user/documents" className={linkClass}>
          <FaFileAlt />
          Documents
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
