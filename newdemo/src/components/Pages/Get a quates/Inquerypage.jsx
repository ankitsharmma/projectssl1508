import React from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function SimpleContactForm() {
  const socialIcons = [Facebook, Twitter, Instagram, Linkedin, Youtube];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row items-center justify-center px-4 py-16">
      
      {/* Left Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center mb-10 md:mb-0">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
          alt="Contact Hero"
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-2">Get in touch!</h1>
        <p className="text-gray-300 text-center mb-6">
          Have a question or need assistance? Fill out the form below, and we'll get back to you.
        </p>

        <form className="w-full space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <PhoneInput
            country={"in"}
            enableSearch
            inputClass="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            dropdownClass="bg-gray-800 text-white"
            placeholder="Phone Number"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Website Solution</option>
            <option>Mobile App</option>
            <option>Cloud Services</option>
          </select>
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          {socialIcons.map((Icon, idx) => (
            <a key={idx} href="#" className="text-gray-400 hover:text-white">
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
