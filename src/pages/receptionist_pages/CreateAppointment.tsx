import IDoctor from "@/types/doctor";
import axios from "axios";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateAppointment = () => {

  /* patient id */  
  const { id } = useParams<{ id: string }>();

  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("payNow");
  const navigate = useNavigate();
  const hospital = "67102b30c5c477743962a815";

  useEffect(() => {
    try {
      const fetchDoctor = async () => {
        const response = await axios.get("http://localhost:8080/api/doctors/");
        if (response) {
          setDoctors(response.data);
        }
      };
      fetchDoctor();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSubmitAppointment = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/patients/${id}/appointments`, {
            doctorId : selectedDoctor,
            hospitalId : hospital,
            date : date,
            time : time,
            isPaid: paymentMethod === "payNow",
        })

        if(response) {
            enqueueSnackbar("Appointment added successfully", { variant: "success" });
            navigate("/recep-dashboard");
        }

    } catch (error) {
        console.log(error);
    }
  };


  return (
    <div>
      {/* doctor selecting*/}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Choose Doctor:
        </label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      {/* date selecting*/}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          min={moment().format("YYYY-MM-DD")} // Prevent past dates
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />{" "}
      </div>

      {/* time selecting */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/*payment method*/}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Payment Method:
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="payNow">Pay Now</option>
          <option value="payLater">Pay Later</option>
        </select>
      </div>

      <div>
        <button className="bg-green-600 p-2 rounded-lg text-white" onClick={handleSubmitAppointment}>
          Add Appointments
        </button>
      </div>
    </div>
  );
};

export default CreateAppointment;
