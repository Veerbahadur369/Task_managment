import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import InfoCard from "./InfoCard";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.id) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <section className="space-y-8">
      <DashboardHeader name={user.name} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoCard 
          icon={<FaEnvelope />}
          label="Email Address"
          value={user.email}
        />

        <InfoCard
          icon={<FaUserTag />}
          label="Role"
          value={user.role}
          capitalize
        />
          
      </div>
    </section>
  );
};

export default UserDashboard;
