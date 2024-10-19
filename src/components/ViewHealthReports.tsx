import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Adjust according to your setup
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment"; // For date formatting

const ViewHealthReports = () => {
  const userProfile = localStorage.getItem("userProfile");
  const userEmail = JSON.parse(userProfile).email;
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsRef = collection(db, "labTasks");
        const q = query(reportsRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports: ", error);
        toast.error("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userEmail]);

  if (loading) {
    return <p className="text-gray-500">Loading reports...</p>;
  }

  // Group reports by due date
  const groupedReports = reports.reduce((acc, report) => {
    const dueDate = moment(report.dueDate).format("MMMM D, YYYY");
    if (!acc[dueDate]) {
      acc[dueDate] = [];
    }
    acc[dueDate].push(report);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Health Reports</h1>
      {Object.keys(groupedReports).length === 0 ? (
        <p>No reports found for this email.</p>
      ) : (
        Object.keys(groupedReports).map((date) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {groupedReports[date].map((report) => (
                <div key={report.id} className="border p-4 rounded-lg shadow">
                  <h3 className="font-bold">{report.testType}</h3>
                  <p className="text-gray-700">Due Date: {report.dueDate}</p>
                  {report.reportUploaded ? (
                    <div className="mt-2">
                      {/* Check if reportLink is defined before using it */}
                      {report.reportLink ? (
                        <>
                          {/* Display preview based on the report type */}
                          {report.reportLink.endsWith('.pdf') ? (
                            <embed
                              src={report.reportLink}
                              type="application/pdf"
                              width="100%"
                              height="150px"
                              className="rounded"
                              title="Report Preview"
                            />
                          ) : (
                            <img
                              src={report.reportLink}
                              alt="Report Preview"
                              className="rounded max-w-full h-auto"
                              style={{ maxHeight: '150px', objectFit: 'cover' }} // Adjust the height as needed
                            />
                          )}
                          <p className="mt-2">
                            <a
                              href={report.reportLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Full Report
                            </a>
                          </p>
                        </>
                      ) : (
                        <span className="text-gray-500">Report link not available</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">Not Available</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewHealthReports;
