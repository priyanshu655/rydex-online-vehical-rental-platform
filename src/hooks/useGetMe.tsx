'use client'

import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "@/redux/userSlice"

const useGetMe = (enabled: boolean) => {
  console.log("HOOK ENABLED:", enabled);
  const dispatch=useDispatch();
  console.log(`this is  ${dispatch}`)

  useEffect(() => {
    console.log("EFFECT STARTED:", enabled);

    if (!enabled) return;

    console.log("CALLING /api/user/me");

    const getMe = async () => {
      try {
        const { data } = await axios.get("/api/user/me");
        dispatch(setUserData(data));

        console.log("USER DATA:", data);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };

    getMe();
  }, [enabled]);
};

export default useGetMe;