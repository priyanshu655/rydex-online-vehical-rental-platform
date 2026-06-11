import { Bike, Bus, Car, CarFront, CarTaxiFront, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useRef, useState } from 'react'
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Crown,
  Star
} from "lucide-react";
import { script } from 'motion/react-client';


const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse the full fleet",
    Icon: CarTaxiFront,
    tag: "Popular",
    tagIcon: Sparkles,
  },
  {
    title: "Bikes",
    desc: "Fast & affordable rides",
    Icon: Bike,
    tag: "Quick",
    tagIcon: Zap,
  },
  {
    title: "Cars",
    desc: "Comfort rides",
    Icon: Car,
    tag: "Comfort",
    tagIcon: Crown,
  },
  {
    title: "SUV",
    desc: "Family travel",
    Icon: CarFront,
    tag: "Safe",
    tagIcon: ShieldCheck,
  },
  {
    title: "Premium",
    desc: "Luxury experience",
    Icon: Car,
    tag: "Premium",
    tagIcon: Star,
  },
];

const VehicalSlider = () => {
  const [hovered,setHovered]=useState<number|null>();
  const sliderRef=useRef<HTMLDivElement>(null);
  const scroll=(dir:"left"|"right")=>{
    if(!sliderRef.current) return;
    sliderRef.current.scrollBy({left:dir=="left"?-300:300,behavior:"smooth"})
  }
  return (
    <div className='w-full bg-white py-20 overflow-hidden px-4'>
      <div className='max-w-7xl mx-auto'>
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.55,ease:[0.22,1,0.36,1]}}
    className='flex items-end justify-between mb-10'
    >
      <div>
      <div className='flex items-center gap-2 mb-3'>
    <div className='h-px w-8 bg-zinc-900'/>
    <span className='tex-[10px] font-black uppercase tracking-[0.2em] text-zinc-400'>Fleet</span>
      </div>
      <h2 className='text-3xl font-black tracking-tight sm:text-4xl text-zinc-900'>Vehicals<br/>
      <span className='relative inline-block'>Categories
        <motion.div
        initial={{scaleX:0}}
        whileInView={{scaleX:1}}
        transition={{duration:0.6,delay:0.4,ease:[0.22,1,0.36,1]}}
        className='absolute -bottom-1 right-0 h-0.5 bg-zinc-900 origin-left left-0'
        
        
        />

       
      </span>

      </h2>
      <p className='text-zinc-400 text-sm mt-3 font-medium'>Choose the ride that fits yourjourney</p>
      </div>

      <div className='hidden sm:flex items-center gap-2'>
    <motion.div
    onClick={()=>scroll("left")}
    whileTap={{scale:0.88}}
    className='w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'
    >
    <ChevronLeft size={18} strokeWidth={2.5}/>
    </motion.div>
    <motion.div
    onClick={()=>scroll("right")}
    className='w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'>
<ChevronRight size={18} strokeWidth={2.5}/>
    </motion.div>
      </div>
    </motion.div>
    <div className="relative">
  <div

  ref={sliderRef}
    className="flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1"
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    {VEHICLE_CATEGORIES.map((c, i) => {
      const isHovered = hovered === i;
      const TagIcon = c.tagIcon;

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1 + i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          onHoverStart={() => setHovered(i)}
          onHoverEnd={() => setHovered(null)}
          whileHover={{ y: -8 }}
          className="group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer"
        >
          <motion.div
            animate={{
              backgroundColor: isHovered ? "#09090b" : "#ffffff",
              borderColor: isHovered ? "#09090b" : "#e4e4e7",
              boxShadow: isHovered
                ? "0 12px 32px rgba(0,0,0,0.12)"
                : "0 4px 12px rgba(0,0,0,0.05)",
            }}
            transition={{ duration: 0.25 }}
            className="relative rounded-3xl border p-6 sm:p-7 overflow-hidden h-full"
          >
            {/* Tag */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-colors ${
                isHovered
                  ? "bg-white/10 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              <TagIcon size={14} />
              {c.tag}
            </span>

            {/* Vehicle Icon */}
            <div
              className={`mb-5 transition-colors ${
                isHovered ? "text-white" : "text-zinc-900"
              }`}
            >
              <c.Icon size={36} />
            </div>

            {/* Title */}
            <h3
              className={`text-xl font-bold mb-2 transition-colors ${
                isHovered ? "text-white" : "text-zinc-900"
              }`}
            >
              {c.title}
            </h3>

            {/* Description */}
            <p
              className={`text-sm leading-relaxed transition-colors ${
                isHovered ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              {c.desc}
            </p>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</div>

<motion.div
initial={{opacity:0}}
whileInView={{opacity:1}}
transition={{delay:0.7}}
className='flex items-center gap-6 mt-8 pt-6 border-t border-zinc-100'
>
{
  [
    {num:"6+",label:"Categories"},
    {num:"10",label:"Vehicle types"},
    {num:"24/7",label:"Availability"}
  ].map((d,i)=>(
    <div key={i} className='flex items-center  gap-3'>
      <p className='text-zinc-900  text-lg font-black tracking-tight'>{d.num}</p>
      <p className='text-zinc-400 text-xs font-medium'>{d.label}</p>
    </div>
  ))
}
</motion.div>
      </div>
    </div>
  )
}

export default VehicalSlider
