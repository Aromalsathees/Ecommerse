import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api"; // ✅ make sure it’s { Api }, not Api
import loginimage from "../../assets/Images/log.jpg"; // ✅ add image import

const AdminSignup = () => {
  const navigate = useNavigate();

  const [Forms, setForms] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [Errors, setErrors] = useState("");

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to backend
    Api.post("/User/Admin_signup/", Forms)
      .then((response) => {
        console.log("Signup success:", response.data);

        // ✅ store tokens
        localStorage.setItem("token", response.data.token.access);
        localStorage.setItem("refresh", response.data.token.refresh);

        // ✅ navigate to admin page
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Signup error:", error.response?.data);
        setErrors(error.response?.data.message || "Something went wrong!");
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        <img
          src={loginimage}
          alt="Admin Signup"
          className="w-32 h-32 object-cover mx-auto rounded-full mb-4 shadow-md"
        />

        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          Create Admin Account 👋
        </h1>
        <p className="text-gray-500 mb-6">Please sign up to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {["username", "email", "password", "password2"].map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : "text"}
                placeholder={field}
                onChange={handleChange}
                name={field}
                value={Forms[field]}
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-6 transition"
          >
            Sign Up
          </button>
        </form>

        {Errors && <p className="text-red-600 mt-3">{Errors}</p>}

        <p className="text-gray-600 font-medium mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </main>
  );
};

export default AdminSignup;
