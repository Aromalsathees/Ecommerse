import React from 'react'

const Images = () => {
  return (
    <main>
        <div className='max-w-6xl mx-auto mt-10'>
             <img className ='rounded-md h-auto px-10' src="https://assets-news.housing.com/news/wp-content/uploads/2023/02/08055421/wooden-furniture-design3.png" alt="" />
             <div className='px-4 mt-5'>
                <h1>
                    <span className='lg:inline block text-4xl font-bold font-serif'>We help you design</span>
                    <span className='lg:inline block text-4xl font-bold font-serif'>modern interior</span>
                    <span className='lg:inline block text-4xl font-bold font-serif'>design</span>
                </h1>
                <p className='mt-4 text-gray-500 font-semibold '>Transform Your Space with Our Contemporary Interior Design Expertise: Let us guide you in crafting sleek and stylish interiors that reflect your unique taste and lifestyle</p>

                <div className='grid grid-cols-2 gap-6 mt-4 texy-gray-400'>

                  <div className='flex gap-2'>
                    <span className="material-symbols-outlined">radio_button_unchecked</span>
                    <p>Our team specializes in creating customized interior designs that embrace modern aesthetics.</p>
                  </div>
                   <div className='flex gap-2'>
                    <span className="material-symbols-outlined">radio_button_unchecked</span>
                    <p>Our team specializes in creating customized interior designs that embrace modern aesthetics.</p>
                  </div>
                   <div className='flex gap-2'>
                    <span className="material-symbols-outlined">radio_button_unchecked</span>
                    <p>Our team specializes in creating customized interior designs that embrace modern aesthetics.</p>
                  </div>
                   <div className='flex gap-2'>
                    <span className="material-symbols-outlined">radio_button_unchecked</span>
                    <p>Our team specializes in creating customized interior designs that embrace modern aesthetics.</p>
                  </div>
                  <div><button className='rounded-full w-30 h-auto bg-black text-white p-2 mt-2 font-serif shadow-md'>Explore</button></div>
                </div>

             </div>
        </div>
    </main>
  )
}

export default Images