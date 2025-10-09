import React, { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactCards() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const cards = [
    {
      icon: <Phone className="w-10 h-10 text-white" />,
      title: "Phone",
      value: "+91 8299408873 , 7204379415",
      gradient: "from-green-400 via-lime-500 to-emerald-600",
      glow: "shadow-green-400/50",
    },
    {
      icon: <Mail className="w-10 h-10 text-white" />,
      title: "Email",
      value: "support@sslcloudsolution.com",
      gradient: "from-fuchsia-500 via-pink-500 to-rose-600",
      glow: "shadow-fuchsia-400/50",
    },
    {
      icon: <MapPin className="w-10 h-10 text-white" />,
      title: "Address",
      value:
        "373 Civil Linens, PW.D Guest House, Reliance Jio office, Pratapgarh UP 23001, India",
      gradient: "from-cyan-500 via-blue-500 to-indigo-700",
      glow: "shadow-cyan-400/50",
    },
  ];

  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden">
      {/* Background Layered Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.15),transparent_70%)]" />
        <div className="absolute -top-40 left-1/3 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/10 to-blue-500/10 blur-3xl animate-pulse-slow rounded-full" />
      </div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/40 rounded-full blur-sm animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center mb-16 px-4">
        <h2
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
          data-aos="fade-up"
        >
          Connect With Us
        </h2>
        <p
          className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          We’re here to answer your questions, collaborate on projects, and help
          your business grow with our solutions.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        {cards.map((card, i) => (
          <div
            key={i}
            data-aos="zoom-in"
            data-aos-delay={i * 200}
            className={`relative p-[2px] rounded-3xl bg-gradient-to-r ${card.gradient} hover:scale-105 transition-all duration-500 shadow-2xl ${card.glow}`}
          >
            <div className="relative bg-[#0a0f1f]/90 backdrop-blur-xl rounded-3xl p-10 h-full flex flex-col items-center text-center overflow-hidden">
              {/* Floating Icon Glow */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient} opacity-60`}
              ></div>

              <div
                className={`p-6 mb-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}
              >
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide mb-2">
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {card.value}
              </p>

              {/* Shimmer line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-30px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.7; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
