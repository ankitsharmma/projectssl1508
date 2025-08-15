import React, { useState } from "react";

const VideoUploadForm = () => {
  const API_BASE_URL = "/auth/uploadvideo"; // Uses Vite proxy: points to https://api.sslcloudservices.com/auth
  const [formData, setFormData] = useState({
    Id: "",
    Title: "",
    Description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Video uploaded successfully!");
        setFormData({ Id: "", Title: "", Description: "" });
      } else {
        alert(data.message || "❌ Error uploading video");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          🎥 Upload Video
        </h2>

        {/* Video ID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Video ID
          </label>
          <input
            type="text"
            name="Id"
            value={formData.Id}
            onChange={handleChange}
            placeholder="Enter unique video ID"
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            placeholder="Enter video title"
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Enter video description"
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
