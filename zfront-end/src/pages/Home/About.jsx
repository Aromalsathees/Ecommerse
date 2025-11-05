
import React from "react";

const About = () => {
  return (
    <section id="about" className="px-4 md:px-12 lg:px-28 py-10">
      {/* Full width image */}
      <div className="w-full">
        <img
          className="w-full h-[60vh] md:h-[80vh] object-cover rounded-lg"
          src="https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8="
          alt="Interior Design"
        />
      </div>

      {/* Text Section */}
      <div className="text-center mt-10">
        <h1 className="font-serif font-bold text-3xl md:text-4xl">
          Why Choose Us
        </h1>
        <p className="text-gray-600 font-medium text-sm md:text-base mt-3 leading-relaxed">
          Experience Unmatched Creativity and Expertise in Interior Design. <br />
          Discover Why We're the Right Choice for Your Dream Space.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Feature Card */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="material-symbols-outlined text-4xl text-black">
                settings
              </span>
              <div className="text-center sm:text-left">
                <h2 className="text-black text-lg font-semibold font-serif">
                  Fast & Free Shipping
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  Elevate your interior design with our Fast & Free Shipping
                  service — bringing style to your space without delay.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
