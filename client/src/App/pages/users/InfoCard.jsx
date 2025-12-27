import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ icon, label, value, fullWidth, capitalize }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -3 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5
        ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-emerald-600 text-2xl">{icon}</div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p
            className={`font-semibold text-gray-800 dark:text-gray-200 ${
              capitalize ? "capitalize" : ""
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;
 