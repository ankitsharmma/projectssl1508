import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

// Neon gradient backgrounds
const bgVariants = [
  "bg-gradient-to-br from-[#ff4d6d] via-[#6c00ff] to-[#4dc6ff]",
  "bg-gradient-to-br from-[#ff6a00] via-[#ff1a75] to-[#6a1aff]",
  "bg-gradient-to-br from-[#1affd5] via-[#0066ff] to-[#ff00aa]",
  "bg-gradient-to-br from-[#ff0066] via-[#ffb300] to-[#00ffcc]",
  "bg-gradient-to-br from-[#8c00ff] via-[#ff007f] to-[#00ffff]",
];

const bestSellingCoursesUrl = "https://api.sslcloudservices.com/auth/bestsellingcourses";

const CourseCard = ({ course, index }) => {
  const bgColor = bgVariants[index % bgVariants.length];
  const finalPrice = Math.round(course.price - (course.price * course.discountPercent) / 100);

  return (
    <motion.div
      data-aos="flip-left"
      data-aos-delay={index * 100}
      whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3, boxShadow: "0 20px 40px rgba(255, 100, 255, 0.3)" }}
      transition={{ type: "spring", stiffness: 160, damping: 12 }}
      className={`${bgColor} relative rounded-3xl shadow-lg overflow-hidden border border-white/20 backdrop-blur-md transition-transform duration-300`}
    >
      {/* Discount Badge */}
      {course.discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
          {course.discountPercent}% OFF
        </div>
      )}

      {/* Course Image */}
      <div className="relative">
        <img
          src={`https://api.sslcloudservices.com${course.image}`}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-3xl"></div>
      </div>

      {/* Course Info */}
      <div className="p-5 flex flex-col h-full text-white">
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="text-gray-300 mt-1">
          in <span className="text-cyan-400 font-medium">{course.category}</span>
        </p>
        <div className="flex items-center justify-between mt-2 text-gray-400 text-sm">
          <p>{course.durationHours} Hours</p>
          <p>
            {new Date(course.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Price */}
        <div className="mt-3">
          <p className="text-cyan-300 font-bold text-lg">₹{finalPrice.toLocaleString()}</p>
          {course.discountPercent > 0 && (
            <p className="text-gray-400 text-sm line-through">₹{course.price.toLocaleString()}</p>
          )}
        </div>

        {/* Enroll Button */}
        <a
          href="#"
          className="mt-5 w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold shadow-lg hover:shadow-pink-500/50 hover:brightness-110 transition-all duration-300"
        >
          Enroll Now
        </a>
      </div>
    </motion.div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch(`${bestSellingCoursesUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={course._id} course={course} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
