import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesTopic() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const topics = [
    {
      title: "AI Strategy",
      color: "text-cyan-400",
      description: "Plan and implement AI solutions aligned with your business goals."
    },
    {
      title: "Machine Learning",
      color: "text-pink-400",
      description: "Develop intelligent models to predict, classify, and optimize outcomes."
    },
    {
      title: "Automation",
      color: "text-purple-400",
      description: "Streamline operations and reduce manual work with AI-driven automation."
    },
    {
      title: "Data Insights",
      color: "text-green-400",
      description: "Extract actionable insights from complex datasets using AI analytics."
    },
    {
      title: "Innovation",
      color: "text-blue-400",
      description: "Leverage AI to create cutting-edge solutions and stay ahead of competitors."
    }
  ];

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-start px-6 py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/40 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Main Heading */}
      <div data-aos="fade-up" className="relative z-10 max-w-4xl text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug text-white">
          Elevate Your Business with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 animate-gradient-x">
            AI-Driven Solutions
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 font-medium">
          <span className="text-white font-semibold">SSLCloud</span> provides advanced AI solutions
          to optimize operations, enhance decision-making, and accelerate business growth.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {topics.map((topic, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-black/30 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col items-start transition-transform duration-500 hover:scale-105"
          >
            <h2 className={`font-bold text-xl mb-2 ${topic.color}`}>{topic.title}</h2>
            <p className="text-gray-300 text-sm">{topic.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
