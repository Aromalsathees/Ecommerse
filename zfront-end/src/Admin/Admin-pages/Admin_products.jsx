import React, { useState, useEffect } from "react";
import { Api } from "../../api";

const AdminProducts = () => {
  const [products, Setproducts] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });
  const [Datas, SetDatas] = useState([]);
  const [open, Setopen] = useState(false)

  function fetchData() {
    Api.get("/Admin/admin_list_products/")
      .then((response) => {
        console.log("message :", response.data);
        SetDatas(response.data.Data);
      })
      .catch((error) => {
        console.log("error :", error);
      });
  }


  useEffect(() => {
    fetchData()
  }, []);

  function onChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      Setproducts((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      Setproducts((prev) => ({ ...prev, [name]: value }));
    }
  }

  function SubmitData(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let key in products) {
      formData.append(key, products[key]);
    }

    Api.post("/Admin/admin_created_products/", formData)
      .then((response) => {
        console.log("message :", response.data);
        Setproducts({ name: "", price: "", stock: "", description: "", image: null });
        Setopen(false)
        fetchData()
      })
      .catch((error) => {
        console.log("error :", error);
      });
  }

  function handleDelete(pk) {

    Api.delete(`/Admin/admin_delete_product/${pk}/`).then((response) => {
      fetchData()
      console.log('message :', response.data)

    })
  }


  return (
    <main className="w-full mx-auto bg-gray-900 min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="font-bold text-3xl sm:text-4xl mb-3 sm:mb-0">Product List</h1>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search products"
              className="pl-10 pr-3 py-2 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
          <button onClick={() => Setopen(!open)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium transition">
            + Add Product
          </button>
        </div>
      </div>

      {/* Product Add Form */}
      {open && (
        <div className="border p-4 rounded-md mb-4">
          <form onSubmit={SubmitData} className="flex flex-col gap-4">
            {["name", "price", "description", "stock"].map((field) => (
              <div key={field} className="rounded-md border p-2">
                <input
                  name={field}
                  value={products[field]}
                  onChange={onChange}
                  type={field === "price" || field === "stock" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            ))}
            <div className="rounded-md border p-2">
              <input name="image" onChange={onChange} type="file" className="w-full bg-transparent outline-none" />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 py-2 rounded-md font-semibold">
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
              {["#", "Product Name", "description", "Price", "Stock", "Actions"].map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {Datas.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.description || "—"}</td>
                <td className="px-6 py-4">₹{item.price}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button onClick={() => handleUpdate(item.id)} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
};

export default AdminProducts;


