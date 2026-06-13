'use client';

import React, { useState } from 'react';
import { ArrowLeft, Bike, Car, CircleDashed, Package, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const VEHICLES = [
  { id: 'bike', label: 'Bike', icon: Bike, desc: '2 wheeler' },
  { id: 'auto', label: 'Auto', icon: Car, desc: '3 wheeler ride' },
  { id: 'car', label: 'Car', icon: Car, desc: '4 wheeler ride' },
  { id: 'loading', label: 'Loading', icon: Package, desc: 'Small goods' },
  { id: 'truck', label: 'Truck', icon: Truck, desc: 'Heavy transport' },
];

const Page = () => {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setvehicleNumber] = useState('');
  const [vehicleModel, setvehicleModel] = useState('');
  const [error,setError]=useState("");
  const[loading,setLoading]=useState(false);
const handleVehicle=async ()=>{
  setError("");
  try{
    setLoading(true);
    const {data}=await axios.post("/api/partner/onboarding/vehicle",{type:vehicleType,number:vehicleNumber,vehicleModel:vehicleModel});
    setLoading(false);
    console.log(data);
  }catch (e: any) {
   
  setError(e.response?.data?.message ?? "Something went wrong");
  console.log(e);
   setLoading(false)
}
}
  return (
    <div className="bg-white flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-5 sm:p-6"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <p className="text-gray-500 font-medium text-sm">Step 1 of 3</p>

          <h1 className="text-xl font-bold mt-1">Vehicle Details</h1>

          <p className="text-sm text-gray-500 mt-2">
            Add your vehicle information
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3">
              Vehicle Type
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VEHICLES.map((v) => {
                const Icon = v.icon;
                const active = vehicleType === v.id;

                return (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-2xl border p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      active
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    <Icon size={24} />
                    <p className="font-medium text-sm">{v.label}</p>
                    <p className="text-[11px] text-center opacity-70">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="vn"
              className="text-sm font-semibold text-gray-500"
            >
              Vehicle Number
            </label>

            <input
              value={vehicleNumber}
              onChange={(e) => setvehicleNumber(e.target.value.toUpperCase())}
              type="text"
              id="vn"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"
              placeholder="MH12AB1234"
            />
          </div>

          <div>
            <label
              htmlFor="vm"
              className="text-sm font-semibold text-gray-500"
            >
              Vehicle Model
            </label>

            <input
              value={vehicleModel}
              onChange={(e) => setvehicleModel(e.target.value)}
              type="text"
              id="vm"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition"
              placeholder="TATA Ace"
            />
          </div>
        </div>
        {error && (
<p className='text-red-500 mt-4'>{error}</p>
        )}

       <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="mt-6 w-full h-12 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition" onClick={handleVehicle}
        >
          {loading?<CircleDashed className='text-white animate-spin'/>:"Continue"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Page;