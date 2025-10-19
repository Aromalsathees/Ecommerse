import React from 'react'

const About = () => {
  return (
        <section id='about'>

            <div className='max-w-6xl mx-auto mt-5 px-4'>
                  <img className='w-full h-auto rounded-lg' src="https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8=" alt="" />

                <div className='mt-5'>
                  <h1 className='font-serif font-bold text-4xl'>Why Choose Us</h1>
                  <p className='text-gray-500 font-semibold tex-sm'>
                    <span>Experience Unmatched Creativity and Expertise</span>
                    <span>in Interior Design. Discover Why We're the Right</span>
                    <span>Choice for Your Dream Space</span>
                  </p>
                </div>



                <div className='max-w-6xl mx-auto px-4 mt-10'>
                     <div className='grid grid-cols-2 gap-6'>
                           <div className='text-gray-500 space-y-2'>
                                <span className="material-symbols-outlined">settings</span>
                                <h1 className='text-black text-md font-semibold font-serif text-lg'>Fast & Free Shipping</h1>
                                <p>Elevate your interior design with our Fast & Free Shipping service without delay</p>
                           </div>
                            <div className='text-gray-500 space-y-2'>
                                <span className="material-symbols-outlined">settings</span>
                                <h1 className='text-black text-md font-semibold font-serif text-lg'>Fast & Free Shipping</h1>
                                <p>Elevate your interior design with our Fast & Free Shipping service without delay</p>
                           </div>
                            <div className='text-gray-500 space-y-2'>
                                <span className="material-symbols-outlined">settings</span>
                                <h1 className='text-black text-md font-semibold font-serif text-lg'>Fast & Free Shipping</h1>
                                <p>Elevate your interior design with our Fast & Free Shipping service without delay</p>
                           </div>
                            <div className='text-gray-500 space-y-2'>
                                <span className="material-symbols-outlined">settings</span>
                                <h1 className='text-black text-md font-semibold font-serif text-lg'>Fast & Free Shipping</h1>
                                <p>Elevate your interior design with our Fast & Free Shipping service without delay</p>
                           </div>
                     </div>
                </div>

            </div>
        </section>
  )
}

export default About