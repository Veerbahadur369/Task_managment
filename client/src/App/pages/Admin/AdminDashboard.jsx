import axios from 'axios';
import React, { use, useEffect } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import UserProfile from './UserProfile';
 

function AdminDashboard() {
      const fatchAllUsers=async()=>{
        try{
            axios.get('http://localhost:4000/api/admin/allusers',{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
          }).then((response)=>{
            console.log("All Users:",response.data);
          })
        }
        catch(error){
            console.error("Error fetching users:",error);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
        fatchAllUsers();

    }, [])
  return (
      
    <div className="flex min-h-screen bg-emerald-50 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
          Admin Task Dashboard
        </h1>
        
          
        <Outlet/>
       
      </main>
    </div> 
  );
   
}

export default AdminDashboard
