import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import img from "../assets/DALL·E 2025-02-25 10.10.43 - An anime-style digital painting of a young person working on a computer in a bright, modern workspace. The person is wearing headphones and a loose wh.webp";


const SignUp = () => {
  const [step, setStep] = useState(1);

  return (
<div className="flex h-screen">
  {/* Left Section */}
  <div className="flex w-1/2 flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center text-center">
      <img src={logo} alt="" className="w-20 mb-3" />
      <h1 className="text-3xl font-semibold">Take The Creative Leap!</h1>
      <p className="text-gray-500 w-64 mb-3">
        Create an account and discover your next exciting project
      </p>
    </div>
    <div className="relative w-80 flex flex-col items-center">
      {step === 1 && (
        <motion.input
          key="email"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: step === 2 ? -100 : 0, opacity: step === 2 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full px-4 py-2 border border-gray-500 rounded-md"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      )}
      {step === 2 && (
        <motion.input
          key="password"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full px-4 py-2 border border-gray-500 rounded-md"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      )}
    </div>
    <button
      className="bg-black text-white px-32 py-2 mt-5 rounded-md"
      onClick={() => setStep(2)}
    >
      Continue
    </button>
  </div>

  {/* Right Section (Image) */}
  <div className="w-1/2 h-screen">
    <img className="w-full h-full object-cover" src={img} alt="" />
  </div>
</div>

  );
};

export default SignUp;
