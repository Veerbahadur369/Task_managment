import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEnvelope, FaKey } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post('http://localhost:4000/api/users/register', { ...data, role })
    .then((response) => { console.log(response.data); 
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);
    })
    .catch((error) => { 
        console.error("Registration Error:", error);
        toast.error(error.response?.data?.message || "Registration failed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

    });

   
    console.log("Registration Data:", { ...data, role });
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 via-emerald-100 to-green-200 px-4">
        <ToastContainer/>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700 mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Register as User or Admin
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-4 text-emerald-500" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs sm:text-sm">
              {errors.name.message}
            </p>
          )}

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-4 text-emerald-500" />
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-emerald-500" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm">
              {errors.password.message}
            </p>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Register As
            </label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                  className="accent-emerald-600"
                />
                User
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="accent-emerald-600"
                />
                Admin
              </label>
            </div>
          </div>

          {/* Admin Passkey */}
          {role === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <FaKey className="absolute top-3.5 left-4 text-emerald-500" />
              <input
                type="password"
                placeholder="Admin Passkey"
                {...register("adminkey", {
                  required: "Passkey is required for admin",
                })}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm sm:text-base"
              />
              {errors.passkey && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.passkey.message}
                </p>
              )}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:bg-emerald-700 transition-all text-sm sm:text-base"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
