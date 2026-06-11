'use client'
import React from 'react'
import { motion } from 'motion/react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
const socialLinks = [
  {
    Icon: FaInstagram,
    href: "https://instagram.com/patelpriyanshu18",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/priyanshu-patel-a54796260",
  },
  {
    Icon: FaXTwitter,
    href: "https://x.com/patelpr87170574",
  },
];
const Footer = () => {
  return (
    <div className='w-full bg-black text-white'>
      <motion.div
      initial={{opacity:0,y:40}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.6,ease:"easeOut"}}
      viewport={{once:true}}
      className='max-w-7xl mx-auto px-6 py-16'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
<div>
  <h2 className='text-2xl font-bold tracking-wide'>RYDEX</h2>
  <p className='text-gray-400 text-sm leading-relexed '>Book any vehical - from bikes to trucks. Trusted owners. Transarent pricing.</p>

<div className="flex items-center gap-3">
  {socialLinks.map(
    ({Icon,href}, i) => {
      return (
        <motion.a
          key={i}
          href={href}
          whileHover={{ y: -3 }}
          className="w-10 h-10 flex items-center justify-center rounded-full border brder-white/20 hover:bg-white hover:text-black transition mt-3"
        >
          <Icon size={18} />
        </motion.a>
      );
    }
  )}
</div>
</div>
        </div>
        <div className='border-t border-white/10 mt-3'>
        <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4'>
<p>&#169; {new Date().getFullYear()} RYDEX. All rights reserved.</p>
        </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Footer
