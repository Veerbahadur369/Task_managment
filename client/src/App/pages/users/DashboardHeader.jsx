import React from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const DashboardHeader = ({ name }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="max-w-5xl mx-auto bg-linear-to-r from-emerald-600 to-teal-500 rounded-3xl p-0.5 shadow-xl">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 sm:p-6">
        <div className="flex items-center gap-5">
          <FaUser className="text-emerald-600 dark:text-emerald-400 text-5xl" />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
             Welcome, {name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              User Dashboard
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
