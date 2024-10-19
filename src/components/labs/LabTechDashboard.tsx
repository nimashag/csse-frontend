// src/components/LabTechDashboard.js
import React, { useState } from "react";
import QRScanner from "./QRScanner";
import LabReportForm from "./LabReportForm";
import ReportsDueToday from "./ReportsDueToday";

const LabTechDashboard = () => {
  const [scannedUserData, setScannedUserData] = useState(null);

  const handleScan = (data) => {
    // Assuming the QR code contains JSON with user details
    const parsedData = JSON.parse(data);
    setScannedUserData(parsedData);
  };

  const handleReportSubmit = () => {
    setScannedUserData(null); // Reset after submission
  };

  return (
    <div>
      <h1>Lab Technician Dashboard</h1>

      {!scannedUserData ? (
        <QRScanner onScan={handleScan} />
      ) : (
        <LabReportForm userData={scannedUserData} onReportSubmit={handleReportSubmit} />
      )}

      <ReportsDueToday />
    </div>
  );
};

export default LabTechDashboard;
