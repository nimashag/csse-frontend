import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddWard() {
  const hospital = "67102b30c5c477743962a815";
  const [wardNo, setWardNo] = useState<number>();
  const [beds, setBeds] = useState<number>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (wardNo === undefined || wardNo < 1) {
        enqueueSnackbar("Please enter a valid Ward No (1 or greater)", {
          variant: "error",
        });
        return;
      }
      if (beds === undefined || beds < 1) {
        enqueueSnackbar("Please enter a valid number of beds (1 or greater)", {
          variant: "error",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/wards/create",
        {
          hospitalId: hospital,
          wardNo: wardNo,
          beds: beds,
        }
      );

      if (response) {
        enqueueSnackbar("Ward added successfully", { variant: "success" });
        navigate("/wards");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ward No
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setWardNo(Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of beds
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setBeds(Number(e.target.value))}
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddWard;
