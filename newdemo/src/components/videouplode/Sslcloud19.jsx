import React, { useEffect, useState } from "react";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // API endpoint for fetching videos
  const URL_FETCH = "/auth/videos"; // <-- Change if your backend route differs

  useEffect(() => {
    fetch(URL_FETCH, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched videos:", data);

        if (Array.isArray(data)) {
          setVideos(data);
        } else if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.error("Unexpected data format:", data);
          setVideos([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setVideos([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        🎥 Video Playlist
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <div
            key={video.Id}
            onClick={() => setSelectedVideo(video.Id)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300"
          >
            <div className="aspect-video bg-gray-200 rounded-md mb-3 flex items-center justify-center">
              <span className="text-gray-500">🎬 Thumbnail</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">{video.Title}</h3>
            <p className="text-xs text-gray-600 mt-1">{video.Description}</p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube Video"
                className="w-full h-full rounded-b-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
