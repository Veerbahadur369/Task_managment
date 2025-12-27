import React from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../redux/Slicers/user.slice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => { 
    console.log("Login Data:", data);

    axios
      .post("http://localhost:4000/api/users/login", data)
      .then((response) => {

        console.log("Login Response:", response.data);
        localStorage.setItem("token", response.data.token);
        dispatch(userData({user:response.data.user}));
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setTimeout(()=>{
            if (response.data.user.role === "admin") {
                navigate("/admin");
            }   
            else {
               navigate('/user')
            }
        },2000);

      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 via-emerald-100 to-green-200 p-4">
           <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Please login to your account
        </p>
      
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <FaUserAlt className="absolute top-3.5 left-4 text-emerald-500" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-emerald-500" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:bg-emerald-700 transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup"> 
            <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
