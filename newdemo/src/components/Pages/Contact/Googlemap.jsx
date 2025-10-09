import React from "react";

function Googlemap() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Overlay gradient for style */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-30"></div>

      {/* Decorative animated blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-400/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-pink-400/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Google Map iframe */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=Pratapgarh,Uttar%20Pradesh,India&z=15&output=embed"
          loading="lazy"
          allowFullScreen
          className="w-full h-full border-0 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
        ></iframe>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </section>
  );
}

export default Googlemap;
