import IPatient from "@/types/patient";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddToClinic() {
  const { id } = useParams<{ id: string }>();
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

  const handleAssignToClinic = async (patientId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/clinics/${id}/add-patient/${patientId}`
      );
      if (response) {
        enqueueSnackbar("Patient added to the clinic successfully", {
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
      <div>Assign Patients to the Bed</div>

      <table>
        <tr>
          <td>Patient Name</td>
          <td>Age</td>
          <td>Gender</td>
          <td>Action</td>
        </tr>

        {patients.map((patient, index) => (
          <tr key={index}>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td>
              <button onClick={() => handleAssignToClinic(patient.id)}>
                Assign to clinic
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default AddToClinic;
