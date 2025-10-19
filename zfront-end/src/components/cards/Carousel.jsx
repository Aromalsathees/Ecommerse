import React from "react";

const Carousel = ({ children }) => {
  return (
    <div className="flex overflow-x-auto gap-4">
      {children}
    </div>
  );
};

export default Carousel;
