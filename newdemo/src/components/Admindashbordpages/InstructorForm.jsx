import { useState, useEffect } from "react";

export default function InstructorForm() {
  const BASE_URL = "http://localhost:8080/auth/instructor";

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [showForm, setShowForm] = useState(false); // modal toggle state

  // Form input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Fetch instructors
  const fetchInstructors = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setInstructors(data.data || []);
    } catch (err) {
      console.error("Error fetching instructors:", err);
    }
  };

  // Submit instructor
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("rating", formData.rating);
    data.append("image", formData.image);

    const res = await fetch(BASE_URL, { method: "POST", body: data });
    const result = await res.json();
    alert(result.message || "Instructor Added!");

    setFormData({ name: "", role: "", rating: "", image: null });
    setPreview(null);
    setShowForm(false); // close modal after submit
    fetchInstructors();
  };

  // Delete instructor by name
  const handleDelete = async (name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const result = await res.json();
      alert(result.message || "Instructor Deleted!");
      fetchInstructors();
    } catch (err) {
      console.error("Error deleting instructor:", err);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-6">
      {/* Table Header with Add Button */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Instructor List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Add Instructor
        </button>
      </div>

      {/* Modal Form with Blur Background */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl z-10">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Add Instructor
            </h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5"
            >
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Enter instructor name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />

              {/* Role */}
              <input
                type="text"
                name="role"
                placeholder="Enter instructor role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />

              {/* Rating */}
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                placeholder="Enter instructor rating"
                value={formData.rating}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />

              {/* Image */}
              <div>
                <input
                  type="file"
                  name="image"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Choose File
                </label>
                {formData.image && (
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.image.name}
                  </span>
                )}
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mt-3"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-1/2 py-3 bg-gray-300 text-gray-800 rounded-xl font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructor Table */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Rating</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {instructors.length > 0 ? (
              instructors.map((inst) => (
                <tr key={inst._id}>
                  <td className="border px-4 py-2 text-center">
                    {inst.image ? (
                      <img
                        src={`http://localhost:8080${inst.image}`}
                        alt={inst.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2">{inst.name}</td>
                  <td className="border px-4 py-2">{inst.role}</td>
                  <td className="border px-4 py-2">{inst.rating}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(inst.name)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No instructors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
