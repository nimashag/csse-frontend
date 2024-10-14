import React from 'react'
import SampleSidebarLab from './SampleSidebarLab'
import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const LabManage :React.FC= () => {

    const location = useLocation(); 
    const labtech = location.state?.labtech;
    console.log(`logged in labtech: ${JSON.stringify(labtech)}`);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SampleSidebarLab />

      {/* Main content on the screen */}
      <main className="main-content">

      {/* First Part */}  
      <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Lab Technician Dashboard</h2>
            </div>
          </div>

          {/* Header Left Side */}
          <div className="header-right flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>

            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>

            <img src="https://images.pexels.com/photos/19601385/pexels-photo-19601385/free-photo-of-young-doctor-holding-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=600" className="profile-image" alt="Admin" />
          </div>
        </header>

      </main>
    </div>
  )
}

export default LabManage