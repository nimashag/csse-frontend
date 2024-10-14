import React from 'react';
import {MdEventAvailable} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHome3Line, RiHospitalLine  } from "react-icons/ri";
import '../lab_tech_pages/SampleSidebarLab.css';
import { useLocation } from "react-router-dom";

const DocSidebar :React.FC= () => {

  const location = useLocation();
  const doctor = location.state?.doctor;
  console.log(`logged in doctor: ${JSON.stringify(doctor)}`);

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
              <Link to={`/doc-dashboard`} state={{ doctor }}>
              <RiHome3Line /> Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/doc-dashboard`} state={{ doctor }}>
              <FaUserDoctor /> My Patients
              </Link>
            </li>
            <li>
              <Link to={`/patient-appointment`} state={{ doctor }}>
              <MdEventAvailable /> Patient Appointments
              </Link>
            </li>
            <li>
              <Link to={`/asigned-hos`} state={{ doctor }}>
              <RiHospitalLine  /> My Hospitals
              </Link>
            </li>
            </div>

            <div className='mt-40'>
            <h1 className='font-bold'>ACCOUNT</h1>
            <li>
              <Link to={`/doc-dashboard`} state={{ doctor }}>
              <CgProfile /> Profile
              </Link>
            </li>
            <li>
              <Link to="/doctor-login">
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

export default DocSidebar;
