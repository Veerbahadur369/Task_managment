// components/UsersList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/admin/allusers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(res.data.users);
    };

    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
        All Users
      </h2>

      <ul className="grid md:grid-cols-2 gap-3">
        {users.map((u) => (
          <li
            key={u._id}
            className="flex items-center gap-3 bg-emerald-50 dark:bg-gray-700 p-3 rounded-lg"
          >
            <FaUser className="text-emerald-600" />
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default UsersList;
