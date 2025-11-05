import React from 'react'

const Show_pro3 = () => {
  return (
    <main>
        <div className='lg:w-full lg:px-25 mx-auto mt-10 '>
             <h1 className='text-center font-serif lg:text-4xl text-2xl'>BEST SELLING ITEMS</h1>

              <div className='w-full p-5 grid grid-cols-2 lg:mt-10 gap-5 '>
                <div className=''>
                      <img className='lg:w-300 lg:h-72 h-60 rounded-md' src="https://5.imimg.com/data5/SELLER/Default/2023/10/351897419/DA/CU/EV/56444765/home-furniture-installation-service.jpg" alt="" />
                      <h1 className='font-serif text-semibold'>HANDMADE CROP SWEATER</h1>
                      <p>50.00</p>
                </div>
                 <div className=''>
                      <img className='lg:w-300 lg:72 h-60 rounded-md' src="https://5.imimg.com/data5/ANDROID/Default/2021/10/BJ/XL/IS/24708054/product-jpeg-500x500.jpg" alt="" />
                      <h1 className='font-serif text-semibold'>HANDMADE CROP SWEATER</h1>
                      <p>50.00</p>
                </div>
              </div>

        </div>
    </main>
  )
}

export default Show_pro3