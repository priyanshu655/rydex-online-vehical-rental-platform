'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  CircleDashed,
  CreditCard,
  Landmark,
  Phone,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const router = useRouter()
const [accountHolder,setAccountHolder]=useState("");
const [accountNumber,setAccountNumber]=useState("");
const[ifsc,setIfsc]=useState("");
const [upi,setUpi]=useState("");
const [mobileNumber,setMobileNumber]=useState("");
const[loading,setLoading]=useState(false);
const[error,setError]=useState("");

const handleBank=async ()=>{
  setLoading(true);
  setError("");
    try{
      const {data}=await axios.post("/api/partner/onboarding/bank",{accountHolder,accountNumber,ifsc,mobileNumber,upi});
      console.log(data);
      setLoading(false);
    }catch(error:any){
      setError(error?.response?.data?.message||"Something went wrong")
      console.log(error);
      setLoading(false);
    }
}
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-5 sm:p-6"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <p className="text-gray-500 font-medium text-sm">Step 3 of 3</p>

          <h1 className="text-lg font-bold mt-1">
            Bank & Payout Setup
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Used for partner payouts
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="accountHolder"
            >
              Account holder name
            </label>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <BadgeCheck size={18} />
              </div>

              <input
                id="accountHolder"
                type="text"
                placeholder="As per bank records"
                className="flex-1 border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black"
                value={accountHolder}
                onChange={(e)=>setAccountHolder(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="accountNumber"
            >
              Bank account number
            </label>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <CreditCard size={18} />
              </div>

              <input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                className="flex-1 border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black"
                 value={accountNumber}
                onChange={(e)=>setAccountNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="ifsc"
            >
              IFSC code
            </label>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Landmark size={18} />
              </div>

              <input
                id="ifsc"
                type="text"
                placeholder="HDFC0001234"
                className="flex-1 border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black"
                 value={ifsc}
                onChange={(e)=>setIfsc(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="mobile"
            >
              Mobile number
            </label>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Phone size={18} />
              </div>

              <input
                id="mobile"
                type="text"
                placeholder="10 digit mobile number"
                className="flex-1 border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black"
                 value={mobileNumber}
                onChange={(e)=>setMobileNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              className="text-xs font-semibold text-gray-500"
              htmlFor="upi"
            >
              UPI ID (Optional)
            </label>

            <div className="mt-2">
              <input
                id="upi"
                type="text"
                placeholder="name@upi"
                className="w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black"
                 value={upi}
                onChange={(e)=>setUpi(e.target.value)}
              />
            </div>
          </div>
        </div>
{error && <p className='text-red-500 mt-4'>*{error}</p>}
        <div className="mt-5 flex items-start gap-3 text-xs text-gray-500">
          <CheckCircle size={18} className="shrink-0 mt-0.5" />
          <p>
            Bank details are verified before the first payout. This usually
            takes 24–48 hours.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl bg-black text-white font-semibold transition flex items-center justify-center"
          onClick={handleBank}
        >
        {loading?<CircleDashed className='text-white animate-spin'/>:"Continue"}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Page