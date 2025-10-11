import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Background color variants
const bgVariants = [
  "bg-[#0B0F29]",
  "bg-[#1A1F3C]",
  "bg-[#20264D]",
  "bg-[#13182B]",
  "bg-[#2E3A59]",
];

const  NewestsellingcourcesUrl = "auth/newestsellingcourses";

const CourseCard = ({ course, index }) => {
  const bgColor = bgVariants[index % bgVariants.length];

  // ✅ Calculate final price using discountPercent
  const finalPrice = Math.round(
    course.price - (course.price * course.discountPercent) / 100
  );

  return (
    <div
      data-aos="flip-left"
      data-aos-delay={index * 100}
      className={`relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] 
      text-white rounded-2xl shadow-2xl shadow-blue-500/50 overflow-hidden 
      transition-transform transform hover:scale-105 duration-300`}
    >
      {/* ✅ Discount Badge */}
      {course.discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
          {course.discountPercent}% OFF
        </div>
      )}

      <img
        src={` ${NewestsellingcourcesUrl} ${course.image}`}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col h-full">
        <h3 className="text-xl font-bold1">{course.title}</h3>
        <p className="text-gray-300 mt-1">
          in{" "}
          <span className="text-blue-400 font-heading3">{course.category}</span>
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

        {/* ✅ Prices */}
        <div className="mt-3">
          <p className="text-blue-300 font-heading2 text-lg">
            ₹{finalPrice.toLocaleString()}
          </p>
          {course.discountPercent > 0 && (
            <p className="text-gray-400 text-sm line-through">
              ₹{course.price.toLocaleString()}
            </p>
          )}
        </div>

        <a
          href="#"
          className="mt-4 w-full text-center px-4 py-2 rounded-md bg-gradient-to-r 
          from-blue-600 to-indigo-600 text-white font-bold1 hover:brightness-110 
          transition-all duration-300"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // ✅ Fetch API call
    fetch( `${NewestsellingcourcesUrl}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
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
