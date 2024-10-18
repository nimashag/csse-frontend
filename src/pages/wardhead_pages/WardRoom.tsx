import IWard from "@/types/ward";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const WardRoom = () => {
  const [wards, setWards] = useState<IWard[]>([]);

  useEffect(() => {
    try {
      const fetchWards = async () => {
        const hospitalId = "67102b30c5c477743962a815";

        const response = await axios.get(
          `http://localhost:8080/api/wards/hospital/${hospitalId}`
        );
        console.log(response);
        setWards(response.data);
      };

      fetchWards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/wards/${id}`
      );

      if (response) {
        enqueueSnackbar("ward deleted successfully", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={`/wards/create`}>
        <button className="bg-green-500 p-2 justify-center items-center">
          Add Ward
        </button>
      </Link>
      {wards.map((ward, index) => (
        <div className="bg-gray-400 p-8 m-2 rounded-lg">
          <Link to={`/wards/room/${ward.wardId}`} key={index}>
            <div className="bg-white p-8 rounded-lg">
              Ward No : {ward.wardNo}
            </div>
          </Link>
          <div>
            <button
              className="bg-red-500 p-4 rounded-lg"
              onClick={() => handleDelete(ward.wardId)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WardRoom;
