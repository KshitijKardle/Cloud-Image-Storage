import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaImages, FaUpload, FaSearch, FaHome } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg"
            : "bg-gradient-to-r from-gray-950 to-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
          {/* Left Section */}
          <div className="flex gap-4 items-center">
            {/* Home Button */}
            <Link
              to="/"
              className="text-lg font-bold text-white hover:text-gray-300 flex items-center gap-2"
            >
              <FaHome className="text-xl" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Upload Button */}
            <Link
              to="/upload"
              className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium shadow hover:bg-gray-100 hover:shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <FaUpload />
              Upload
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search albums..."
              className="bg-white text-gray-800 py-2 px-4 pl-10 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </nav>

      {/* To offset the fixed nav height */}
      <div className=" px-4">
        {" "}
        {/* Increased padding-top to 24 (6rem) to accommodate the fixed navbar */}
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
