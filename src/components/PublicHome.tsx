'use client'
import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import VehicalSlider from './VehicalSlider'
import AuthModel from './AuthModel'


const PublicHome = () => {
const [authOpen,setAuthOpen]=useState(false);

useEffect(() => {
  const openAuthModal = () => setAuthOpen(true);

  window.addEventListener("open-auth-modal", openAuthModal);

  return () => {
    window.removeEventListener("open-auth-modal", openAuthModal);
  };
}, []);

  return (
   <>
  <HeroSection onAuthRequired={()=>setAuthOpen(true)}/>
  <VehicalSlider/>
  <AuthModel  open={authOpen} onClose={()=>setAuthOpen(false)}/>
   </>
  )
}

export default PublicHome
