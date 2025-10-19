import React from "react";
import loginimage from "../../assets/Images/log.jpg";

const Signup = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        {/* Small Image */}
        <img
          src={loginimage}
          alt="Login"
          className="w-32 h-32 object-cover mx-auto rounded-full mb-4 shadow-md"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 mb-6">Please sign in to continue</p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-gray-500 font-semibold mt-2 text-right cursor-pointer hover:text-blue-700">
          Forgot password?
        </p>

        {/* Sign In Button */}
        <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-full mt-6 transition">
          Sign In
        </button>

        {/* Sign Up Link */}
        <p className="text-gray-600 font-medium mt-4">
          Don't have an account?{" "}
          <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </main>
  );
};

export default Signup;
