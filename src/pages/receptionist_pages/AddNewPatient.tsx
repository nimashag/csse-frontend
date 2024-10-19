import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewPatient = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const profileImage = "/dummy-profile.png";
  const userType = "patient";
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents form from refreshing the page
    try {
      const newPatient = {
        name,
        email,
        password, 
        address,
        age,
        gender,
        contactNumber,
        emergencyDial,
        userType, 
        profileImage,
      };
      console.log("New Patient Data:", newPatient);

      const response = await axios.post(
        "http://localhost:8080/api/patients",
        newPatient
      );

      if (response) {
        enqueueSnackbar("Patient added to the clinic successfully", {
          variant: "success",
        });
        navigate("/recep-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default AddNewPatient;
