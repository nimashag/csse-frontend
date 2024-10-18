import IPatient from '@/types/patient'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function AddToBed() {

    const { id } = useParams<{ id: string }>();
    const [patients, setPatients] = useState<IPatient[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/patients/');
            setPatients(response.data); 
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchPatients();
      }, []);
    
    const assignToBed = async (patientId: string) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/beds/update`,{
                bedId : id,
                patientId : patientId,
            });

            if(response) {
                enqueueSnackbar("Bed is empty", { variant: "success" });
                navigate(-1);
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
            
                {patients.map((patient,index) => (
                    <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>
                        <button onClick={() => assignToBed(patient.id)}>Assign to bed</button>
                    </td>
                    </tr>
                ))}
                
            
        </table>



    </div>
  )
}

export default AddToBed