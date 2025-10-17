import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const BASE_URL = "https://api.sslcloudservices.com/auth/instructor";
const IMAGE_BASE = "https://api.sslcloudservices.com";
const INSTRUCTOR_GROUP_LINK = "https://chat.whatsapp.com/BYHzVrByqkuD19DFHrnQ6h?mode=wwt";

const ProfileSlider = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(BASE_URL);
        const result = await res.json();
        if (result.success && result.data) {
          setProfiles(
            result.data.map((p) => ({
              ...p,
              image: p.image?.startsWith("http")
                ? p.image
                : `${IMAGE_BASE}${p.image}`,
            }))
          );
        }
      } catch (err) {
        console.error("❌ Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="relative w-full py-20 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-[#1a0b2e] to-black overflow-hidden">
      {/* Floating color glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-fuchsia-500/30 rounded-full blur-3xl top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center px-6 py-4 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 mb-3">
          Our Elite Instructors
        </h2>
        <p className="text-gray-300 max-w-2xl mb-12">
          Skilled professionals guiding you through advanced learning — crafted for excellence, powered by passion.
        </p>

        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading profiles...</p>
        ) : profiles.length > 0 ? (
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }}
            modules={[Autoplay, Pagination]}
            className="w-full pb-16"
          >
            {profiles.map((p, index) => (
              <SwiperSlide key={p._id || index} className="px-4">
                <motion.div
                  whileHover={{
                    scale: 1.07,
                    rotateX: 6,
                    rotateY: -6,
                    boxShadow: "0 25px 70px rgba(168, 85, 247, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 10 }}
                  className="bg-gradient-to-br from-[#1a1a2e] via-[#2b1055] to-[#3a0ca3] rounded-3xl border border-fuchsia-600/40 shadow-lg hover:shadow-fuchsia-700/50 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 p-6"
                >
                  {/* Image */}
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-indigo-500 rounded-2xl blur-lg opacity-60"></div>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="relative z-10 w-full h-full object-cover rounded-2xl border-2 border-fuchsia-400/30 shadow-md"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-left">
                    <h2 className="text-xl font-bold text-white">{p.name}</h2>
                    <h4 className="text-sm text-fuchsia-300 mt-1 font-medium">
                      {p.role ? `Specialist in ${p.role}` : "Lead Instructor"}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < (p.rating || 0)
                              ? "fill-fuchsia-400 text-fuchsia-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">
                        ({p.rating || "0"}/5)
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mt-3 leading-relaxed line-clamp-3">
                      {p.description ||
                        "A mentor driven by innovation and excellence — empowering learners to achieve mastery."}
                    </p>

                    {/* Contact Button */}
                    <a
                      href={INSTRUCTOR_GROUP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block w-full text-center py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-fuchsia-500 transition-all shadow-md hover:shadow-fuchsia-500/40"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus size={16} />
                        Join Instructor Group
                      </div>
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-400">No instructors found.</p>
        )}

        {/* Pagination */}
        <div className="custom-pagination mt-8 flex justify-center gap-3"></div>
      </div>

      {/* Pagination Style */}
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #a855f7;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 12px;
          height: 12px;
          background: #f0abfc;
        }
      `}</style>
    </div>
  );
};

export default ProfileSlider;
