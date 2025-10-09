import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TrainingInfoMediumBlur = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const features = [
    {
      title: "Personalized Learning",
      desc: "We assess your skill level and career goals to recommend the most suitable course.",
    },
    {
      title: "Live Expert-Led Training",
      desc: "Industry experts conduct interactive sessions with real-world case studies and exercises.",
    },
    {
      title: "Hands-On Experience",
      desc: "Work on real-time projects and case studies to ensure applied learning.",
    },
    {
      title: "Flexible Learning Options",
      desc: "Choose from instructor-led, self-paced, or corporate programs as per your convenience.",
    },
  ];

  return (
    <section
      className="relative py-16 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Medium Blur Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <h2
          className="text-4xl font-extrabold text-white mb-8 border-l-4 border-pink-400 pl-4 p-2 rounded-md backdrop-blur-sm"
          data-aos="fade-down"
        >
          How We Work
        </h2>

        {/* Intro Paragraph */}
        <p
          className="text-white/90 mb-12 leading-relaxed text-center max-w-3xl p-4 rounded-lg backdrop-blur-sm"
          data-aos="fade-up"
        >
          At SL Cloud Services, we follow a structured, results-driven approach
          to deliver high-quality online training programs. Every learner gains
          deep knowledge, hands-on experience, and career-enhancing skills.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/15 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 transform transition-transform duration-700 hover:scale-105 hover:-translate-y-3 hover:rotate-y-6"
              data-aos="zoom-in-up"
              data-aos-delay={idx * 200}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingInfoMediumBlur;
