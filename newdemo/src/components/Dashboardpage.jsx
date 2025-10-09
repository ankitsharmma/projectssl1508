import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  Video,
  Film,
  Camera,
  PlayCircle,
  Tv,
  Headphones,
  Mic,
  Music,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
=======
import { Link } from "react-router-dom";
import { Cloud, FolderOpen, Home } from "lucide-react"; // added Home icon
import watermark from "../assets/ssl1.png";
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13

const icons = [Video, Film, Camera, PlayCircle, Tv, Headphones, Mic, Music];

const VideoGallery = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [loadingFolders, setLoadingFolders] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

<<<<<<< HEAD
  const Video_url = "/auth/videos";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch folders
=======
  // Fetch folders from backend
  const Url_folders = "https://api.sslcloudservices.com/auth/folders";
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13
  useEffect(() => {
    const fetchFolders = async () => {
      setLoadingFolders(true);
      try {
<<<<<<< HEAD
        const res = await fetch( video_url );
        const data = await res.json();
        if (Array.isArray(data.folders)) setFolders(data.folders);
      } catch (error) {
        console.error("Failed to fetch folders:", error);
=======
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
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13
      }
      setLoadingFolders(false);
    };
    fetchFolders();
  }, []);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      setLoadingVideos(true);
      try {
        const res = await fetch( Video_url );
        const data = await res.json();
        if (Array.isArray(data)) setAllVideos(data);
        else if (Array.isArray(data.videos)) setAllVideos(data.videos);
        else setAllVideos([]);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setAllVideos([]);
      }
      setLoadingVideos(false);
    };
    fetchVideos();
  }, []);

  // Filter videos by folder
  useEffect(() => {
    if (selectedFolder === "All") setFilteredVideos([]);
    else {
      const matched = allVideos.filter(
        (video) =>
          video.Title?.includes(selectedFolder) ||
          video.Folder === selectedFolder ||
          video.batch === selectedFolder
      );
      setFilteredVideos(matched);
    }
  }, [selectedFolder, allVideos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      {/* Top Hero Background Image */}
      <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-xl mb-10">
        <img
          src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse mb-2 drop-shadow-lg">
            🎬 Discover Inspiring Videos
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl animate-fadeIn">
            Explore creative content from multiple folders. Select a folder below
            to get started.
          </p>
        </div>
      </div>

<<<<<<< HEAD
      {/* Back to Home Button */}
      <div className="flex justify-start mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-3 bg-white/40 backdrop-blur-md rounded-full font-semibold text-purple-700 shadow-lg hover:scale-105 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
      </div>
=======
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
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13

      {/* Folder Selector */}
      <div className="flex justify-center mb-12">
        {loadingFolders ? (
          <p className="text-gray-600 animate-pulse">Loading folders...</p>
        ) : (
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="border border-purple-300 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-xl shadow-md hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all font-medium text-purple-700"
          >
            <option value="All">Select a Folder</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        )}
      </div>

<<<<<<< HEAD
      {/* Video Cards */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedFolder === "All" ? (
          <p className="text-center text-gray-600 col-span-full text-lg">
            Please select a folder to view videos.
          </p>
        ) : loadingVideos ? (
          <p className="text-center text-gray-600 col-span-full text-lg animate-pulse">
            Loading videos...
          </p>
        ) : filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500 italic col-span-full text-lg">
            No videos found in this folder.
          </p>
        ) : (
          filteredVideos.map((video, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={video.Id || index}
                onClick={() => setSelectedVideo(video)}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden perspective-1000"
                data-aos="fade-up"
              >
                <div className="aspect-video bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center rounded-t-3xl hover:scale-110 transition-transform duration-500">
                  <IconComponent className="text-purple-700 w-12 h-12 animate-bounce" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 truncate">
                    {video.Title || "Untitled Video"}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {video.Description || "No description available."}
                  </p>
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                    {video.Folder || video.batch || "General"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
=======
          <div className="grid gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl">
            {folders.map((folder, index) => {
              const folderName =
                typeof folder === "object" && folder !== null
                  ? folder.name
                  : folder;
>>>>>>> 14d7b698ffccfc2373a592689732a32412bb6a13

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-3xl bg-white rounded-full p-1 shadow-md hover:shadow-lg transition"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.Id}`}
                title={selectedVideo.Title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
