import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

const BASE_URL = " /auth/instructor";
   const IMAGE_BASE = "https://api.sslcloudservices.com";

const ProfileSlider = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch( BASE_URL);
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
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="w-full py-16 flex flex-col items-center justify-center bg-gradient-to-b from-white-50 to-white">
      <div className="w-full h-full max-w-5xl flex flex-col items-center px-6 py-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading instructors...</p>
        ) : profiles.length > 0 ? (
          <Swiper
            slidesPerView={1}
            loop={true} // ✅ important for autoplay
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // ✅ keeps autoplay after swipe
              pauseOnMouseEnter: true, // ✅ stops when mouse hover (optional)
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Pagination]} // ✅ autoplay module included
            className="w-full pb-16"
          >
            {profiles.map((p) => (
              <SwiperSlide key={p._id} className="px-4">
                <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300 border border-gray-100">
                  {/* Circular Image */}
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border-4 border-blue-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-bold uppercase text-gray-800 text-sm tracking-wide">
                    {p.role ? `CRACKED ${p.role}` : "INSTRUCTOR"}
                  </h3>

                  {/* Name */}
                  <h2 className="mt-1 text-lg font-semibold text-gray-700">
                    {p.name}
                  </h2>

                  {/* Rating Stars */}
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < (p.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        } mx-0.5`}
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {p.description ||
                      `Professional instructor with rating ${p.rating || 0}/5`}
                  </p>

                  {/* Footer */}
                  <p className="mt-4 text-xs text-red-600 font-medium">
                    by SSL Cloud Services
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-600">No instructors found.</p>
        )}
      </div>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination mt-6 flex justify-center gap-2"></div>

      {/* Custom Pagination Style */}
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 14px;
          height: 14px;
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default ProfileSlider;
