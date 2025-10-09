import React, { useEffect } from "react";
import Popup from "../Popup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// 🔹 Fullscreen Hero Background Slides
const bgSlides = [
  {
    title: "SSL Cloud Solution – 24/7 IT Support",
    subtitle:
      "We keep your business running non-stop with round-the-clock monitoring, troubleshooting, and technical care.",
    img: "https://t4.ftcdn.net/jpg/02/16/03/29/240_F_216032911_ucJ5iqmB8dWrQ3xlahj9evv4D3qfqdVb.jpg",
  },
  {
    title: "SSL Cloud Solution – Professional IT Training",
    subtitle:
      "Upskill with our industry-leading IT training programs designed to empower individuals and teams with real-world expertise.",
    img: "https://media.istockphoto.com/id/1093925980/photo/successful-happy-group-of-people-learning-software-engineering-and-business-during.jpg?s=612x612&w=0&k=20&c=ic9E7uoMB1FxkpS135aQGcPsvfzlqtWamJuu5DBYNNs=",
  },
  {
    title: "SSL Cloud Solution – IT Project Consulting",
    subtitle:
      "Transform ideas into successful IT projects with our proven consulting framework and expert strategies.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&auto=format&fit=crop&q=80",
  },
  {
    title: "SSL Cloud Solution – Deployment Process",
    subtitle:
      "From development to live production — we ensure smooth, secure, and scalable deployments every time.",
    img: "https://media.istockphoto.com/id/2236081444/photo/the-elderly-man-is-monitoring-system-performance.jpg?s=612x612&w=0&k=20&c=AZIpJpnS3y9uy_xYQ8gqb6Pvu4ZPZPBmd04CZHJOSz4=",
  },
];

// 🔹 Services Section
const services = [
  {
    title: "IT Support",
    desc: "SSL Cloud Solution provides proactive and reliable IT support to ensure your systems never slow down your business.",
    img: "https://media.istockphoto.com/id/1061238334/photo/online-technical-support-customer-service-24-7.jpg?s=612x612&w=0&k=20&c=y0kgK6WjoTp-SIo8aX3yBu7_O4Mbty9hwr4v9p5vQ4w=",
  },
  {
    title: "IT Training",
    desc: "At SSL Cloud Solution, we deliver hands-on IT training programs that prepare professionals for real-world challenges.",
    img: "https://media.istockphoto.com/id/1143678440/photo/personal-growth-concept.jpg?s=612x612&w=0&k=20&c=93yxlOtOZWPUPRFardh7fAPaY-u0xZf9q0jjEaO0-To=",
  },
  {
    title: "Project Consulting",
    desc: "SSL Cloud Solution drives innovation with expert IT project consulting tailored to accelerate business transformation.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80",
  },
  {
    title: "Deployment Process",
    desc: "SSL Cloud Solution ensures hassle-free deployment of IT systems with a focus on scalability, security, and reliability.",
    img: "https://media.istockphoto.com/id/2201576418/photo/devops-software-development-and-it-operations-software-engineer-project-manager-working-in.jpg?s=612x612&w=0&k=20&c=Ho9H69WfPHxoACwvnsjqdHwHRODtrUl1OgmVA5qdacI=",
  },
];

const HomeSection = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1200, once: true });
    }
  }, []);

  return (
    <>
      {/* 🔹 Hero Fullscreen Background Slider */}
      <div className="relative h-screen w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          className="h-screen w-full"
        >
          {bgSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="h-screen w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h1
                    className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
                    data-aos="fade-up"
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-8 leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {slide.subtitle}
                  </p>
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-2xl transition transform hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    Get Started with SSL Cloud
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Services Full Image Overview */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
            data-aos="fade-up"
          >
            Why Choose SSL Cloud Solution?
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                data-aos="fade-up"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                />
                {/* Overlay text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-100">
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Popup />
    </>
  );
};

export default HomeSection;
