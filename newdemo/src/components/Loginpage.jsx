import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../components/utils";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import loginImg from "../assets/kindpng.png";
import { useAuth } from "../Authcontext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ useAuth context
  

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Set your backend login API URL here
  const URL_Login = "https://api.sslcloudservices.com/auth/login"; // Change to full URL if backend is on another domain

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
      const response = await fetch(`${URL_Login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name: userName, error } = result;

      if (success) {
        handleSuccess(message);

        // ✅ Update global auth state
        login({ name: userName, token: jwtToken });

        // ✅ Save to localStorage (optional)
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", userName);

        setTimeout(() => navigate("/VideoGallery"), 1000);
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
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800">
        {/* Left Section */}
        <div
          className="md:w-1/2 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col justify-center items-center text-white p-10 md:p-16 relative overflow-hidden"
          data-aos="fade-right"
        >
          <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-2xl bottom-10 right-10"></div>

          <div className="relative z-10 text-center">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
            />
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-lg text-white/90 mb-8">
              “The future belongs to those who learn more skills and combine them
              creatively.”
            </p>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Right Section (Login Form) */}
        <div
          className="md:w-1/2 w-full flex justify-center items-center p-10 md:p-16"
          data-aos="fade-left"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-10">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
