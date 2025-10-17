import React, { useState, useEffect } from "react";

const VideoUploadForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    Id: "",
    Title: "",
    Description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const url = "https://api.sslcloudservices.com/auth/uploadvideo";

  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch( `${url}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setVideos(data.videos);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch( `${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Video saved successfully!");
        if (editingIndex !== null) {
          // update in-place
          const updated = [...videos];
          updated[editingIndex] = formData;
          setVideos(updated);
        } else {
          setVideos(prev => [...prev, formData]);
        }
        setFormData({ Id: "", Title: "", Description: "" });
        setShowModal(false);
        setEditingIndex(null);
      } else {
        alert(data.message || "❌ Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(videos[index]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      const updated = videos.filter((_, i) => i !== index);
      setVideos(updated);
      // Optionally, call server to delete video here if API supported
    }
  };

  const filteredVideos = videos.filter(video =>
    video.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.Id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-1/2"
        />
        <button
          onClick={() => { setFormData({ Id: "", Title: "", Description: "" }); setShowModal(true); setEditingIndex(null); }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add Video
        </button>
      </div>

      {/* Videos Table */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="font-bold text-purple-700 mb-3">Videos List</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2">{video.Id}</td>
                  <td className="p-2">{video.Title}</td>
                  <td className="p-2">{video.Description}</td>
                  <td className="p-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(videos.indexOf(video))}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(videos.indexOf(video))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No videos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal with Blur Background */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">
              {editingIndex !== null ? "Edit Video" : "Add New Video"}
            </h2>

            <input
              type="text"
              name="Id"
              value={formData.Id}
              onChange={handleChange}
              placeholder="Video ID"
              required
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full border p-2 mb-3 rounded-lg"
            />

            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Description"
              required
              rows="4"
              className="w-full border p-2 mb-3 rounded-lg"
            ></textarea>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => { setShowModal(false); setEditingIndex(null); }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                {editingIndex !== null ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
