import IBed from "@/types/Bed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function WardBeds() {
  const { id } = useParams<{ id: string }>();
  const [beds, setBeds] = useState<IBed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchBeds = async () => {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/beds/${id}`
        );
        setBeds(response.data);
      };

      fetchBeds();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const emptyBed = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/beds/empty/${id}`
      );

      if (response) {
        enqueueSnackbar("Bed is empty", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <table>
          <tr>
            <th>bed no</th>
            <th>status</th>
            <th>action</th>
          </tr>

          {beds.map((bed, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bed.status}</td>
              <td>
                <button
                  onClick={() => emptyBed(bed.bedId)}
                  disabled={bed.status === "AVAILABLE"} 
                  className={`px-4 py-2 rounded ${
                    bed.status === "AVAILABLE"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                >
                  empty
                </button>
                <Link to={`/wards/addToBed/${bed.bedId}`}>
                <button
                  className="px-4 py-2 rounded ml-2 bg-green-600"
                >
                    Add A patient
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default WardBeds;
