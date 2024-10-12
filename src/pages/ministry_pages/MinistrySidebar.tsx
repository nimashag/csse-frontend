import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHospital, FaUserDoctor } from "react-icons/fa6";
import { RiHome3Line } from "react-icons/ri";
import './MinistrySidebar.css';

const MinistrySidebar: React.FC = () => {
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
                                <Link to="/dashboard">
                                    <RiHome3Line/> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-hospital">
                                    <FaHospital/> Add Hospital
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-hospitals">
                                    <FaHospital/> All Hospitals
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-doctor">
                                    <FaUserDoctor/> Add Doctor
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-doctors">
                                    <FaUserDoctor/> All Doctors
                                </Link>
                            </li>
                        </div>
                        <div className='mt-40'>
                            <h1 className='font-bold'>ACCOUNT</h1>
                            <li>
                                <Link to="/profile">
                                    <CgProfile /> Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout">
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

export default MinistrySidebar;
