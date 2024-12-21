import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PopularCourses from "../Courses/PopularCourses";

const Homepage = () => {
  const images = [
    "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full max-h-[668px] h-auto sm:h-[668px] md:py-3 bg-pale py-3">
        <div className="w-[90%] mx-auto sm:h-[90%] md:h-full flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <DotLottieReact
              src="https://lottie.host/32e0c6d0-6159-41ef-a587-5374e53b8abb/I9jDCByGVv.lottie"
              loop
              autoplay
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]" // Adjust size based on screen size
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-4">
              Unlock Your Potential: Learn, Build, and Grow
            </h1>
            <p className="w-[90%] lg:w-2/3 mx-auto lg:mx-0 mb-6">
              Empower yourself with the skills and knowledge you need to
              succeed. Dive into hands-on learning experiences, and achieve your
              personal and professional goals with confidence.
            </p>
            <button className="border border-black px-6 py-3 text-center font-bold hover:bg-gray-300">
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative w-[460px] sm:w-[80%] lg:w-[70%]  mx-auto overflow-hidden my-10 rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[100%] sm:w-full md:w-full h-[400px] object-cover rounded-3xl mx-auto"
          />
        </AnimatePresence>

        {/* Slider Buttons */}
        <div className="">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute top-1/2 left-2 transform   -translate-y-1/2 text-white  "
          >
            <ChevronLeft className="w-20 h-20" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute top-1/2 right-2 transform -translate-y-1/2  text-white  "
          >
            <ChevronRight className="w-20 h-20" />
          </button>
        </div>
        {/* pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* popular courses */}
      <div className="w-[460px] sm:w-[70%] my-10 mx-auto">
        <PopularCourses />
      </div>
    </div>
  );
};

export default Homepage;
