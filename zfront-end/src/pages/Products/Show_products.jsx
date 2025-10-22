
import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { ProductApi } from "../../api";



const Show_products = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const [products, setProducts] = useState([]);

useEffect(() => {
   ProductApi.get("/listproducts/")
    .then((response) => {
      console.log('✅ Data fetched:', response.data);
      setProducts(response.data?.data || []);
    })
    .catch((error) => {
      console.error(' Error fetching products:', error);
    });
}, []);


  return (
    <main className='min-h-screen bg-white'>
      {/* Back Button */}
      <div className='flex items-center p-4'>
        <Link to='/' className='flex items-center text-gray-700 hover:text-black'>
          <span className="material-symbols-outlined">keyboard_backspace</span>
          <span className='ml-2 font-semibold'>Back</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mt-8">
        <h1 className="font-serif text-5xl font-bold mb-2">New Collections</h1>
        <p className="text-gray-500 text-sm">
          Discover our latest furniture collection that blends comfort and modern design.
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {products.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showDots={true}
          >
            {products.map((val, ind) => (
              <div
                key={ind}
                className="p-4 flex flex-col items-center text-center shadow-md rounded-2xl bg-gray-50 hover:shadow-xl transition-all"
              >
                {val.image ? (
                  <img
                    src={val.image}
                    alt={val.name}
                    className="rounded-lg h-72 w-full object-cover"
                  />
                ) : (
                  <div className="h-72 w-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <h2 className="mt-3 text-xl font-semibold">{val.name}</h2>
                <p className="text-sm text-gray-500">{val.category}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        )}
      </div>
    </main>
  );
};

export default Show_products;
