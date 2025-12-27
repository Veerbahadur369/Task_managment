
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoute = () => {
    const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // If user not logged in
  if (!user) {
    return navigate('/');
  }

  // If user is not admin
  if (user.role !== "admin") {
    return navigate('/admin');
  }

  // If admin → allow access
  
};

export default AdminProtectedRoute;
