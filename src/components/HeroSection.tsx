"use client";
import React from "react";
import { motion } from "motion/react";
import { Bike, Bus, Car, Truck } from "lucide-react";

const HeroSection = ({onAuthRequired}:{onAuthRequired?:()=>void}) => {
  const handleBookNow = () => {
    window.dispatchEvent(new Event("open-auth-modal"));
    onAuthRequired?.();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-extrabold text-4xlsm:text-5xl md:text-7xl"
        >
          Book any vehical
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 max-w-xl text-gray-300"
        >
          From daily rides to heavy transport - all in one platfrom.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-8 text-gray-300"
        >
          <Bike size={30} />
          <Car size={30} />
          <Bus size={30} />
          <Truck size={30} />
        </motion.div>

        <button
          className="text-black px-10 py-4 bg-white rounded-full font-semibold shadow-xl mt-12"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
