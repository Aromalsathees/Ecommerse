import React from 'react'
import BlogDatas from '../../components/cards/BlogDatas'


const Blog = () => {
  return (
    <main id='blog'>
        <div className='max-w-6xl mt-10 px-6 mx-auto'>
            <h1 className='text-4xl font-bold font-serif '>Recent Blog</h1>
          
        {BlogDatas.map((val,ind)=>(
              <div className='rounded-md mt-5 ' key={ind}>
                 <img src={val.img} alt="" />
                 <h1 className='font-serif text-semibold'>{val.desc}</h1>
            </div>
        ))}

        </div>
    </main>
  )
}

export default Blog