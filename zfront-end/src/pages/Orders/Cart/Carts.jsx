// import React from 'react'
// import {Link} from 'react-router-dom'
// import {useEffect ,useState} from 'react'
// import { Api } from "../../../api";

// const Carts = () => {

//   const [ Datas , setDatas] = useState([])
//   const [ Errors , setErrors]  = useState('')

//   useEffect(()=>{
//     Api.get('/Order/get_cart/').then((response)=>{
//       setDatas(response.data.Data || [])
//       console.log('success:', response.data)
//     }).catch((error)=>{
//       setErrors(error.response.data)
//       console.log('error:', error.response.data)
//     })
//   },[])


//   return (
 
//     <div className='max-w-6xl mx-auto px-4 mt-5 h-screen'>
//        {!Errors? (
//         <>
//        <h1 className='font-bold flex gap-2'><span className=" material-symbols-outlined">keyboard_backspace</span>My cart</h1>
//       <div className='border border-gray-500 rounded-md p-4 mt-2 shadow-sm'>
//         <h1 className='font-serif text-lg font-bold'>Deliver to: Aromal satheesh</h1>
//         <p className='text-sm'>Edayilaprambil PO Chegannur</p>
//       </div>

// {Datas.map((val , ind)=>(
//       <div key={ind} className='border border-gray-500 rounded-md shadow-md mt-5'>
//         <div className='grid grid-cols-2 gap-5 mt-5 px-4'>
//           <div>
//             <img className='w-50 h-auto rounded-md' src="https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8=" alt="" />
//             <p className='text-gray-500 font-semibold'>Quantity : {val.quantity}</p>
//           </div>
//           <div className='mt-5 font-bold text-2xl'>
//             <h1>{val.product.name}</h1>
//             <p>${val.product.price}</p>
//           </div>
//           <p className='text-gray-500 font-semibold text-sm'>Delivery by oct 23,Thu</p>
//         </div>
//         <div className='flex justify-between mt-4 border-t border-gray-500 w-full'>
//           <button className='text-gray-500 font-semibold w-20 p-2 rounded-full flex gap-2'><span className="material-symbols-outlined ">delete</span>Remove</button>
//           <button className='text-gray-500 font-semibold w-20 p-2 rounded-full flex gap-2'><span className="material-symbols-outlined">add_shopping_cart</span>Buy</button>
//         </div>
//       </div>
// ))}

//       <div className='px-4 fixed mt-65 right-0 w-full border-t border-gray-500'>
//         <div className=' flex justify-between p-4'>
//           <h1 className='font-bold text-gray-500 text-lg'>Total : 1,842</h1>
//           <Link to='/payoptions'>
//               <button className='text-white bg-green-800 rounded-md p-2 font-bold'>place Order</button>
//           </Link>
//         </div>
//       </div>
// </>
//        ):(
//         <p>{Errors}</p>
//        )}
// </div> 

//   )
// }

// export default Carts


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../../api";

const Carts = () => {
  const [Datas, setDatas] = useState([]);
  const [Errors, setErrors] = useState("");

  useEffect(() => {
    Api.get("/Order/get_cart/")
      .then((response) => {
        setDatas(response.data.Data || []);
        console.log("success:", response.data);
      })
      .catch((error) => {
        // ✅ Safe error message handling
        setErrors(error.response?.data?.message || "Login required");
        console.log("error:", error.response?.data);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-5 h-screen">
      {!Errors ? (
        <>
          <h1 className="font-bold flex gap-2">
            <span className="material-symbols-outlined">keyboard_backspace</span>
            My cart
          </h1>

          <div className="border border-gray-500 rounded-md p-4 mt-2 shadow-sm">
            <h1 className="font-serif text-lg font-bold">
              Deliver to: Aromal Satheesh
            </h1>
            <p className="text-sm">Edayilaprambil PO Chegannur</p>
          </div>

          {Datas.map((val, ind) => (
            <div
              key={ind}
              className="border border-gray-500 rounded-md shadow-md mt-5"
            >
              <div className="grid grid-cols-2 gap-5 mt-5 px-4">
                <div>
                  <img
                    className="w-50 h-auto rounded-md"
                    src="https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8="
                    alt=""
                  />
                  <p className="text-gray-500 font-semibold">
                    Quantity : {val.quantity}
                  </p>
                </div>
                <div className="mt-5 font-bold text-2xl">
                  <h1>{val.product.name}</h1>
                  <p>${val.product.price}</p>
                </div>
                <p className="text-gray-500 font-semibold text-sm">
                  Delivery by Oct 23, Thu
                </p>
              </div>
              <div className="flex justify-between mt-4 border-t border-gray-500 w-full">
                <button className="text-gray-500 font-semibold w-20 p-2 rounded-full flex gap-2">
                  <span className="material-symbols-outlined">delete</span>
                  Remove
                </button>
            <Link to={`/payoptions/${val.product.id}`}>
                <button className="text-gray-500 font-semibold w-20 p-2 rounded-full flex gap-2">
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  Buy
                </button>
            </Link>
              </div>
            </div>
          ))}

          <div className="px-4 fixed bottom-0 right-0 w-full border-t border-gray-500 bg-white">
            <div className="flex justify-between p-4">
              <h1 className="font-bold text-gray-500 text-lg">Total : 1,842</h1>
              <Link to="/payoptions">
                <button className="text-white bg-green-800 rounded-md p-2 font-bold">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 font-semibold text-center mt-10">{Errors}</p>
      )}
    </div>
  );
};

export default Carts;
