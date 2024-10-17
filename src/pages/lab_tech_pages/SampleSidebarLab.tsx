import React from 'react';
import {MdEventAvailable} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrWorkshop } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHome3Line } from "react-icons/ri";
import './SampleSidebarLab.css';


const SampleSidebarLab :React.FC= () => {
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
              <Link to="">
              <RiHome3Line /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="">
              <FaUserDoctor /> Assigned Doctors
              </Link>
            </li>
            <li>
              <Link to="">
              <MdEventAvailable /> Lab Appoinments
              </Link>
            </li>
            <li>
              <Link to="">
              <GrWorkshop /> Work Hours
              </Link>
            </li>
            </div>
            <div className='mt-40'>
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

export default SampleSidebarLab;
