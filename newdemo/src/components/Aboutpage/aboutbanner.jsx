import React from "react";

function AboutBanner() {
  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://cdn.videvo.net/videvo_files/video/free/2016-08/large_watermarked/160719_087_London_Ambition_1080p_preview.webm"
          type="video/webm"
        />
        <source
          src="https://media.istockphoto.com/id/1498550005/video/gleaming-glass-marvels-redefine-corporate-building.mp4?s=mp4-640x640-is&k=20&c=0RauynB8eNI_Zk2GIYxAzQP_kmtAU5qb25CeF_Bdmc4="
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Glow Decorations */}
      <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl bottom-0 right-0 animate-ping"></div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          About Us
        </h1>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 mx-auto rounded-full"></div>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
          Discover our journey, values, and mission to deliver excellence in
          technology and innovation.
        </p>
      </div>
    </div>
  );
}

export default AboutBanner;
