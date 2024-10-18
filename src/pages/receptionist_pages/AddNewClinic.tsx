import IDoctor from '@/types/doctor';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddNewClinic() {

    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");
    const [clinicName, setClinicName] = useState<string>("");
    const navigate = useNavigate();

    const hospitalId = '67102b30c5c477743962a815';

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDoctor(e.target.value);
      };

    useEffect(() => {
        try {
            const fetchDoctor = async () => {
                const response = await axios.get('http://localhost:8080/api/doctors/');
                if(response) {
                    setDoctors(response.data);
                }
            }
            fetchDoctor();
        } catch (error) {
            console.log(error);
        }
    },[])  

    const handleSubmit = async() => {
        try {
            const response = await axios.post('http://localhost:8080/api/clinics/create', {
                clinicName : clinicName,
                doctorId : selectedDoctor,
                hospitalId : hospitalId
            })

            if(response) {
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
    <>
    <div>Add New Clinic</div>

    <label>Clinic Name</label>
    <input type="text" onChange={(e) => setClinicName(e.target.value)}/>

    <label>Doctor</label>
      <select value={selectedDoctor} onChange={handleDoctorChange}>
        <option value="" disabled>Select a Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} <br /> {doctor.specialization}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Add Clinic</button>  
      <button onClick={() => navigate(-1)}>cancel</button>  
    </>
  )
}

export default AddNewClinic