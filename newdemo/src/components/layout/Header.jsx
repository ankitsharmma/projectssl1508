import React, { useState, useEffect } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import logo from "../../assets/ssl1.png";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "Courses", href: "/Cources-pages" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 🔹 Top Info Bar (Desktop Only) */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white z-50 h-12 hidden md:flex items-center">
        <div className="container mx-auto flex items-center justify-between px-4 w-full text-xs md:text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <Mail className="w-4 h-4 text-yellow-300" />
              <span>support@sslcloudsolution.com</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <Phone className="w-4 h-4 text-green-300" />
              <span>+91 8299408873 , 7204379415</span>
            </div>
          </div>
          <div className="flex-1 mx-4 overflow-hidden text-center">
            <marquee className="text-yellow-300 font-semibold">
              🔔 Admission Open! Enroll Now for the Latest IT Courses. Limited Seats Available!
            </marquee>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm"
            >
              Student Login
            </a>
            <a
              href="/Institute-login"
              className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm"
            >
              Institute Login
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Main Header */}
      <header className="fixed top-0 md:top-12 left-0 w-full z-40 bg-white/90 backdrop-blur-lg shadow-lg h-16 flex items-center transition-all">
        <div className="container mx-auto flex items-center justify-between px-4 w-full">
          <img src={logo} alt="SSL Cloud Solution" className="h-12 w-auto drop-shadow-md" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="relative text-gray-700 hover:text-blue-600 font-medium transition group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="/Get-a-Quote"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform font-semibold"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Blurred Overlay */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Fullscreen Menu Panel */}
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-gray-700 hover:text-red-500 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center space-y-8 text-2xl font-semibold">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition transform hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <a
                href="/Get-a-Quote"
                className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-110 transition transform font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </a>

              {/* Login Buttons */}
              <div className="flex flex-col space-y-4 mt-8">
                <a
                  href="/login"
                  className="block text-center bg-gray-100 text-blue-600 px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Student Login
                </a>
                <a
                  href="/Institute-login"
                  className="block text-center bg-gray-100 text-blue-600 px-8 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Institute Login
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16 md:h-28" />
    </>
  );
}

export default Header;
