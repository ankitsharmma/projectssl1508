import React from "react";

const Servicesbanner = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src="https://media.istockphoto.com/id/2207613965/video/work-on-a-laptop-with-sending-data-at-the-end-of.mp4?s=mp4-640x640-is&k=20&c=Vf1fLMT3xwfr3saB5HluaVDf625KluJyxiqD9vsu7tY="
      />

      {/* Dark Overlay for text visibility */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/40 rounded-full animate-bounce-slow mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-20 w-48 h-24 bg-pink-400/30 rounded-xl animate-spin-slow mix-blend-overlay"></div>
      <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-green-400/30 rounded-tr-[50%] animate-pulse-slow mix-blend-screen"></div>
      <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-purple-400/20 rounded-full animate-bounce-delay mix-blend-overlay"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight tracking-wide">
            Empowering Businesses <br /> Through Technology
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-white/90 font-light drop-shadow-lg">
            Delivering innovative IT solutions with <span className="font-semibold text-yellow-300">creativity</span>, <span className="font-semibold text-pink-300">security</span> and <span className="font-semibold text-green-300">scalability</span>.
          </p>
          <p className="mt-4 text-base md:text-lg text-white/80 font-light italic drop-shadow">
            — SSL Cloud Services: Modern, colorful, and fully responsive cloud innovation.
          </p>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes bounceSlow {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
          }
          .animate-bounce-slow { animation: bounceSlow 6s ease-in-out infinite; }

          .animate-bounce-delay { animation: bounceSlow 8s ease-in-out infinite; }

          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow { animation: spinSlow 40s linear infinite; }

          @keyframes pulseSlow {
            0%,100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
};

export default Servicesbanner;
