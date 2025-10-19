import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom'
import {useState , useEffect} from 'react'
import Api from "../../components/api/Api";



const Show_products = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const [product , setProducts] = useState([])

  useEffect(()=>{
    Api.get('http://127.0.0.1:8001/listproducts/').then((response=>{
      console.log('data fetched',response.data)
      setProducts(response.data.data.Datas)
    })).catch((error)=>{
      console.log('error happend',error)
    })

  },[])



  return (
    <main className='max-h-screen'>
       <h1 className='font-bold flex gap-2'>
        <Link to='/'>
        <span className="ml-5 material-symbols-outlined">keyboard_backspace</span>
        </Link>
        </h1>
      <div className="max-w-6xl mx-auto mt-15">
        {/* Heading */}
        <div className="p-4 text-center font-serif text-6xl space-y-5">
          <h1>New Collections</h1>
          <p className="text-sm text-gray-500">
            Discover our latest furniture collection that blends comfort and modern design.
          </p>
        </div>

        {/* Carousel */}
        <div className="px-4">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showDots={true}
          >
            {product.map((val , ind) => (
              <div
                key={ind}
                className="p-4 flex flex-col items-center text-center"
              >
                {/* <img
                  src={val.image}
                  alt=""
                  className="rounded-md h-72 w-full object-cover shadow-md"
                /> */}
                <h2 className="mt-3 text-xl font-semibold">{val.name}</h2>
                <p className="text-sm text-gray-500">{val.category}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default Show_products;


 // 🛍️ Product data (you can later fetch this from backend)
  // const products = [
  //   {
  //     id: 1,
  //     name: "Modern Wooden Chair",
  //     description: "Elegant and comfortable chair for your living room.",
  //     image: "https://res.cloudinary.com/castlery/image/upload/w_1995,f_auto,q_auto/v1756199945/NEW%20Homepage/AboutUs_Mobile.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Luxury Sofa Set",
  //     description: "Premium quality sofa with soft cushions and durable fabric.",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9bF25UrTgG2IrtuZm9oD8FoqI_NlrFkNJpOjgorVKb7KpH8aajMEVvTE-rtNh0vNFaHc&usqp=CAU",
  //   },
  //   {
  //     id: 3,
  //     name: "Classic Wooden Table",
  //     description: "Perfect for dining or workspace setup.",
  //     image: "https://5.imimg.com/data5/ANDROID/Default/2022/10/CH/WC/AI/140978935/product-jpeg-500x500.jpg",
  //   },
  // ];