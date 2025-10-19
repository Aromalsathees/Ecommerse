// import React from 'react'
// import { useState, useEffect } from 'react'
// import Api from '../../components/api/Api'


// const Admin_products = () => {

//   const [open, Setopen] = useState(false)
//   const [products, setProducts] = useState([]);
//   const [Datas, setDatas] = useState({
//     'name': '',
//     'price': '',
//     'category': '',
//     'stock': '',
//     'images': ''
//   })

//   function handleChange(e) {
//     const { name, value, files } = e.target;
//     setDatas((prev) => ({
//       ...prev,
//       [name]: name === 'images' ? files[0] : value,
//     }))
//   }

//   useEffect(() => {
//     Api.get('/admin_list_product/')
//       .then((response) => {
//         console.log(response.data)
//         setProducts(response.data.Datas || [])
//       })
//       .catch((error) => {
//         console.log('display error', error)
//       })
//   }, [])


//   function handleSubmit(e) {
//     e.preventDefault()
//     console.log('form Data submitted:', Datas)

//     const formData = new FormData()
//     formData.append('name', Datas.name);
//     formData.append('price', Datas.price);
//     formData.append('category', Datas.category);
//     formData.append('stock', Datas.stock);

//     if (Datas.images) {
//       formData.append('images', Datas.images)
//     }

//     Api.post('/admin_create_product/',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     ).then((response) => {
//       console.log('succefully added ', response.data)


//     }).catch((error) => {
//       console.log('something error happend', error)
//     })

//   }

//   function ProductDelete(id) {
//     Api.delete('/Admin_delete/${id}').then((response) => {
//       console.log('item deleted', response.data)
//     }).catch((error) => {
//       console.log('error happend', error)
//     })
//   }




//   return (
//     <main className="max-w-6xl mx-auto bg-gray-900 min-h-screen p-6 text-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 ">
//         <h1 className="font-bold font-serif text-3xl sm:text-4xl mb-3 sm:mb-0">
//           Product List
//         </h1>

//         {/* Search and Button */}
//         <div className="flex gap-3 items-center">
//           <div className="relative">
//             <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
//               search
//             </span>
//             <input
//               type="text"
//               placeholder="Search products"
//               className="pl-10 pr-3 py-2 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
//             />
//           </div>
//           <button onClick={() => Setopen(!open)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium transition">
//             + Add Product
//           </button>
//         </div>
//       </div>



//       {open && (
//         <div className='border p-4 rounded-md'>
//           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//   <div className='rounded-md border p-2 text-white'>
//     <input 
//       id="product-name" 
//       name='name' 
//       type="text" 
//       onChange={handleChange} 
//       value={Datas.name} 
//       placeholder='Product Name' 
//       autoComplete="name" 
//     />
//   </div>
//   <div className='rounded-md border p-2'>
//     <input 
//       id="product-price" 
//       name='price' 
//       type="text" 
//       onChange={handleChange} 
//       value={Datas.price} 
//       placeholder='Price'
//       autoComplete="off"
//     />
//   </div>
//   <div className='rounded-md border p-2'>
//     <input 
//       id="product-category" 
//       name='category' 
//       type="text" 
//       placeholder='Category' 
//       onChange={handleChange} 
//       value={Datas.category} 
//       autoComplete="off"
//     />
//   </div>
//   <div className='rounded-md border p-2'>
//     <input 
//       id="product-stock" 
//       name='stock' 
//       type="text" 
//       placeholder='Stock' 
//       onChange={handleChange} 
//       value={Datas.stock}
//       autoComplete="off"
//     />
//   </div>
//   <div className='rounded-md border p-2'>
//     <input 
//       id="product-image" 
//       name='images' 
//       type="file" 
//       placeholder='Upload Image' 
//       onChange={handleChange} 
//       autoComplete="off"
//     />
//   </div>
//   <button type='submit' className='bg-green-500 rounded-md font-semibold'>Add</button>
// </form>


      
     
//       <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto mt-4">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-700">
//             {products.map((val, index) => (
//   <tr key={val.id || index} className="hover:bg-gray-700 transition">
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{index + 1}</td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{val.name}</td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{val.category}</td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{val.price}</td>
//     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{val.stock}</td>
//     <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
//       <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs font-medium mr-2">
//         Edit
//       </button>
//       <button onClick={()=>ProductDelete(val.id)} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs font-medium">
//         Delete
//       </button>
//     </td>
//   </tr>
//   ))}


//           </tbody>
//         </table>

//         {products.length === 0 && (
//           <p className="text-gray-400 text-center py-6">No products added yet.</p>
//         )}
//       </div>
// </main>
//   )
// }

// export default Admin_products


import React, { useState, useEffect } from "react";
import Api from "../../components/api/Api";

const Admin_products = () => {
  const [open, Setopen] = useState(false);
  const [products, setProducts] = useState([]);
  const [Datas, setDatas] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setDatas((prev) => ({
      ...prev,
      [name]: name === "images" ? files[0] : value,
    }));
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  function fetchProducts() {
    Api.get("/admin_list_product/")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.Datas || []);
      })
      .catch((error) => {
        console.log("display error", error);
      });
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    console.log("form Data submitted:", Datas);

    const formData = new FormData();
    formData.append("name", Datas.name);
    formData.append("price", Datas.price);
    formData.append("category", Datas.category);
    formData.append("stock", Datas.stock);

    if (Datas.images) {
      formData.append("images", Datas.images);
    }

    Api.post("/admin_create_product/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("Successfully added:", response.data);
        alert("Product added successfully!");
        setDatas({
          name: "",
          price: "",
          category: "",
          stock: "",
          images: "",
        });
        fetchProducts();
      })
      .catch((error) => {
        console.log("Something went wrong:", error);
        alert("Error adding product!");
      });
  }


  function ProductDelete(id) {
    Api.delete(`/Admin_delete/${id}/`)
      .then((response) => {
        console.log("Item deleted:", response.data);
        alert("Product deleted!");
        fetchProducts();
      })
      .catch((error) => {
        console.log("Error deleting:", error);
      });
  }

  return (
    <main className="max-w-6xl mx-auto bg-gray-900 min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 ">
        <h1 className="font-bold font-serif text-3xl sm:text-4xl mb-3 sm:mb-0">
          Product List
        </h1>

        {/* Search and Button */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search products"
              className="pl-10 pr-3 py-2 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
          <button
            onClick={() => Setopen(!open)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Form Section */}
      {open && (
        <div className="border p-4 rounded-md mb-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="rounded-md border p-2 text-white">
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={Datas.name}
                placeholder="Product Name"
                autoComplete="off"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="rounded-md border p-2">
              <input
                name="price"
                type="text"
                onChange={handleChange}
                value={Datas.price}
                placeholder="Price"
                autoComplete="off"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="rounded-md border p-2">
              <input
                name="category"
                type="text"
                onChange={handleChange}
                value={Datas.category}
                placeholder="Category"
                autoComplete="off"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="rounded-md border p-2">
              <input
                name="stock"
                type="text"
                onChange={handleChange}
                value={Datas.stock}
                placeholder="Stock"
                autoComplete="off"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="rounded-md border p-2">
              <input
                name="images"
                type="file"
                onChange={handleChange}
                autoComplete="off"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 py-2 rounded-md font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {products.map((val, index) => (
              <tr key={val.id || index} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4 text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {val.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {val.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {val.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {val.stock}
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs font-medium mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => ProductDelete(val.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-gray-400 text-center py-6">
            No products added yet.
          </p>
        )}
      </div>
    </main>
  );
};

export default Admin_products;
