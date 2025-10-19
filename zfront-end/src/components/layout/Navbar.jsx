import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className=" top-0 left-0 w-full z-20 text-white font-bold bg-transparent fixed">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-4xl font-serif">NovusHaus</h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
          <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
          <li><ScrollLink to="craft" smooth={true} duration={500}>Craft</ScrollLink></li>
          <li><ScrollLink to="testimonials" smooth={true} duration={500}>Testimonials</ScrollLink></li>
          <li><ScrollLink to="blog" smooth={true} duration={500}>Blog</ScrollLink></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <span className="material-symbols-outlined text-3xl">
            {open ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-4 lg:flex-row lg:gap-8 font-bold px-5">
          <li className="text-black hover:text-white flex items-center gap-2">
            <span className="material-symbols-outlined">home</span>
            <ScrollLink to="home" smooth={true} duration={500} onClick={() => setOpen(false)}>Home</ScrollLink>
          </li>

          <li className="text-black hover:text-white  flex items-center gap-2">
            <span className="material-symbols-outlined">info</span>
            <ScrollLink to="about" smooth={true} duration={500} onClick={() => setOpen(false)}>About</ScrollLink>
          </li>

          <li className="text-black hover:text-white  flex items-center gap-2">
            <span className="material-symbols-outlined">handyman</span>
            <ScrollLink to="craft" smooth={true} duration={500} onClick={() => setOpen(false)}>Craft</ScrollLink>
          </li>

          <li className="text-black hover:text-white  flex items-center gap-2">
            <span className="material-symbols-outlined">forum</span>
            <ScrollLink to="testimonials" smooth={true} duration={500} onClick={() => setOpen(false)}>Testimonials</ScrollLink>
          </li>

          <li className="text-black hover:text-white  flex items-center gap-2">
            <span className="material-symbols-outlined">newspaper</span>
            <ScrollLink to="blog" smooth={true} duration={500} onClick={() => setOpen(false)}>Blog</ScrollLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
