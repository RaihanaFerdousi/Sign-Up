import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import img from "../assets/DALL·E 2025-02-25 10.10.43 - An anime-style digital painting of a young person working on a computer in a bright, modern workspace. The person is wearing headphones and a loose wh.webp";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  googleProvider,
  signInWithPopup,
} from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setStep(1);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const handleContinue = () => {
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }
    if (isSignUp) {
      if (step === 1) {
        setStep(2);
        return;
      }
      if (!password) {
        setError("Please enter a password.");
        return;
      }
      if (step === 2) {
        setStep(3);
        return;
      }
      if (!name) {
        setError("Please enter your name.");
        return;
      }
      setError("");
      handleSignUp();
    } else {
      // If logging in, ensure email and password are both provided before proceeding
      if (!password) {
        setError("Please enter a password.");
        return;
      }
      setError("");
      handleLogin();
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      toggleForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Google Sign-In Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="pt-10 w-1/2 bg-[#EEEEE9] flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="logo" className="w-20 mb-3" />
          <h1 className="text-3xl font-semibold">
            {isSignUp ? "Take The Creative Leap!" : "Welcome Back!"}
          </h1>
          <p className="text-gray-500 w-64 mb-3">
            {isSignUp
              ? "Create an account and discover your next exciting project"
              : "Sign in to continue your creative journey"}
          </p>
        </div>

        <div className="flex w-full flex-col border-opacity-50">
          <div className="card rounded-box grid h-20 place-items-center mb-10">
            <div className="relative w-80 flex flex-col items-center">
              <motion.input
                key="email"
                initial={{ x: 0, opacity: 1 }}
                animate={{
                  x: step >= 2 ? -100 : 0,
                  opacity: step >= 2 ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="w-full px-4 py-2 rounded-md mb-2"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {(step === 2 || !isSignUp) && (
                <motion.input
                  key="password"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full px-4 py-2 rounded-md"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              {isSignUp && step === 3 && (
                <motion.input
                  key="name"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full px-4 py-2 rounded-md"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              className="bg-black text-white px-32 py-2 mt-5 rounded-md disabled:opacity-50"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isSignUp
                ? step < 3
                  ? "Continue"
                  : "Sign Up"
                : "Login"}
            </button>
          </div>
          <div className="divider w-64 mx-auto my-8">OR</div>
          <div className="card rounded-box grid h-20 place-items-center">
            <button
              className="bg-white font-semibold px-[71px] py-3 rounded-md flex items-center gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FcGoogle />
              Continue with Google
            </button>
            <button className="bg-white my-3 font-semibold px-[77px] py-3 rounded-md flex items-center gap-2">
              <FaApple />
              Continue with Apple
            </button>
            <button className="bg-white font-semibold px-[92px] py-3 rounded-md flex items-center gap-2">
              <FaXTwitter />
              Continue with X
            </button>
          </div>
          <p
          className="text-center cursor-pointer mt-32 text-gray-400"
          onClick={toggleForm}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
        <p className="pt-10 items-center mx-auto text-gray-400 text-center w-[450px]">
          Be creating an account you aknowlage that you have read and agreed to
          our <span className="text-black">Terms & Condions</span> and{" "}
          <span className="text-black">Privasy Polacy</span>
        </p>
        </div>

      </div>

      <div className="w-1/2 h-screen">
        <img
          className="w-full h-screen object-cover"
          src={img}
          alt="side-banner"
        />
      </div>
    </div>
  );
};

export default SignUp;
