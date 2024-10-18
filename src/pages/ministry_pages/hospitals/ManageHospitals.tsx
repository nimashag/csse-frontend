import React, { useEffect, useState } from 'react';
import MinistrySidebar from '../MinistrySidebar.tsx';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import config from "../../../constants/config";
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
    const [deleteHospitalId, setDeleteHospitalId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch(`${config.backend_url}/api/hospitals`);
            const data = await response.json();
            setHospitals(data);
            setTotalHospitals(data.length);
        };
        fetchHospitals();
    }, []);

    const confirmDelete = (hospitalId: string) => {
        setDeleteHospitalId(hospitalId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (deleteHospitalId) {
            try {
                const response = await fetch(`${config.backend_url}/api/hospitals/${deleteHospitalId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setHospitals(hospitals.filter(hospital => hospital.hospitalId !== deleteHospitalId));
                    setShowDeleteModal(false);
                } else {
                    alert('Failed to delete hospital.');
                }
            } catch (error) {
                console.error('Error deleting hospital:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const indexOfLastHospital = currentPage * hospitalsPerPage;
    const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;

    // Filter hospitals based on the search query
    const filteredHospitals = hospitals.filter(hospital =>
        hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.hospitalType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);
    const totalFilteredHospitals = filteredHospitals.length; // Update total hospitals count based on search

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-layout">
            <MinistrySidebar />
            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <div className="user-info">
                            <h2 className="text-3xl font-semibold">Manage Hospitals</h2>
                        </div>
                    </div>
                    <div className="header-right flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery} // Bind the input value to the searchQuery state
                            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
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
                                        onClick={() => navigate(`/update-hospital/${hospital.hospitalId}`)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(hospital.hospitalId)}
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

                <div className="mt-4 flex justify-center">
                    {Array.from({ length: Math.ceil(totalFilteredHospitals / hospitalsPerPage) }, (_, index) => (
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

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default ManageHospitals;
