import IClinic from "@/types/Clinic";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewClinic() {
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchClinics = async () => {
        const response = await axios.get("http://localhost:8080/api/clinics/");
        setClinics(response.data);
      };
      fetchClinics();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const handleClinic = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/clinics/${id}`
      );
      if (response) {
        enqueueSnackbar("Clinic deleted successfully", {
          variant: "success",
        });
        navigate("/clinics");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {clinics.map((clinic, clinicIndex) => (
        <div
          className="p-4 bg-white rounded-lg shadow-md mb-4"
          key={clinicIndex}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-lg">{clinic.clinicName}</h3>
            <h3 className="text-gray-600">{clinic.doctor.name}</h3>
          </div>
          <div>
            <h4 className="font-bold text-sm">Patients</h4>
            <div className="flex gap-2">
              {clinic.patients.map((patient, patientIndex) => (
                <button
                  key={patientIndex}
                  className="text-gray-700 border-2 p-2 rounded-full"
                  onClick={() => navigate(`/patient/${patient.id}`)}
                >
                  {patientIndex + 1}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                className="mt-3 bg-green-700 p-3 rounded-lg text-white"
                onClick={() => navigate(`/add-to-clinic/${clinic.id}`)}
              >
                Add Patient
              </button>
              <button
                className="mt-3 bg-red-700 p-3 rounded-lg text-white"
                onClick={() => handleClinic(clinic.id)}
              >
                Delete Clinic
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewClinic;
