import React, { useEffect, useState } from "react";
import DocSidebar from './DocSidebar';
import { FaBell, FaSearch } from "react-icons/fa";
import docprofile from '../../assets/images/doctor/docaimg.png';
import { useLocation } from "react-router-dom";
import config from "../../constants/config";

interface Appointment {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  date: string;
  time: string;
  type: "public" | "private"; 
  paymentStatus: PaymentStatus; 
  isPaid: boolean;   
}

// Define the PaymentStatus enum
enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}

const PatientAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const location = useLocation();
  const doctor = location.state?.doctor;

  useEffect(() => {
    const fetchAppointments = async () => {
      // Ensure patientId is available
      if (!doctor || !doctor.patientId) {
        console.error("No valid patient ID found");
        return;
      }

      try {
        const response = await fetch(`${config.backend_url}/api/patients/${doctor.patientId}/appointments`);
        if (!response.ok) {
          throw new Error(`Error fetching appointments: ${response.statusText}`);
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, [doctor]);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const formatAppointmentType = (type: string): string => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DocSidebar />

      {/* Main content on the screen */}
      <main className="main-content">
        {/* First Part */}  
        <header className="header">
          {/* Header Left Side */}
          <div className="header-left">
            <div className="user-info">
              <h2 className="text-3xl font-semibold">Patient Appointments</h2>
            </div>
          </div>

          {/* Header Right Side */}
          <div className="header-right flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute mt-0.7 ml-4 text-gray-500">
              <FaSearch size="15px" />
            </div>

            <button className="notification-icon mr-4">
              <FaBell size={18} />
            </button>

            <img src={docprofile} className="profile-image" alt="Doctor" />
          </div>
        </header>

        <div className='dashboard-container'>
          <div className="mt-6 space-y-6">
            {currentAppointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
              >
                {/* Left Part - Hospital Image and Basic Info */}
                <div className="flex items-center space-x-6">
                  {/* Hospital Image */}
                  <div className="w-24 h-24">
                    <img
                      src={"https://i.pinimg.com/enabled/564x/a8/a1/07/a8a107e2a9ae0ef0e3c77a0dd76b73e7.jpg"} 
                      alt={appointment.appointmentId}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>

                  {/* Hospital Information */}
                  <div className="space-y-1.5"> 
                    <h3 className="text-2xl font-bold">{appointment.appointmentId}</h3>
                    <p className="text-sm font-semibold text-black">Hospital Location: {appointment.doctorId}</p>
                    <p className="text-sm font-semibold text-black">Contact Info: {appointment.date}</p> 
                    <p className="text-sm font-semibold text-black">Hospital Type: {appointment.time}</p> 
                    <p className="text-sm font-semibold text-black">Importance: High</p>
                    <p className="text-sm font-semibold italic text-black">Hospital ID: #{appointment.patientId}</p>
                  </div>
                </div>

                {/* Right Part - Buttons */}
                <div className="flex flex-col font-semibold space-y-4 items-center">
                  <button className="px-16 py-2 bg-green-500 text-white rounded-sm shadow text-center hover:bg-green-800">
                    View Info
                  </button>
                  <button className="px-8 py-2 bg-orange-500 text-white rounded-sm shadow text-center hover:bg-orange-800">
                    Mark Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientAppointment;
