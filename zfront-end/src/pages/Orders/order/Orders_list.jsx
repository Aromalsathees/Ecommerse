import React from 'react'

const Orders_list = () => {
    return (
        <main className='max-w-6xl mx-auto mt-5'>
            <h1 className='font-bold flex gap-2'><span className="ml-5 material-symbols-outlined">keyboard_backspace</span>My orders</h1>
            <div className=' border border-gray-500 rounded-md h-screen m-4 py-8'>

                <div className='relative p-4'>
                    <input className='absolute gap-3 rounded-md border border-gray-500 w-80 p-3 pl-12' type="text" placeholder='Search yout Order here' />
                    <span className=" m-3 material-symbols-outlined">search</span>
                </div>

                <div className='flex justify-between mt-8 border border-gray-500 p-2 m-4 rounded-md'>
                    <div>
                        <img className='w-40 h-auto rounded-md' src="https://www.realsimple.com/thmb/kRRAaK6XhZIqL_GFIxfZzHTHx7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/furniture-styles-GettyImages-1467984982-512fed4077b646eabbc187619554d517.jpg" alt="" />
                    </div>
                    <div>
                        <h1 className='font-bold'>Delibery on Aug 19</h1>
                        <p>Axer Helmet</p>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default Orders_list