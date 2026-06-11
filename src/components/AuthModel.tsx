"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Lock, User, X, CircleDashed } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type PropType = {
  open: boolean;
  onClose: () => void;
};

type StepType = "login" | "signup" | "otp";

const AuthModel = ({ open, onClose }: PropType) => {
  const [step, setStep] = useState<StepType>("login");
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { data } = useSession();
  console.log(data);
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      // console.log(data);
      setError("")
      console.log("REGISTER RESPONSE:", data);
      setStep("otp");
      setLoading(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      console.log(message);
      setError(message);
      setLoading(false);
    }
  };

    const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-email", {
        
        email,
        otp:otp.join("")
      });
      console.log(data);
      setOtp(["", "", "", "", "", ""]);
      setError("")
      setStep("login");
      setLoading(false);
    } catch (error: any) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response?.data);

  setError(
    error.response?.data?.message ||
    "Something went wrong"
  );

  setLoading(false);
}
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const handleChangeotp = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-90 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-100 flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-black transition"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold tracking-widest">
                  RYDEX
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  Premium Vehicle Booking
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                <Image src="/google.png" alt="google" width={20} height={20} />
                Continue with Google
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-black/10" />
                <div className="text-xs text-gray-500">OR</div>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              <AnimatePresence mode="wait">
                {step === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2 className="text-xl font-semibold">Welcome Back</h2>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center rounded-xl px-4 py-3 gap-3 border border-black/20">
                        <Mail size={18} className="text-gray-500" />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full bg-transparent outline-none text-sm"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>

                      <div className="flex items-center rounded-xl px-4 py-3 gap-3 border border-black/20">
                        <Lock size={18} className="text-gray-500" />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full bg-transparent outline-none text-sm"
                          onChange={(e) => setpassword(e.target.value)}
                          value={password}
                        />
                      </div>

                      <button
                        className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex items-center justify-center"
                        disabled={loading}
                        onClick={handleLogin}
                      >
                        {!loading ? (
                          "Login"
                        ) : (
                          <CircleDashed
                            size={20}
                            color="white"
                            className="animate-spin font-extrabold"
                          />
                        )}
                      </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => setStep("signup")}
                        className="text-black font-medium hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  </motion.div>
                )}

                {step === "signup" && (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                  >
                    <h2 className="text-xl font-semibold">Create Account</h2>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center rounded-xl px-4 py-3 gap-3 border border-black/20">
                        <User size={18} className="text-gray-500" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-transparent outline-none text-sm"
                          onChange={(e) => setname(e.target.value)}
                          value={name}
                        />
                      </div>

                      <div className="flex items-center rounded-xl px-4 py-3 gap-3 border border-black/20">
                        <Mail size={18} className="text-gray-500" />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full bg-transparent outline-none text-sm"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>

                      <div className="flex items-center rounded-xl px-4 py-3 gap-3 border border-black/20">
                        <Lock size={18} className="text-gray-500" />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full bg-transparent outline-none text-sm"
                          onChange={(e) => setpassword(e.target.value)}
                          value={password}
                        />
                      </div>

                      {error && <p className="text-red-500">*{error}</p>}
                      <button
                        className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center"
                        onClick={handleSignUp}
                        disabled={loading}
                      >
                        {!loading ? (
                          "Send Otp"
                        ) : (
                          <CircleDashed
                            size={20}
                            color="white"
                            className="animate-spin font-extrabold"
                          />
                        )}
                      </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                      Already have an account?{" "}
                      <button
                        onClick={() => setStep("login")}
                        className="text-black font-medium hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </motion.div>
                )}

                {step === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-semibold">Verify Email</h2>

                    <div className="mt-6 flex justify-between gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={digit}
                          maxLength={1}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !otp[i] && i > 0) {
                              document.getElementById(`otp-${i - 1}`)?.focus();
                            }
                          }}
                          onChange={(e) => handleChangeotp(i, e.target.value)}
                          className="w-10 h-12 sm:w-12 text-center text-lg font-semibold rounded-xl border border-black/20 outline-none"
                        />
                      ))}
                    </div>
                    {error && <p className="text-red-500 mt-2">*{error}</p>}
                    <button  onClick={handleVerifyEmail} className="text-white flex items-center justify-center font-semibold hover:bg-gray-900 transition bg-black mt-6 w-full h-11 rounded-xl" disabled={loading} > {!loading ? (
                          "Verify and Create Account"
                        ) : (
                          <CircleDashed
                            size={20}
                            color="white"
                            className="animate-spin font-extrabold"
                          />
                        )}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModel;
