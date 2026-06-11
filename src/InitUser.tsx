'use client'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'
import useGetMe from './hooks/useGetMe'

console.log("INIT USER COMPONENT RENDERED");
const InitUser = ({ children }:{children:ReactNode}) => {
const { status, data } = useSession();

console.log("STATUS:", status);
console.log("SESSION:", data);

  useGetMe(status === "authenticated");

  return <>{children}</>;
};

export default InitUser


