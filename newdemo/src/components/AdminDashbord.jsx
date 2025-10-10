import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- import useNavigate
import {
  Home,
  UserPlus,
  BookOpen,
  Users,
  ClipboardList,
  Video,
  Folder,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Studentdetailspage from "./Admindashbordpages/Studentdetailspage";
import TotalStudentBox from "./Admindashbordpages/Dashboardgraph";
import FolderForm from "./Admindashbordpages/Createfolder";
import VideoUploadForm from "./Admindashbordpages/Uplodevideo";
import InstructorForm from "./Admindashbordpages/InstructorForm";
import BestSellingCourses from "./Admindashbordpages/Bestsellingcources";
import CreateAdmin from "./Admindashbordpages/createadmin";
import NewSellingCourses from "./Admindashbordpages/Newestsellingcources";

const DashboardAdmin = () => {
  const navigate = useNavigate(); // <--- hook

  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <Home size={24} /> },
    { key: "addAdmin", label: "Add Admin", icon: <UserPlus size={24} /> },
    { key: "bestSelling", label: "Best Selling", icon: <BookOpen size={24} /> },
    { key: "Newselling", label: "New Selling", icon: <BookOpen size={24} /> },
    { key: "students", label: "Students", icon: <Users size={24} /> },
    { key: "instructor", label: "Create Instructor", icon: <ClipboardList size={24} /> },
    { key: "createFolder", label: "Create Folder", icon: <Folder size={24} /> },
    { key: "uploadVideo", label: "Upload Video", icon: <Video size={24} /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <TotalStudentBox />;
      case "addAdmin":
        return <CreateAdmin />;
      case "bestSelling":
        return <BestSellingCourses />;
        case "Newselling":
        return <NewSellingCourses/>;
      case "students":
        return <Studentdetailspage />;
      case "instructor":
        return <InstructorForm />;
      case "createFolder":
        return <FolderForm />;
      case "uploadVideo":
        return <VideoUploadForm />;
      default:
        return <div className="p-6">Select an option</div>;
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear any auth tokens if needed
      localStorage.removeItem("token"); // example if token is stored
      navigate("/Institute-login"); // redirect to login page
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-800 text-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          sidebarOpen ? "w-72" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-blue-600">
            {sidebarOpen && <span className="text-xl font-bold">Admin Dashboard</span>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-600 rounded-full transition-colors"
            >
              {sidebarOpen ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex items-center w-full px-3 py-3 rounded hover:bg-blue-600 transition-colors ${
                  active === item.key ? "bg-blue-600" : ""
                }`}
              >
                {item.icon}
                {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-blue-600">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 bg-red-500 hover:bg-red-600 rounded transition-colors"
            >
              <LogOut size={24} />
              {sidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-72" : "ml-16"
        } flex flex-col h-full`}
      >
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">Welcome, Admin</h1>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
