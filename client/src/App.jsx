import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './App/pages/Auth/Login'
import Register from './App/pages/Auth/Register'
 
import AdminDashboard from './App/pages/Admin/AdminDashboard'
import UsersList from './App/pages/Admin/UserList'
import TasksTable from './App/pages/Admin/TasksTables'
import CreateTask from './App/pages/Admin/CreateTask'
import UserProfile from './App/pages/Admin/UserProfile'
import UserDashboard from './App/pages/users/UserDashboard'
import DashboardLayout from './App/pages/users/DashboardLayout'
import UserTasks from './App/pages/users/UserTasks'
import UserDocuments from './App/pages/users/UserDocuments'
import AdminProtectedRoute from './App/utils/ProtectRoutes'

const App = () => {
  return (
   <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/signup" element={<Register />} />

     <Route element={<AdminProtectedRoute />}>
    <Route path="/admin" element={<AdminDashboard />}>
      <Route index element={<UserProfile />} />
      <Route path="users" element={<UsersList />} />
      <Route path="tasks" element={<TasksTable />} />
      <Route path="CreateTasks" element={<CreateTask />} />
    </Route>
  </Route>

   <Route path="/user" element={ <DashboardLayout/>}>
      <Route index element={ <UserDashboard/> } />
      <Route path="tasks" element={ <UserTasks/> } />
      <Route path="documents" element={ <UserDocuments/> } />
   </Route>
   </Routes>
  )
}

export default App
