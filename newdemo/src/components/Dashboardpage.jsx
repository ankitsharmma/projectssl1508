import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cloud, FolderOpen, Home } from "lucide-react"; // added Home icon
import watermark from "../assets/ssl1.png";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch folders from backend
  const Url_folders = "https://api.sslcloudservices.com/auth/folders";
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(Url_folders);
        if (!res.ok) throw new Error("Failed to fetch folders");
        const json = await res.json();

        // Handle both formats: array of strings OR array of objects
        if (Array.isArray(json.folders)) {
          setFolders(json.folders);
        } else {
          setFolders([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-300 to-orange-200 flex flex-col overflow-hidden">
      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <img
          src={watermark}
          alt="SSL Cloud Watermark"
          className="w-3/4 sm:w-2/3 md:w-1/2 opacity-10"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-purple-600 to-indigo-600 py-3 px-4 shadow-md flex items-center justify-between">
        {/* Back to Home Button (Left Side) */}
        <Link
          to="/"
          className="flex items-center gap-2 bg-white text-purple-600 font-semibold px-3 py-2 rounded-xl shadow-md hover:bg-purple-100 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>

        {/* Center Title */}
        <div className="flex items-center gap-2 text-center mx-auto">
          <Cloud className="w-7 h-7 text-white" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">
            SSL Cloud Folders
          </h1>
        </div>

        {/* Empty div for spacing (keeps title centered) */}
        <div className="w-[80px]"></div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center py-6 px-4">
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="grid gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl">
            {folders.map((folder, index) => {
              const folderName =
                typeof folder === "object" && folder !== null
                  ? folder.name
                  : folder;

              const folderKey =
                typeof folder === "object" && folder !== null
                  ? folder._id || index
                  : index;

              return (
                <Link
                  key={folderKey}
                  to={`/batch/${encodeURIComponent(folderName)}`}
                  className="group relative bg-gray-700 rounded-2xl p-6 w-full shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full p-3 shadow-lg">
                    <FolderOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="mt-8 text-center">
                    <div className="font-semibold text-base sm:text-lg text-gray-100 group-hover:text-purple-400 transition">
                      {folderName}
                    </div>
                    <p className="text-gray-300 mt-2 text-xs sm:text-sm">
                      Tap to open folder
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
