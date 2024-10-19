// src/components/LabReportForm.js
import React, { useState } from "react";
import axios from "axios";
import { db, storage } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const LabReportForm = ({ userData, onReportSubmit }) => {
  const [testType, setTestType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reportFile, setReportFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData || !testType || !dueDate || !reportFile) {
      toast.error("Please fill out all fields and attach a report.");
      return;
    }

    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `reports/${reportFile.name}`);
      await uploadBytes(storageRef, reportFile);

      // Get the file's URL from Firebase Storage
      const fileURL = await getDownloadURL(storageRef);

      // Store report in Firestore
      const reportRef = await addDoc(collection(db, "labReports"), {
        userId: userData._id,
        testType,
        dueDate,
        reportLink: fileURL,
        createdAt: new Date().toISOString(),
      });

      toast.success("Report uploaded to Firestore successfully!");

      // Send report details to backend
      const response = await axios.post("http://localhost:8080/api/lab-reports/add", {
        userId: userData._id,
        testType,
        dueDate,
        reportLink: fileURL,
        createdAt: new Date().toISOString(),
      });

      toast.success("Report submitted to backend successfully!");
      onReportSubmit();
    } catch (error) {
      console.error("Error submitting report: ", error);
      toast.error("Failed to submit report.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Lab Report</h2>
      <p>User: {userData.name} (ID: {userData._id})</p>

      <div>
        <label>Test Type</label>
        <input type="text" value={testType} onChange={(e) => setTestType(e.target.value)} required />
      </div>

      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>

      <div>
        <label>Attach Report</label>
        <input type="file" onChange={(e) => setReportFile(e.target.files[0])} required />
      </div>

      <button type="submit">Submit Report</button>
    </form>
  );
};

export default LabReportForm;
