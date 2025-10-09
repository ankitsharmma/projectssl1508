import React, { useState } from "react";
import { Search, Grid, List } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Free",
    description: "Learn the fundamentals of React.js with real-world projects.",
    duration: "4 weeks",
    image:
      "https://img.freepik.com/free-vector/javascript-frameworks-concept-illustration_114360-943.jpg",
    price: "₹14,999.60",
    originalPrice: "₹37,499",
    startDate: "28 Jan 2025",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    category: "Discount",
    description: "Master advanced TypeScript patterns and practices.",
    duration: "6 weeks",
    image:
      "https://img.freepik.com/free-vector/programmer-doing-code-computer-concept-illustration_114360-2411.jpg",
    price: "₹19,999",
    originalPrice: "₹44,999",
    startDate: "12 Feb 2025",
  },
  {
    id: 3,
    title: "Agile in Engineering",
    category: "Upcoming",
    description: "Agile principles applied to real engineering teams.",
    duration: "5 weeks",
    image:
      "https://img.freepik.com/free-vector/software-developer-working-computer-programming-coding_3446-693.jpg",
    price: "₹24,999",
    originalPrice: "₹49,999",
    startDate: "5 Mar 2025",
  },
];

export default function CoursesPage() {
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    free: false,
    discount: false,
    upcoming: false,
  });
  const [search, setSearch] = useState("");

  const toggleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const filteredCourses = courses.filter(
    (course) =>
      (Object.values(filters).some((v) => v)
        ? Object.entries(filters).some(
            ([key, value]) =>
              value && course.category.toLowerCase() === key.toLowerCase()
          )
        : true) &&
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero with Background Video */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://media.istockphoto.com/id/1444046123/video/working-with-the-projection-of-the-virtual-panel.mp4?s=mp4-640x640-is&k=20&c=hkGppNSqDEgedTfFEy6VZ-KYhd9XXqPuC4XQEhPA1iU="
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInDown">
            Explore Our Courses
          </h1>
          <p className="mb-6 text-lg text-gray-200 animate-fadeInUp">
            Find your perfect course & upgrade your career.
          </p>

          {/* Search */}
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for courses..."
              className="flex-grow px-4 py-3 bg-transparent text-gray-700 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 flex items-center gap-2 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* View Toggle */}
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-lg ${
                view === "grid"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setView("grid")}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 rounded-lg ${
                view === "list"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setView("list")}
            >
              <List size={20} />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.keys(filters).map((key) => (
              <button
                key={key}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  filters[key]
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => toggleFilter(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses */}
      <div
        className={`max-w-7xl mx-auto px-6 py-12 grid ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            : "grid-cols-1 gap-6"
        }`}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`relative bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ${
                view === "list" ? "flex h-60" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`${
                  view === "list" ? "w-2/5" : "w-full h-48"
                } relative`}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {course.category}
                </span>
              </div>

              {/* Content */}
              <div
                className={`p-6 flex flex-col justify-between ${
                  view === "list" ? "w-3/5" : ""
                }`}
              >
                <div>
                  <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {course.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    Duration: {course.duration}
                  </p>
                  {course.startDate && (
                    <p className="text-xs text-gray-500 mb-2">
                      Start Date: {course.startDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-green-600 font-bold">
                    {course.price}{" "}
                    <span className="line-through text-gray-400 text-sm">
                      {course.originalPrice}
                    </span>
                  </p>
                  <a
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-md hover:from-purple-600 hover:to-blue-600 transition"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}
