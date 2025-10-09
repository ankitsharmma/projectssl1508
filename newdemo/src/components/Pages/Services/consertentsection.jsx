import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./customStyles.css";
import {
  Lightbulb,
  Cpu,
  Rocket,
  Users,
  BarChart4,
  Layers,
  Globe2,
  Database,
  ShieldCheck,
  Workflow,
  Zap,
  Brain,
} from "lucide-react";

export default function ConsultationSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const topics = [
    { title: "Innovation Strategy", icon: <Lightbulb size={38} />, desc: "Turn creative ideas into market-ready solutions." },
    { title: "AI & Machine Learning", icon: <Brain size={38} />, desc: "Empower decision-making with intelligent systems." },
    { title: "Digital Transformation", icon: <Cpu size={38} />, desc: "Modernize infrastructure and boost agility." },
    { title: "Growth Marketing", icon: <Rocket size={38} />, desc: "Accelerate brand visibility and business expansion." },
    { title: "Data Intelligence", icon: <Database size={38} />, desc: "Leverage data analytics for smarter insights." },
    { title: "Cybersecurity", icon: <ShieldCheck size={38} />, desc: "Protect your business with next-gen defense." },
    { title: "Team Empowerment", icon: <Users size={38} />, desc: "Build agile teams that drive innovation." },
    { title: "Product Optimization", icon: <Workflow size={38} />, desc: "Streamline workflows and boost performance." },
    { title: "Cloud Architecture", icon: <Layers size={38} />, desc: "Scalable and flexible cloud solutions." },
    { title: "Automation Systems", icon: <Zap size={38} />, desc: "Automate repetitive tasks with precision." },
    { title: "Market Expansion", icon: <Globe2 size={38} />, desc: "Go global with efficient digital ecosystems." },
    { title: "Performance Insights", icon: <BarChart4 size={38} />, desc: "Measure, refine, and scale efficiently." },
  ];

  return (
    <section className="relative overflow-hidden bg-[#030712] text-white py-24">
      {/* 🌈 Parallax gradient background layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[80rem] h-[80rem] -top-40 -left-40 bg-gradient-to-r from-blue-600/20 via-purple-700/20 to-transparent blur-3xl rounded-full animate-parallax-slow"></div>
        <div className="absolute w-[60rem] h-[60rem] bottom-0 right-0 bg-gradient-to-l from-cyan-400/20 via-indigo-500/20 to-transparent blur-3xl rounded-full animate-parallax-fast"></div>
      </div>

      {/* ✨ Title */}
      <div className="text-center mb-20" data-aos="fade-up">
        <h4 className="text-cyan-400 uppercase tracking-wider font-semibold mb-2">
          Innovative Excellence
        </h4>
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Building the Future with Strategy & Vision
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We combine creativity, technology, and strategy to deliver digital solutions that drive real business impact.
        </p>
      </div>

      {/* 🧩 Cards Grid */}
      <div className="relative container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {topics.map((item, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            className="group relative p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-700 hover:-translate-y-2"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
