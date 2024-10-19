import IPatient from "@/types/patient";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagePatient = () => {
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

  const handleDelete = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/patients/${id}`);
        if (response) {
            enqueueSnackbar("Patient Deleted successfully", {
              variant: "success",
            });
            navigate("/manage-patients");
          }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      <h2>Registered Patients</h2>
        <div>
            <button className="bg-green-500 p-2" onClick={() => navigate("/create-patient")}>Add New Patient</button>
        </div>
      <table>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>email</th>
          <th>address</th>
          <th>gender</th>
          <th>age</th>
          <th>action</th>
        </tr>
        {patients.map((patient, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{patient.name}</td>
            <td>{patient.email}</td>
            <td>{patient.address}</td>
            <td>{patient.gender}</td>
            <td>{patient.age}</td>
            <td>
              <div>
                <button onClick={() => navigate(`/update-patients/${patient.id}`)}>Update</button>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ManagePatient;
