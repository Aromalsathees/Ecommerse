import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t mt-auto">
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="font-serif text-2xl">NovusHaus</h1>
            <p className="text-sm font-serif">
              Copyright © 2023 Web Design Mastery. All rights reserved.
            </p>
          </div>

          <div className="flex gap-x-6 text-sm font-serif">
            <button className="hover:underline">About</button>
            <button className="hover:underline">Partnership</button>
            <button className="hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
