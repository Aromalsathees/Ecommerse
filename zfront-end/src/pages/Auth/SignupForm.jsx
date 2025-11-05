import React from "react";
import { useSignup } from "./useSignup";
import { Link } from 'react-router-dom'
import loginimage from "../../assets/Images/log.jpg";

const SignupForm = () => {
  const { handleChange, handleSubmit, Forms, Errors } = useSignup();

  return (
    <main className="min-h-screen lg:w-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="lg:w-full bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        <img
          src={loginimage}
          alt="Login"
          className="w-32 h-32 object-cover mx-auto rounded-full mb-4 shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          Create Account 👋
        </h1>
        <p className="text-gray-500 mb-6">Please sign up to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {["username", "email", "password", "password2"].map((field) => (
              <input
                key={field}
                type={field.includes("password") ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={Forms[field]}
                onChange={handleChange}
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

        {Errors && (
          <p className="text-red-600 font-semibold mt-3">{Errors}</p>
        )}

        <p className="text-gray-600 font-medium mt-4">
          Already have an account?{" "}
          <Link to='/login'>
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              Log In
            </span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupForm;
