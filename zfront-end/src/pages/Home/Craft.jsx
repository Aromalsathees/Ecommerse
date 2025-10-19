import React from 'react'
import {Link} from'react-router-dom'


const Craft = () => {
  return (
   
<main id='craft'>
        <div className='max-w-6xl mt-10'>
            <div className='grid grid-cols-2 gap-6 mx-auto px-4'>

                <div>
                    <h1 className='font-serif text-4xl font-semibold'>Crafted with excellent material</h1>
                    <p className='mt-2 text-sm font-semibold text-gray-500'>Elevate Your Space with Quality and Style</p>
                    <div>
                        <Link to='/products'>
                        <button className='rounded-full w-30 h-auto bg-black text-white p-2 mt-2 font-serif shadow-md'>Explore</button>
                        </Link>
                    </div>
                </div>

                <div className='mt-10'>
                    <img className='rounded-md ' src="https://ikiru.in/cdn/shop/files/buy-chair-astra-boucle-rocking-chair-or-wooden-cushion-chair-by-muun-home-on-ikiru-online-store-1.jpg?v=1739223418" alt="" />
                </div>
                <div>
                    <img src="https://ikiru.in/cdn/shop/files/buy-chair-astra-boucle-rocking-chair-or-wooden-cushion-chair-by-muun-home-on-ikiru-online-store-1.jpg?v=1739223418" alt="" />
                </div>
                <div>
                    <img src="https://ikiru.in/cdn/shop/files/buy-chair-astra-boucle-rocking-chair-or-wooden-cushion-chair-by-muun-home-on-ikiru-online-store-1.jpg?v=1739223418" alt="" />
                </div>

            </div>
        </div>
</main>
    
  )
}

export default Craft