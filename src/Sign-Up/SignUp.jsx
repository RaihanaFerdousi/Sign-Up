import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import img from "../assets/DALL·E 2025-02-25 10.10.43 - An anime-style digital painting of a young person working on a computer in a bright, modern workspace. The person is wearing headphones and a loose wh.webp";
import { auth, createUserWithEmailAndPassword } from "../Firebase/firebase.config";
import Swal from "sweetalert2";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (step === 1) {
      if (!email) {
        setError("Please enter a valid email.");
        return;
      }
      setError("");
      setStep(2);
    } else {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setStep(1); 
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <img src={logo} alt="logo" className="w-20 mb-3" />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="bg-black text-white px-32 py-2 mt-5 rounded-md disabled:opacity-50"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Processing..." : step === 1 ? "Continue" : "Sign Up"}
        </button>
      </div>

      <div className="w-1/2 h-screen">
        <img className="w-full h-full object-cover" src={img} alt="side-banner" />
      </div>
    </div>
  );
};

export default SignUp;
