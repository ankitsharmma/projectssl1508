import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import kingpng from "../assets/kindpng.png";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../components/utils";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Animation init
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  // ✅ Base API URL
  const BASE_URL = "/auth";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch(`${BASE_URL}/Adminlogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name: userName, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", userName);
        setTimeout(() => navigate("/DashboardAdmin"), 1000); // ✅ Navigate Admin Dashboard
      } else if (error) {
        const details = error?.details?.[0]?.message || error;
        handleError(details);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      handleError(err.message || "Network error");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div
          className="flex-1 flex flex-col justify-center items-center p-8 bg-white"
          data-aos="fade-right"
        >
          <h1 className="text-3xl font-bold mt-20 mb-2">✦ Admin Login</h1>

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={loginInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1" data-aos="fade-left">
          <img
            src={kingpng}
            alt="Chart"
            className="w-full h-80 mt-20 md:h-full object-cover rounded-t-2xl md:rounded-tr-none md:rounded-bl-2xl"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminLogin;
