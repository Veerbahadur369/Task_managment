import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa";

function UserProfile() {
  const { user } = useSelector((state) => state.user);
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="relative max-w-md mx-auto rounded-3xl p-[2px] 
                 bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl"
    >
      {/* Inner Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="relative"
          >
            <FaUserCircle className="text-emerald-600 dark:text-emerald-400 text-7xl drop-shadow-lg" />
          </motion.div>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-800 dark:text-white tracking-wide">
            {user.name}
          </h2>

          <span className="mt-2 px-4 py-1 text-xs font-semibold rounded-full 
                           bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 uppercase">
            {user.role}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent mb-5" />

        {/* Info Section */}
        <div className="space-y-4 text-sm">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 p-3 rounded-xl 
                       bg-gray-50 dark:bg-gray-800"
          >
            <FaEnvelope className="text-emerald-600 dark:text-emerald-400 text-lg" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {user.email}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-4 p-3 rounded-xl 
                       bg-gray-50 dark:bg-gray-800"
          >
            <FaUserShield className="text-emerald-600 dark:text-emerald-400 text-lg" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Access Level
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                {user.role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfile;
