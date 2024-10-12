// import React from 'react'
// import MinistrySidebar from './MinistrySidebar.tsx'
// import {FaSearch} from "react-icons/fa";
// import {Link} from "react-router-dom";
//
//
// const ManageDoctors: React.FC = () => {
//     return (
//         <div className="dashboard-layout">
//             {/* Sidebar */}
//             <MinistrySidebar/>
//
//             {/* Main content on the screen */}
//             <main className="main-content">
//
//                 {/* First Part */}
//                 <header className="header">
//                     {/* Header Left Side */}
//                     <div className="header-left">
//                         <div className="user-info">
//                             <h2 className="text-3xl font-semibold">Manage Doctors</h2>
//                         </div>
//                     </div>
//
//                     {/* Header Right Side */}
//                     <div className="header-right flex items-center">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
//                         />
//                         <div className="absolute mt-0.7 ml-4 text-gray-500">
//                             <FaSearch size="15px" />
//                         </div>
//                         <button className="h-10 pl-15 bg-green-600 text-white pr-15 rounded-full shadow-sm w-full border border-gray-300">
//                             <Link to='/add-doctor'>
//                                 + Add Doctor
//                             </Link>
//                         </button>
//                     </div>
//                 </header>
//
//             </main>
//         </div>
//     )
// }
//
// export default ManageDoctors

import React, { useEffect, useState } from 'react';
import MinistrySidebar from './MinistrySidebar.tsx';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from "../../constants/config";

interface Doctor {
    id: string;
    name: string;
    email: string;
    userType: string;
}

const ManageDoctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(10);
    const [totalDoctors, setTotalDoctors] = useState(0);

    useEffect(() => {
        const fetchDoctors = async () => {
            // const response = await fetch(`${config.backend_url}/api/users?userType=DOCTOR`); // TODO: implement filtering by userType in backend
            const response = await fetch(`${config.backend_url}/api/users`);
            const data = await response.json();
            setDoctors(data);
            setTotalDoctors(data.length); // Set the total doctors count
        };
        fetchDoctors();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this doctor?');
        if (confirmed) {
            try {
                const response = await fetch(`${config.backend_url}/api/users/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setDoctors(doctors.filter(doctor => doctor.id !== id));
                } else {
                    alert('Failed to delete doctor.');
                }
            } catch (error) {
                console.error('Error deleting doctor:', error);
            }
        }
    };

    // Get current doctors for the current page
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <MinistrySidebar />

            {/* Main content on the screen */}
            <main className="main-content">
                {/* First Part */}
                <header className="header">
                    {/* Header Left Side */}
                    <div className="header-left">
                        <div className="user-info">
                            <h2 className="text-3xl font-semibold">Manage Doctors</h2>
                        </div>
                    </div>

                    {/* Header Right Side */}
                    <div className="header-right flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
                        />
                        <div className="absolute mt-0.7 ml-4 text-gray-500">
                            <FaSearch size="15px" />
                        </div>
                        <button className="h-10 pl-15 bg-green-600 text-white pr-15 rounded-full shadow-sm w-full border border-gray-300">
                            <Link to='/add-doctor'>+ Add Doctor</Link>
                        </button>
                    </div>
                </header>

                {/* Doctors Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">User Type</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentDoctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td className="border border-gray-300 px-4 py-2">{doctor.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{doctor.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{doctor.userType}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => window.open(`/update-user/${doctor.id}`, '_blank')}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor.id)}
                                        className="ml-4 text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    {Array.from({ length: Math.ceil(totalDoctors / doctorsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ManageDoctors;
