import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminManager() {
  const  adminuser_url= "auth/Adminuser"
  const adminsignup_url= "auth/Adminsignup"
  const updateadmin_url= "auth/Adminuser/email"
  const deleteadmin_url= "auth/Adminuser/email"
 


  const [admins, setAdmins] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  // ✅ Fetch all admins (GET)
  const fetchAdmins = async () => {
    try {     
      const res = await fetch( `${adminuser_url}`, { method: "GET" });
      const data = await res.json();
      if (res.ok) {
        setAdmins(data.admins || []);
      } else {
        toast.error(data.message || "Failed to fetch admins");
      }
    } catch {
      toast.error("Server error!");
    }
  };

  // ✅ Create new admin (POST)
  const createAdmin = async (adminData) => {
    try {
      const res = await fetch( `${adminsignup_url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Admin created!");
        fetchAdmins();
      } else {
        toast.error(data.message || "Create failed");
      }
    } catch {
      toast.error("Server error!");
    }
  };

  // ✅ Update admin (PUT)
  const updateAdmin = async (adminData) => {
    try {
      const res = await fetch(  ` ${updateadmin_url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Admin updated!");
        fetchAdmins();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Server error!");
    }
  };

  // ✅ Delete admin (DELETE)
  const deleteAdmin = async (email) => {
    try {
      const res = await fetch( `${deleteadmin_url}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Admin deleted!");
        fetchAdmins();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch {
      toast.error("Server error!");
    }
  };

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateAdmin(formData);
    } else {
      createAdmin(formData);
    }
    setIsOpen(false);
    setIsEdit(false);
    setFormData({ username: "", email: "", password: "", phone: "" });
  };

  // ✅ Edit admin
  const handleEdit = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: admin.password || "",
      phone: admin.phone || "",
    });
    setIsEdit(true);
    setIsOpen(true);
  };

  // ✅ Delete confirm
  const handleDelete = (email) => {
    if (window.confirm("Delete this admin?")) {
      deleteAdmin(email);
    }
  };

  // ✅ Load admins on mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Admin Manager</h1>
        <button
          onClick={() => {
            setIsEdit(false);
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Admin
        </button>
      </div>

      {/* ✅ Admin List */}
      <div className="space-y-4">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin._id}
              className="p-4 bg-white rounded-lg shadow-md border w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <p>
                  <span className="font-semibold">Username:</span> {admin.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {admin.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {admin.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Password:</span> {admin.password}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(admin)}
                  className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(admin.email)}
                  className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No admins found.</p>
        )}
      </div>

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">
              {isEdit ? "Edit Admin" : "Add Admin"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border px-3 py-2 rounded-lg"
                disabled={isEdit} // prevent changing email during edit
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (10 digits)"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEdit(false);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
