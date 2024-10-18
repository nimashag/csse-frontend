import IPatient from '@/types/patient'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';


function ViewPatient() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<IPatient>();

  useState(() => {
    try {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/patients/${id}`);
          if(response) {
            setPatient(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchPatient();
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <>
    <div>name : {patient?.name}</div>
    <div>age : {patient?.email}</div>
    <div>age : {patient?.age}</div>
    <div>age : {patient?.gender}</div>
    <div>age : {patient?.address}</div>
    </>
  )
}

export default ViewPatient