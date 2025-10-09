import React from "react";
import { Briefcase, Star, Rocket, Award } from "lucide-react";

export default function PlacementHighlight() {
  const companies = [
    "Google",
    "Amazon",
    "Microsoft",
    "IBM",
    "Dell",
    "Deloitte",
    "EY",
    "Goldman Sachs",
    "PayPal",
    "Tech Mahindra",
    "UST",
    "PhonePe",
  ];

  const skills = [
    "DevOps",
    "Cloud Computing",
    "Linux Administration",
    "Kubernetes & Docker",
    "CI/CD Pipelines",
    "System Design",
    "Agile Methodologies",
  ];

  return (
    <section
      className="relative py-20 px-6 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Launch Your Career with Top Global Companies
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto">
          Our students get placed in leading organizations by mastering
          in-demand tech skills and gaining real industry experience.
        </p>

        {/* Skills Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg hover:bg-white/20 transition"
            >
              <div className="flex items-center justify-center gap-2 font-semibold text-sm md:text-base">
                <Star className="w-5 h-5 text-yellow-400" />
                {skill}
              </div>
            </div>
          ))}
        </div>

        {/* Placement Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <Briefcase className="w-10 h-10 mx-auto mb-3 text-blue-400" />
            <h3 className="text-xl font-semibold mb-1">1000+ Students</h3>
            <p className="text-sm text-gray-300">Successfully placed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <Award className="w-10 h-10 mx-auto mb-3 text-green-400" />
            <h3 className="text-xl font-semibold mb-1">Top Skill Training</h3>
            <p className="text-sm text-gray-300">
              Industry-aligned DevOps & Cloud skills
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <Rocket className="w-10 h-10 mx-auto mb-3 text-pink-400" />
            <h3 className="text-xl font-semibold mb-1">Career Acceleration</h3>
            <p className="text-sm text-gray-300">
              From beginner to job-ready in months
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <Star className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
            <h3 className="text-xl font-semibold mb-1">Trusted by Companies</h3>
            <p className="text-sm text-gray-300">
              Students placed in top MNCs globally
            </p>
          </div>
        </div>

        {/* Company Names Line
        <div className="text-sm md:text-base text-gray-200 max-w-4xl mx-auto leading-relaxed">
          <span className="font-semibold">
            Proud placement partners include top organizations like
          </span>{" "}
          {companies.slice(0, -1).join(", ")} and {companies[companies.length - 1]}.
        </div> */}
      </div>
    </section>
  );
}
