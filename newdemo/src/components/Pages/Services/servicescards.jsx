import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ServiceCards = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const cards = [
    {
      title: "Affordable",
      text: "Your affordable partner for website solutions, digital marketing, social media, mobile apps, and SEO. Empowering your online growth without compromising quality.",
      image:
        "https://media.istockphoto.com/id/1399752372/photo/woman-watching-presentation-on-laptop.jpg?s=612x612&w=0&k=20&c=YCdlN38-rAXfMOp3XDCxtPZdBEYlarFMeizG1j3QWSc=",
    },
    {
      title: "Professional",
      text: "SSL cloud services is a comprehensive digital solutions Agency. From web expertise and digital marketing to app development, we deliver professional results that empower your success.",
      image:
        "https://img.freepik.com/free-photo/young-businessman-sitting-office-working-laptop-while-drinking-coffee-there-are-people-background_637285-2.jpg?ga=GA1.1.1039965199.1713434742&semt=ais_hybrid&w=740",
    },
    {
      title: "Tech Partner",
      text: "Your round-the-clock tech partner. We offer seamless tech suggestions for your brand that will empower your digital journey 24/7.",
      image:
        "https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003789.jpg?ga=GA1.1.1039965199.1713434742&semt=ais_hybrid&w=740",
    },
  ];

  return (
    <div className="px-6 py-20 bg-gradient-to-r from-slate-900 via-gray-900 to-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg bg-gray-800 text-white transition-all duration-500 hover:shadow-cyan-500/50"
            data-aos="fade-up"
          >
            {/* Image Section */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 relative transition-all duration-500 group-hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {card.text}
              </p>
            </div>

            {/* Glow Border Effect */}
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/60 transition-all duration-500"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
