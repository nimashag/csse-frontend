import React, { useEffect, useState } from 'react';
import MinistrySidebar from '../MinistrySidebar.tsx';
import {
    FaSearch,
    FaEdit,
    FaTrashAlt,
    FaHospital,
    FaUnlink,
    FaPlus,
    FaPlusCircle,
    FaMinusCircle,
    FaBan, FaUserMinus
} from 'react-icons/fa'; // Import icons
import { Link, useNavigate } from 'react-router-dom';
import config from "../../../constants/config";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AssignHospitalModal from './AssignHospitalModal';
import UnassignHospitalModal from './UnassignHospitalModal';
import {FaPersonCircleMinus, FaPersonCirclePlus, FaPlusMinus, FaSquareMinus, FaUserPen} from "react-icons/fa6"; // Import the new UnassignHospitalModal

interface Doctor {
    id: string;
    name: string;
    email: string;
    specialization: string;
    workingHospitals: string[];  // Include this field to access hospital data
}

interface Hospital {
    hospitalId: string;
    hospitalName: string;
    hospitalType: string;
}

const ManageDoctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(10);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [deleteDoctorId, setDeleteDoctorId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAssignHospitalModal, setShowAssignHospitalModal] = useState(false);  // New state for hospital modal
    const [showUnassignHospitalModal, setShowUnassignHospitalModal] = useState(false); // State for unassign modal
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);  // Store the doctor for hospital assign/unassign
    const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

    const navigate = useNavigate();

    // Fetch doctors and hospitals
    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch(`${config.backend_url}/api/doctors`);
            const data = await response.json();
            setDoctors(data);
            setTotalDoctors(data.length);
        };

        const fetchHospitals = async () => {
            const response = await fetch(`${config.backend_url}/api/hospitals`);
            const data = await response.json();
            setHospitals(data);
        };

        fetchDoctors();
        fetchHospitals();
    }, []);

    const confirmDelete = (doctorId: string) => {
        setDeleteDoctorId(doctorId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (deleteDoctorId) {
            try {
                const response = await fetch(`${config.backend_url}/api/doctors/${deleteDoctorId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setDoctors(doctors.filter(doctor => doctor.id !== deleteDoctorId));
                    setShowDeleteModal(false);
                } else {
                    alert('Failed to delete doctor.');
                }
            } catch (error) {
                console.error('Error deleting doctor:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleAssignHospital = (doctorId: string) => {
        setSelectedDoctorId(doctorId);
        setShowAssignHospitalModal(true);
    };

    const handleUnassignHospitalClick = (doctorId: string) => {
        setSelectedDoctorId(doctorId);
        setShowUnassignHospitalModal(true);
    };

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;

    // Filter doctors based on the search query
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalFilteredDoctors = filteredDoctors.length; // Update total doctors count based on search

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-layout">
            <MinistrySidebar />

            <main className="main-content">
                <header className="header">
                    <div className="header-left">
                        <div className="user-info">
                            <h2 className="text-3xl font-semibold">Manage Doctors</h2>
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
                            <Link to='/add-doctor'>+ Add Doctor</Link>
                        </button>
                    </div>
                </header>

                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Specialization</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Working Hospitals</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentDoctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td className="border border-gray-300 px-4 py-2">{doctor.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{doctor.specialization}</td>
                                <td className="border border-gray-300 px-4 py-2">{doctor.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {doctor.workingHospitals.length}
                                    <button
                                        onClick={() => handleAssignHospital(doctor.id)}
                                        className="ml-4 text-green-500 hover:underline"
                                        title="Assign Hospital"
                                    >
                                        <FaPlusCircle size="20px"/>
                                    </button>
                                    <button
                                        onClick={() => handleUnassignHospitalClick(doctor.id)}
                                        className="ml-2 text-yellow-500 hover:underline"
                                        title="Unassign Hospital"
                                    >
                                        <FaMinusCircle size="20px"/>
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => navigate(`/update-doctor/${doctor.id}`)}
                                        className="text-blue-500 hover:underline"
                                        title="Update Doctor"
                                    >
                                        <FaUserPen size="20px"/>
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(doctor.id)}
                                        className="ml-4 text-red-500 hover:underline"
                                        title="Delete Doctor"
                                    >
                                        <FaUserMinus size="20px"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center">
                    {Array.from({length: Math.ceil(totalFilteredDoctors / doctorsPerPage)}, (_, index) => (
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

            {/* Assign Hospital Modal */}
            {showAssignHospitalModal && (
                <AssignHospitalModal
                    doctorId={selectedDoctorId}
                    hospitals={hospitals.filter(h => h.hospitalType === 'PUBLIC_HOSPITAL')}
                    workingHospitals={doctors.find(doc => doc.id === selectedDoctorId)?.workingHospitals || []}
                    onClose={() => setShowAssignHospitalModal(false)}
                />
            )}

            {/* Unassign Hospital Modal */}
            {showUnassignHospitalModal && (
                <UnassignHospitalModal
                    doctorId={selectedDoctorId}
                    workingHospitals={doctors.find(doc => doc.id === selectedDoctorId)?.workingHospitals.map(
                        hospitalId => hospitals.find(h => h.hospitalId === hospitalId)) || []}
                    onClose={() => setShowUnassignHospitalModal(false)}
                />
            )}
        </div>
    );
};

export default ManageDoctors;

