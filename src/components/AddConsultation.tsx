import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const AddConsultation = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("payNow");
  const [patientId, setPatientId] = useState(null); // Store patient ID

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/hospitals");
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to fetch hospitals.");
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors/");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors.");
      }
    };

    const fetchUserProfile = async () => {
      const email = localStorage.getItem("email"); // Retrieve email from local storage
      if (email) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/email/${email}`); // Update with correct endpoint to fetch by email
          setPatientId(response.data.id); // Store patient ID
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        }
      } else {
        toast.error("No email found in local storage.");
      }
    };

    fetchHospitals();
    fetchDoctors();
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) {
      toast.error("Patient ID is not available. Please try again.");
      return;
    }

    try {
      const appointmentData = {
        doctorId: selectedDoctor,
        hospitalId: selectedHospital,
        date: appointmentDate,
        time: appointmentTime,
        isPaid: paymentMethod === "payNow",
      };

      await axios.post(`http://localhost:8080/api/patients/${patientId}/appointments`, appointmentData);
      toast.success("Appointment created successfully!");
      // Optionally, reset form state or redirect
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment.");
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Add Consultation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose Hospital:</label>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.hospitalId} value={hospital.hospitalId}>
                {hospital.hospitalName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose Doctor:</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Time:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="payNow">Pay Now</option>
            <option value="payLater">Pay Later</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddConsultation;
