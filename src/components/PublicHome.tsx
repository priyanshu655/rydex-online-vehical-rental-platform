'use client'
import React, { useState } from 'react'
import HeroSection from './HeroSection'
import VehicalSlider from './VehicalSlider'
import AuthModel from './AuthModel'


const PublicHome = () => {
const [authOpen,setAuthOpen]=useState(false);
  return (
   <>
  <HeroSection/>
  <VehicalSlider/>
  <AuthModel  open={authOpen} onClose={()=>setAuthOpen(false)}/>
   </>
  )
}

export default PublicHome
