import { Twitter, Linkedin, Instagram, Facebook, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/ssl1.png";
// import skillIndia from "../../assets/skill-india.png";
import digitalIndia from "../../assets/digital-india.png";
import WhatsappButton from "../WhatsappButton";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-gray-200 pt-16 pb-8 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 opacity-20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <img src={logo} alt="SSL Cloud Solution Logo" className="w-36 mb-5" />
            <p className="text-sm flex items-start gap-2 leading-6">
              <MapPin size={16} className="mt-1 text-blue-400" />
              373 Civil Linens, P.W.D Guest House,<br />
              Reliance Jio Office, Pratapgarh UP 23001, India
            </p>
            <p className="mt-3 text-sm flex items-center gap-2">
              <Mail size={16} className="text-red-400" /> support@sslcloudsolution.com
            </p>
            <p className="text-sm flex items-center gap-2 mt-1">
              <Phone size={16} className="text-green-400" /> +91 8299408873 , 7204379415
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="/About-Us-Overview" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="/services" className="hover:text-blue-400 transition">Services</a></li>
            </ul>
          </div>

          {/* More About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">More About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/Cources-pages" className="hover:text-blue-400 transition">Courses</a></li>
              <li><a href="/House-Wires" className="hover:text-blue-400 transition">Instructor</a></li>
              <li><a href="/Servo-Transformer" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social + Bottom */}
        <div className="mt-12 flex flex-col gap-6 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-blue-600 transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-blue-700 transition">
                <Facebook size={18} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center">
              © 2025 <span className="text-white font-semibold">SSL Cloud Solution</span>. 
              All rights reserved. | Developed By <span className="text-blue-400">Ankit Sharma</span> ®
            </p>

            {/* Digital India Logo Right Side */}
            <div className="flex justify-end pr-4 md:pr-8">
              <img 
                src={digitalIndia} 
                alt="Digital India" 
                className="h-12 md:h-14 lg:h-16 object-contain drop-shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Left */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <WhatsappButton />
    </footer>
  );
}
