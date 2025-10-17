import React, { useState, useEffect } from "react";

export default function NewSellingCourses() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    durationHours: "",
    price: "",
    offPrice: "",
    discountPercent: "",
    image: null,
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const API_URL = "https://api.sslcloudservices.com/auth/newestsellingcourses";

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(` ${API_URL}`);
      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setCourses(data.data);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit form (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) dataToSend.append(key, value);
      });

      let res;
      if (isEdit) {
        // 🔹 Update → PUT (no id in URL)
        res = await fetch(` ${API_URL}`, {
          method: "PUT",
          body: dataToSend,
        });
      } else {
        // 🔹 Create → POST
        res = await fetch(` ${API_URL}`, {
          method: "POST",
          body: dataToSend,
        });
      }

      if (res.ok) {
        await fetchCourses();
      }

      resetForm();
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  // ✅ Edit (just open modal with data)
  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      category: course.category,
      durationHours: course.durationHours,
      price: course.price,
      offPrice: course.offPrice || "",
      discountPercent: course.discountPercent || "",
      image: null,
      description: course.description,
    });
    setPreview(course.image ? `${API_URL}${course.image}` : null);
    setIsEdit(true);
    setIsOpen(true);
  };

  // ✅ Delete (no id in URL)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch( `${API_URL}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchCourses();
      }
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setIsOpen(false);
    setIsEdit(false);
    setFormData({
      title: "",
      category: "",
      durationHours: "",
      price: "",
      offPrice: "",
      discountPercent: "",
      image: null,
      description: "",
    });
    setPreview(null);
  };

  return (
    <div className="p-4 md:p-6 font-sans">
      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Add newest  Course
        </button>
      </div>

      {/* ✅ List Courses */}
      <div className="mt-6 grid gap-4">
        {courses.length > 0 ? (
          courses.map((c, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border space-y-2"
            >
              <p>
                <strong>Title:</strong> {c.title}
              </p>
              <p>
                <strong>Category:</strong> {c.category}
              </p>
              <p>
                <strong>Duration:</strong> {c.durationHours} hrs
              </p>
              <p>
                <strong>Price:</strong> ₹{c.price}
              </p>
              <p>
                <strong>Off Price:</strong> {c.offPrice || "-"}
              </p>
              <p>
                <strong>Discount:</strong> {c.discountPercent || "-"}%
              </p>
              <p>
                <strong>Description:</strong> {c.description}
              </p>
              <div>
                {c.image ? (
                  <img
                    src={`${API_URL}${c.image}`}
                    alt="course"
                    className="w-full max-w-[150px] h-auto object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>

              {/* ✅ Actions */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses found</p>
        )}
      </div>

      {/* ✅ Popup Form */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={resetForm}
          ></div>

          <div className="relative bg-white w-full max-w-3xl mx-4 p-6 md:p-8 rounded-2xl shadow-xl z-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
              {isEdit ? "Update Course" : "Add Best Selling Course"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-3">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <input
                  type="number"
                  name="durationHours"
                  value={formData.durationHours}
                  onChange={handleChange}
                  placeholder="Enter duration (hours)"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <input
                  type="number"
                  name="offPrice"
                  value={formData.offPrice}
                  onChange={handleChange}
                  placeholder="Enter discounted price"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="number"
                  name="discountPercent"
                  value={formData.discountPercent}
                  onChange={handleChange}
                  placeholder="Enter discount %"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg shadow-md"
                  />
                )}
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-[95px]"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-1/2 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
