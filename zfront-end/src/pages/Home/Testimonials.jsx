import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Datas from "../../components/cards/Datas";


const Testimonials = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10" id='testimonials'>
      <h2 className="lg:text-6xl text-2xl font-bold text-center mb-8 font-serif">Testimonials</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={true}
      >
        {Datas.map((val, ind) => (
          <div
            key={ind}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg text-center mx-2"
          >
            <img
              src={val.img}
              alt={val.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="font-bold">{val.name}</h3>
            <p className="text-gray-500 text-sm">{val.position}</p>
            <div className="mt-5">
                <p className="text-gray-700 mb-2">{val.desc}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
