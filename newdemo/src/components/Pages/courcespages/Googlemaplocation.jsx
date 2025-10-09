import React from "react";
import { Calendar, MapPin, Phone, Clock } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Event Info Section */}
      <div className="w-full bg-white shadow-lg rounded-2xl max-w-5xl mx-auto mt-10 p-8">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          SSL Cloud Solution Center
        </h2>

        {/* Column Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item */}
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-blue-100">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Open All Weekend</p>
              <p className="text-gray-600">8:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-red-100">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">
                373 Civil Linens, PW.D Guest House
              </p>
              <p className="text-gray-600">
                Reliance Jio Office, Pratapgarh, UP 23001, India
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-green-100">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">
                +91 8299408873 / +91 9161306023
              </p>
              <p className="text-gray-600">Phone Numbers</p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Open All Weekend</p>
              <p className="text-gray-600">8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full mt-8 flex-grow">
        <iframe
          title="Google Map - Pratapgarh"
          className="w-full h-[500px] md:h-[600px] rounded-none"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Pratapgarh%20Uttar%20Pradesh,%20India+(SSL%20Cloud%20Solution%20Center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default EventDetails;
