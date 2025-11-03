import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Api } from "../../api";


const Show_pro2 = () => {

  const [Errors , setErrors] = useState('')

   function Add_to_cart(pk){

    Api.post(`/Order/add_to_cart/${pk}/`).then((response)=>{
      console.log('success',response.data)
    }).catch((error)=>{
      console.log('error',error.response.data)
       setErrors(error.response?.data?.message || "Something went wrong");
    })

   }

  const [products, setProducts] = useState([]);
  useEffect(() => {
    Api.get("/Get_all_products/")
      .then((response) => {
        console.log('✅ Data fetched:', response.data);
        setProducts(response.data?.Data || []);
      })
      .catch((error) => {
        console.error(' Error fetching products:', error);
      });
  }, []);

  return (
     <main>
      {products.map((val,ind)=>(
       <div key={ind} className='max-w-6xl mt-20 grid grid-cols-1 gap-10 p-4'>
        <div className='px-4'>
          <div className='mx-auto p-6 bg-amber-100 rounded-md text-center'>
             <img className='h-72 w-full object-cover rounded-md' src={`http://127.0.0.1:8000${val.image}`} alt="" />
             <h1 className='font-serif font-bold text-2xl mt-2'>{val.name}</h1>
             <p className='font-sm font-semibold text-gray-500'>Elegent and Comfortable</p>
             <div className='flex justify-between mt-5'>
               <Link to='/payoptions'>
                 <button className='bg-blue-950 rounded-full p-2 w-20 text-white font-bold font-serif shadow-md'>Buy</button>
               </Link>
               {/* <Link to='/cart'> */}
                 <button onClick={()=>{Add_to_cart(val.id)}} className='bg-blue-950 rounded-full p-2 w-20 text-white font-bold font-serif shadow-md'>Cart</button>
               {/* </Link> */}
             </div>
           </div>
         </div>
       </div>
       ))}
        {Errors && <p>{Errors}</p>}
     </main>
  )
}

export default Show_pro2

