import React, { useEffect, useState } from 'react';
import MinistrySidebar from './MinistrySidebar.tsx';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import config from "../../constants/config";

interface Doctor {
  name: string;
  email: string;
  specialization: string;
  hospital: string;
}

interface Hospital {
  name: string;
}

interface ChartData {
  name: string;
  value: number;
}

const DoctorDashboard: React.FC = () => {
  const [doctorStats, setDoctorStats] = useState({ total: 0, specializations: 0 });
  const [hospitalStats, setHospitalStats] = useState({ total: 0 });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctorChartData, setDoctorChartData] = useState<ChartData[]>([]);
  const [hospitalChartData, setHospitalChartData] = useState<ChartData[]>([]);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.backend_url}/api/doctors/`);
        const data: Doctor[] = await response.json();
        setDoctors(data);

        const specializationCount = new Map<string, number>();
        data.forEach((doctor) => {
          const specialization = doctor.specialization;
          specializationCount.set(specialization, (specializationCount.get(specialization) || 0) + 1);
        });

        const doctorData: ChartData[] = Array.from(specializationCount, ([name, value]) => ({ name, value }));
        setDoctorChartData(doctorData);
        setDoctorStats({ total: data.length, specializations: specializationCount.size });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${config.backend_url}/api/hospitals/`);
        const data: Hospital[] = await response.json();
        setHospitals(data);
        setHospitalStats({ total: data.length });
        // Prepare chart data (assuming hospitals have some categorizable data, modify as necessary)
        const hospitalData: ChartData[] = data.map(hospital => ({ name: hospital.name, value: 1 }));
        setHospitalChartData(hospitalData);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  return (
    <div className="dashboard-layout flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <MinistrySidebar />

      {/* Main Content Area */}
      <main className="main-content flex-1 p-6">
        {/* Header Section */}
        <header className="header flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Ministry Dashboard</h1>
        </header>

        {/* Doctors and Hospitals Analytics Section */}
        <section>
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">Total Doctors</h3>
              <p className="text-2xl font-bold">{doctorStats.total}</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">Total Hospitals</h3>
              <p className="text-2xl font-bold">{hospitalStats.total}</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold">Specializations</h3>
              <p className="text-2xl font-bold">{doctorStats.specializations}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 shadow-md rounded-md">
              <h3 className="text-lg font-semibold mb-4">Doctors by Specialization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={doctorChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {doctorChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0 ? `hsl(${(index / doctorChartData.length) * 360}, 70%, 50%)` : '#ccc'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 shadow-md rounded-md">
              <h3 className="text-lg font-semibold mb-4">Hospitals Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={hospitalChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {hospitalChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 0 ? `hsl(${(index / hospitalChartData.length) * 360}, 70%, 50%)` : '#ccc'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Doctors Data Table */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Doctors Data Table</h2>
            <div className="table-container bg-white p-6 shadow-md rounded-md">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Specialization</th>
                    <th className="px-4 py-2 text-left">Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{doctor.name}</td>
                      <td className="px-4 py-2">{doctor.email}</td>
                      <td className="px-4 py-2">{doctor.specialization}</td>
                      <td className="px-4 py-2">{doctor.hospital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
