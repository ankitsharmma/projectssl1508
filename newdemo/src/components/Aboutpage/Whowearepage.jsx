import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VanillaTilt from "vanilla-tilt";
import { Cloud, Cog, Cpu, GraduationCap, Server, Target, Eye, Award, Headphones } from "lucide-react";

function Whowearepage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const tiltCards = document.querySelectorAll(".tilt-card");
    VanillaTilt.init(tiltCards, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  const coreServices = [
    {
      title: "DevOps & Cloud Automation",
      description:
        "End-to-end DevOps consulting, CI/CD pipeline setup, cloud deployments, and automation solutions.",
      icon: <Cog className="w-14 h-14 text-indigo-600 mx-auto mb-4" />,
    },
    {
      title: "Automobile Sector Automation",
      description:
        "Smart automation solutions for the automobile sector, optimizing processes and enhancing operations.",
      icon: <Server className="w-14 h-14 text-blue-600 mx-auto mb-4" />,
    },
    {
      title: "AI/ML Research & Development",
      description:
        "Building innovative AI/ML models for business automation, predictive analysis, and smart systems.",
      icon: <Cpu className="w-14 h-14 text-pink-600 mx-auto mb-4" />,
    },
    {
      title: "Enterprise IT Support & Cloud Management",
      description:
        "24/7 cloud infrastructure management and IT support for businesses of all sizes.",
      icon: <Cloud className="w-14 h-14 text-green-600 mx-auto mb-4" />,
    },
    {
      title: "Training & Placement",
      description:
        "Industry-relevant training in DevOps, Cloud, Automation, AI/ML, and helping learners get placed in top tech companies.",
      icon: <GraduationCap className="w-14 h-14 text-yellow-600 mx-auto mb-4" />,
    },
  ];

  return (
    <>
      {/* Hero / Who We Are */}
      <section
        className="relative py-24 bg-fixed bg-center bg-cover text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
        }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 drop-shadow-lg">
            Who We Are
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            SSL CLOUD Solutions is a trusted IT services and training company
            with 7+ years of experience in DevOps, Cloud Computing, Automation,
            AI/ML, and IT Support.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section
        className="relative py-24 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')",
        }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-indigo-900/70 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {coreServices.map((service, index) => (
              <div
                key={index}
                className="tilt-card bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center transition-transform duration-500 hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                {service.icon}
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder’s Message */}
      <section
        className="relative py-20 bg-fixed bg-center bg-cover text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Founder’s Message
          </h2>
          <blockquote className="text-2xl italic max-w-3xl mx-auto mb-6 text-gray-200">
            "At SSL CLOUD Solutions, we believe that technology should empower
            every individual and organization. With the right skills and
            practical experience, anyone can build a successful career."
          </blockquote>
          <p className="text-xl font-semibold text-indigo-200">
            – [Prasant Singh], Founder & CEO
          </p>
        </div>
      </section>

      {/* Milestones */}
      <section
        className="relative py-20 bg-fixed bg-center bg-cover text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&q=80')",
        }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-indigo-800/80"></div>
        <div className="relative container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
            Company Milestones
          </h2>
          <ul className="max-w-3xl mx-auto space-y-6 text-lg">
            <li>2018 – Founded with a vision to empower tech careers.</li>
            <li>2019 – Delivered automation solutions to automobile sector.</li>
            <li>2020 – Expanded IT Support & Cloud Management services.</li>
            <li>2021 – Initiated AI/ML research and development.</li>
            <li>2022 – Trained 2000+ professionals in Cloud & DevOps.</li>
            <li>2023 – Became a full-scale IT consulting provider.</li>
            <li>2024 – Expanded automation projects globally.</li>
            <li>2025 – Serving clients across IT, Cloud, and Automation.</li>
          </ul>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 text-center">
          <div className="p-8 bg-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition">
            <Eye className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be a global leader in IT solutions, empowering individuals and
              enterprises with automation, cloud, and AI/ML technologies.
            </p>
          </div>
          <div className="p-8 bg-indigo-50 rounded-2xl shadow-md hover:shadow-xl transition">
            <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Deliver cutting-edge IT services, practical training, and
              innovation that bridges the gap between technology and business.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">7+ Years Experience</h3>
              <p className="text-gray-600 mt-2">
                Trusted expertise in IT services, automation, and cloud
                solutions.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-gray-600 mt-2">
                Dedicated team ensuring uptime, performance, and client
                satisfaction.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Expert Trainers</h3>
              <p className="text-gray-600 mt-2">
                Hands-on training by industry professionals with real-world
                projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Whowearepage;
