import React from 'react';
import {MdEventAvailable} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHome3Line, RiHospitalLine  } from "react-icons/ri";
import '../lab_tech_pages/SampleSidebarLab.css';


const HealthSidebar :React.FC= () => {
  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2 className='font-bold text-center'>MEDILINK</h2>
          <hr className='mt-5'/>
        </div>
        <nav className="nav">
          <ul>
            <div className='mt-10'>
            <li>
              <Link to="/hcm-dashboard">
              <RiHome3Line /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-wardinfo">
              <FaUserDoctor /> Manage Ward Heads
              </Link>
            </li>
            <li>
              <Link to="/all-receptionistinfo">
              <MdEventAvailable /> Manage Receptionist
              </Link>
            </li>
            <li>
              <Link to="/add-labinfo">
              <RiHospitalLine  /> Manage Lab Techs
              </Link>
            </li>
            <li>
              <Link to="/all-wardroomsinfo">
              <FaUserDoctor /> Manage Ward Rooms
              </Link>
            </li>
            <li>
              <Link to="/all-labroomsinfo">
              <MdEventAvailable /> Manage Lab Rooms
              </Link>
            </li>
            <li>
              <Link to="/all-operations">
              <RiHospitalLine  /> Manage Operations
              </Link>
            </li>
            <li>
              <Link to="">
              <RiHospitalLine  /> Staff Reports
              </Link>
            </li>
            </div>

            <div className='mt-20'>
            <h1 className='font-bold'>ACCOUNT</h1>
            <li>
              <Link to="">
              <CgProfile /> Profile
              </Link>
            </li>
            <li>
              <Link to="">
              <IoLogOutOutline /> Logout
              </Link>
            </li>
            </div>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default HealthSidebar;
