"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function MyAccount() {

    const [isLogin, setIsLogin] = useState(false);

    const navigate = useRouter();
    
    useEffect(() => {
        if(!isLogin){
            toast.error('Please sign up !!')
            navigate.push('/');
        }  

    },[isLogin]);
  return (
    <div>
      My Account
    </div>
  )
}
