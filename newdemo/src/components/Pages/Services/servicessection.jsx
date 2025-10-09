import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Globe,
  BarChart2,
  Code,
  BookOpen,
  Users,
  Smartphone,
  Cpu,
  Shield,
  Cloud,
} from "lucide-react";

const services = [
  { title: "Website Solutions", description: "Responsive, fast, and SEO-friendly websites.", icon: <Globe size={28} /> },
  { title: "Digital Marketing", description: "Boost online presence with targeted campaigns.", icon: <BarChart2 size={28} /> },
  { title: "Software Development", description: "End-to-end software solutions for businesses.", icon: <Code size={28} /> },
  { title: "Skill Development", description: "IT skill training for individuals and teams.", icon: <BookOpen size={28} /> },
  { title: "Recruitment", description: "Global IT recruitment connecting top talent.", icon: <Users size={28} /> },
  { title: "Mobile Development", description: "Custom apps for iOS & Android.", icon: <Smartphone size={28} /> },
  { title: "AI & ML Solutions", description: "Intelligent systems and machine learning models.", icon: <Cpu size={28} /> },
  { title: "Cybersecurity", description: "Protect your systems and data with robust security solutions.", icon: <Shield size={28} /> },
  { title: "Cloud Solutions", description: "Scalable and secure cloud infrastructure for enterprises.", icon: <Cloud size={28} /> },
];

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gray-900 text-white">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Particle Lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-20 bg-white/10 animate-fade-up"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h4 className="text-cyan-400 uppercase tracking-wider font-semibold mb-2">
          Our Services
        </h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          Innovative AI & IT Solutions for Businesses
        </h2>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative flex flex-col items-start p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-cyan-400 via-purple-400 to-pink-400 rounded-xl text-white mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
