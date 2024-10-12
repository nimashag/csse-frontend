import React, { useEffect, useState } from 'react';
import MinistrySidebar from './MinistrySidebar.tsx';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from "../../constants/config";

interface Hospital {
    hospitalId: string;
    hospitalName: string;
    hospitalEmail: string;
    area: string;
    contactNumber: string;
    hospitalType: string;
}

const ManageHospitals: React.FC = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hospitalsPerPage] = useState(10);
    const [totalHospitals, setTotalHospitals] = useState(0);

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch(`${config.backend_url}/api/hospitals`);
            const data = await response.json();
            setHospitals(data);
            setTotalHospitals(data.length); // Set the total hospitals count
        };
        fetchHospitals();
    }, []);

    const handleDelete = async (hospitalId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this hospital?');
        if (confirmed) {
            try {
                const response = await fetch(`${config.backend_url}/api/hospitals/${hospitalId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setHospitals(hospitals.filter(hospital => hospital.hospitalId !== hospitalId));
                } else {
                    alert('Failed to delete hospital.');
                }
            } catch (error) {
                console.error('Error deleting hospital:', error);
            }
        }
    };

    // Get current hospitals for the current page
    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
    const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

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
                            <h2 className="text-3xl font-semibold">Manage Hospitals</h2>
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
                            <Link to='/add-hospital'>+ Add Hospital</Link>
                        </button>
                    </div>
                </header>

                {/* Hospitals Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Hospital Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Area</th>
                            <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentHospitals.map(hospital => (
                            <tr key={hospital.hospitalId}>
                                <td className="border border-gray-300 px-4 py-2">{hospital.hospitalName}</td>
                                <td className="border border-gray-300 px-4 py-2">{hospital.hospitalEmail}</td>
                                <td className="border border-gray-300 px-4 py-2">{hospital.area}</td>
                                <td className="border border-gray-300 px-4 py-2">{hospital.contactNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{hospital.hospitalType}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => window.open(`/update-hospital/${hospital.hospitalId}`, '_blank')}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hospital.hospitalId)}
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
                    {Array.from({ length: Math.ceil(totalHospitals / hospitalsPerPage) }, (_, index) => (
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

export default ManageHospitals;
