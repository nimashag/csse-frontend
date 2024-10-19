import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePatient() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const profileImage = "/dummy-profile.png";
  const userType = "patient";
  const navigate = useNavigate();

  useState(() => {
    try {
      const fetchPatient = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/patients/${id}`
          );
          if (response) {
            setName(response.data.name);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setAge(response.data.age);
            setGender(response.data.gender);
            setContactNumber(response.data.contactNumber);
            setEmergencyDial(response.data.emergencyDial);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchPatient();
    } catch (error) {
      console.log(error);
    }
  },[id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/patients/${id}`,
        {
          name,
          email,
          address,
          age,
          gender,
          contactNumber,
          emergencyDial,
          userType, 
          profileImage,
        }
      );
      if (response) {
        enqueueSnackbar("Patient updated successfully", {
          variant: "success",
        });
        navigate("/manage-patients");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
          <br />
          <label>Address:</label>
          <input
            type="text"
            value={address} // Correctly use address here
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <br />
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />
          <label>Contact Number:</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <br />
          <label>Emergency Dial:</label>
          <input
            type="tel"
            value={emergencyDial}
            onChange={(e) => setEmergencyDial(e.target.value)}
            required
          />
          <br />
          <button type="submit">Add Patient</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePatient;
