import React from 'react'
import BlogDatas from '../../components/cards/BlogDatas'


const Blog = () => {
  return (
    <main id='blog'>
        <div className='w-full lg:px-12 mx-auto mt-10 px-6'>
            <h1 className='lg:text-4xl text-2xl font-bold font-serif lg:ml-12'>Recent Blog</h1>
          
        {BlogDatas.map((val,ind)=>(
              <div className='rounded-md mt-5 lg:w-full px-10' key={ind}>
                 <img className='lg:w-full rounded-md ' src={val.img} alt="" />
                 <h1 className='font-serif text-semibold lg:text-2xl'>{val.desc}</h1>
            </div>
        ))}

        </div>
    </main>
  )
}

export default Blog