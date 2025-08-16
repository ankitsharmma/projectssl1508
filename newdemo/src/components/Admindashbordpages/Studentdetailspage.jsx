import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Studentdetailspage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // API endpoints (Vite proxy `/auth`)
  const Url_GetUser = "https://api.sslcloudservices.com/auth/user";
  const Url_DeleteUser = "https://api.sslcloudservices.com/auth/user/email";
  const Url_UpdateUser = "https://api.sslcloudservices.com/auth/user/email";
  const Url_Signup = "https://api.sslcloudservices.com/auth/signup";

  // Fetch all users
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch( Url_GetUser, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch users`);
      const json = await res.json();
      setData(json.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) return;
    try {
      const res = await fetch( Url_DeleteUser, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}: Failed to delete user`);
      setData((prev) => prev.filter((s) => s.email !== email));
      alert("User deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  // Open edit modal
  const handleEdit = (email) => {
    const student = data.find((s) => s.email === email);
    if (student) {
      setEditStudent(student);
      setFormData({ ...student });
    }
  };

  // Update user
  const handleFormSubmit = async () => {
    try {
      const res = await fetch( Url_UpdateUser, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Error ${res.status}: Failed to update user`);
      setData((prev) =>
        prev.map((s) =>
          s.email === editStudent.email ? { ...s, ...formData } : s
        )
      );
      alert("User updated successfully");
      setEditStudent(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Create user
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, address, password, confirmPassword } =
      signupInfo;

    if (!name || !email || !phoneNumber || !address || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch( Url_Signup , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      if (!res.ok) throw new Error(`Error ${res.status}: Failed to create user`);
      alert("User created successfully");
      setShowSignupModal(false);
      setSignupInfo({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // PDF export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Details", 14, 15);

    autoTable(doc, {
      head: [["Name", "Email", "Phone", "Address", "Password"]],
      body: filteredData.map((s) => [
        s.name,
        s.email,
        s.phoneNumber,
        s.address,
        s.password,
      ]),
      startY: 20,
    });

    doc.save("student_details.pdf");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredData = data.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
          placeholder="Search by name or email"
        />
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Download PDF
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create User
          </button>
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phoneNumber}</td>
                <td className="px-4 py-2">{s.address}</td>
                <td className="px-4 py-2">{s.password}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(s.email)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.email)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredData.map((s, i) => (
          <div key={i} className="bg-white shadow rounded p-4 space-y-1">
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Phone:</strong> {s.phoneNumber}</p>
            <p><strong>Address:</strong> {s.address}</p>
            <p><strong>Password:</strong> {s.password}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(s.email)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.email)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <div className="space-y-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
                readOnly
              />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="Password"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditStudent(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSignup}
            className="bg-white p-6 rounded shadow w-full max-w-md space-y-2"
          >
            <h2 className="text-xl font-bold">Create User</h2>
            <input
              name="name"
              value={signupInfo.name}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, name: e.target.value })
              }
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
            <input
              name="email"
              value={signupInfo.email}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, email: e.target.value })
              }
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <input
              name="phoneNumber"
              value={signupInfo.phoneNumber}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, phoneNumber: e.target.value })
              }
              placeholder="Phone"
              className="w-full border p-2 rounded"
            />
            <input
              name="address"
              value={signupInfo.address}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, address: e.target.value })
              }
              placeholder="Address"
              className="w-full border p-2 rounded"
            />
            <input
              name="password"
              type="password"
              value={signupInfo.password}
              onChange={(e) =>
                setSignupInfo({ ...signupInfo, password: e.target.value })
              }
              placeholder="Password"
              className="w-full border p-2 rounded"
            />
            <input
              name="confirmPassword"
              type="password"
              value={signupInfo.confirmPassword}
              onChange={(e) =>
                setSignupInfo({
                  ...signupInfo,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm Password"
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSignupModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Studentdetailspage;
