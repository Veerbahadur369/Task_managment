import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


const AdminProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const navigateTo = (path) => {
    navigate(path);
  }
  useEffect(() => {
    // Check authentication and role on component mount
    if (!user?.name) {
      navigateTo("/");
    } else if (user?.role !== "admin") {
      navigateTo("/unauthorized");
    }
  }, [user, navigateTo]);
  // Not logged in
  if (!user) {
    return navigateTo("/");
     
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return navigateTo("/unauthorized");
  }

  // Admin user → allow access
  return <>{children ? children : <Outlet />}</>;
};

export default AdminProtectedRoute;
