import React from 'react'

const Home = () => {
  return (
      <section id='home'>

        <div className='relative w-screen flex justify-center'>
          <img 
            className='w-full h-180 lg:object-cover' 
            src="https://img.freepik.com/free-photo/retro-living-room-interior-design_53876-145503.jpg?semt=ais_hybrid&w=740&q=80" 
            alt="Retro Living Room" 
          />
          <div className='absolute lg:top-1/2 lg:left-1/3 top-60' >

               <h1 className='text-center text-white lg:text-2xl text-4xl font-bold font-serif'>
                <span className='block lg:inline'>Make Your</span>
                <span className='block lg:inline'>Interior More</span>
                <span className='block lg:inline'>Minimalistic & Modern</span>
               </h1>

                <p className='text-white mt-2 italic'>
                <span className='block lg:inline text-center'>Turn your room with panto into</span>
                <span className='block lg:inline text-center'>a lot more minimalistic and modern with</span>
                <span className='block lg:inline text-center'>ease and speed</span>
                </p>

               <div className="flex justify-center relative">
                   <input className="rounded-full p-3 mt-4 w-64 border text-white font-bold text-sm  border-gray-300" type="text" placeholder="Search furniture"/>
                    <span className='absolute top-7 left-68 text-white material-symbols-outlined'>search</span>
               </div>

               <div className="flex justify-center mt-10">
                 <span className="material-symbols-outlined text-8xl text-white">downloading   </span>
               </div>

          </div>
        </div>
 
      </section>
   
  )
}

export default Home
