// src/components/ReportsDueToday.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReportsDueToday = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/lab-reports/due-today");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports: ", error);
        toast.error("Failed to fetch reports.");
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports Due Today</h2>
      {reports.length === 0 ? (
        <p>No reports due today.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <p>User ID: {report.userId}</p>
              <p>Test Type: {report.testType}</p>
              <p>Due Date: {report.dueDate}</p>
              <p>Report Link: <a href={report.reportLink} target="_blank" rel="noopener noreferrer">View Report</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsDueToday;
