// src/components/DashboardDetails.js
import React from "react";
import {QRCodeSVG}  from "qrcode.react";

const DashboardDetails = () => {
  // Retrieve profile data from localStorage
  const useProfile = JSON.parse(localStorage.getItem("userProfile") as string);

  if (!useProfile) {
    return <p>No profile data found</p>;
  }

  // Convert profile object to a string (or any unique identifier you'd like to encode)
  const profileDataString = JSON.stringify(useProfile);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {useProfile.name || "User"}</p>

      {/* QR Code generation */}
      <div style={{ marginTop: "20px" }}>
        <h3>Your QR Code</h3>
        <QRCodeSVG
          value={profileDataString}
          size={200} // Adjust size as needed
          includeMargin={true}
        />
      </div>
    </div>
  );
};

export default DashboardDetails;
