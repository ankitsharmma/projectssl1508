import React, { useEffect, useState } from "react";

<<<<<<< HEAD
const  Dashboardgraph = () => {
  // ✅ Set API base URL here
  const API_BASE = "/auth/folders"
  ; // works with Vite proxy in development
  const API_BASE_URL = "/auth/user";
=======
const Dashboardgraph = () => {
  // ✅ API endpoints
  const API_BASE_FOLDERS = "https://api.sslcloudservices.com/auth/folders"; // For folders count
  const API_BASE_USERS = "https://api.sslcloudservices.com/auth/user"; // For users count
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13

  const [studentCount, setStudentCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingFolders, setLoadingFolders] = useState(true);

  // Fetch total students
  useEffect(() => {
<<<<<<< HEAD
    fetch(API_BASE_URL)
=======
    fetch( API_BASE_USERS , { method: "GET" })
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13
      .then((res) => res.json())
      .then((data) => {
        setStudentCount(data.users ? data.users.length : 0);
        setLoadingStudents(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoadingStudents(false);
      });
  }, []);

  // Fetch total folders
  useEffect(() => {
<<<<<<< HEAD
    fetch( API_BASE)
=======
    fetch( API_BASE_FOLDERS , { method: "GET" })
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13
      .then((res) => res.json())
      .then((data) => {
        setFolderCount(
          Array.isArray(data) ? data.length : data.folders?.length || 0
        );
        setLoadingFolders(false);
      })
      .catch((err) => {
        console.error("Error fetching folders:", err);
        setLoadingFolders(false);
      });
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {/* Student Card */}
      <div className="max-w-sm bg-blue-600 text-white rounded-lg shadow p-6 text-center">
        <h2 className="text-lg">Total Student Registration</h2>
        {loadingStudents ? (
          <p>Loading...</p>
        ) : (
          <p className="text-4xl font-bold mt-2">{studentCount}</p>
        )}
      </div>

      {/* Folder Card */}
      <div className="max-w-sm bg-green-600 text-white rounded-lg shadow p-6 text-center">
        <h2 className="text-lg">Total Folders Created</h2>
        {loadingFolders ? (
          <p>Loading...</p>
        ) : (
          <p className="text-4xl font-bold mt-2">{folderCount}</p>
        )}
      </div>
    </div>
  );
};
      export default Dashboardgraph;
