import React from "react";
import { useAuthStore } from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import ProfilePage from "@/components/Profile";

const Dashboard: React.FC = () => {
  const { user, logOutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser(); // Clear the Zustand store
    alert("Logged out successfully!");
    navigate("/"); // Redirect to login page after logout
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.displayName || "User"}!</h2>
        <p className="text-lg">Email: {user.email}</p>
        {/* Add any other user details here */}
        
        <button
          className="mt-6 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <ProfilePage />
    </div>
  );
};

export default Dashboard;
