import IPatient from "@/types/patient";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientsForAppointments() {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients/");
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Patient Name
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Age
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Gender
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{patient.name}</td>
                <td className="py-4 px-6">{patient.age}</td>
                <td className="py-4 px-6">{patient.gender}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() =>
                      navigate(`/create-appointment/${patient.id}`)
                    }
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-blue-700 transition duration-200"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientsForAppointments;
