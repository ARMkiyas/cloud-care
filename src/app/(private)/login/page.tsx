"use client";

import React from "react";
import { useEffect,useState } from "react"

import Image from "next/image"
import myImage from "./assets/logo-inline-vhw.png"
import logImage from "./assets/loginjpg.png"
import {z} from "zod"

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      // Validate the form data against the schema
      loginSchema.parse(formData);
      // If validation succeeds, you can perform further actions like API calls for authentication
      console.log('Form is valid:', formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setErrors(error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {}));
      }
    }
  };


  return (
    <div className="flex flex-col">
    
    <div className="bg-[#111827] sm:h-screen sm:w-screen pt:mt-0 mx-auto items-center justify-center
    lg:h-screen lg:w-screen">

  <div>
    <div className="container mx-auto">
      <Image 
      className="sm:w-1/4 sm:h-20 sm:flex sm:my-10 xl:h-15 xl:w-1/4 xl:mb-8 xl:mt-19
      w-1/2 items-center flex mx-auto h-12 m-8 lg:mt-8 lg:h-14 lg:mb-4
      md:mt-5 md:mb-5 md:h-12" 
      src={myImage} alt="cloudcare"/>
      <div className="bg-[#1F2937] sm:mx-auto sm:grid-cols-5 sm:w-3/5 sm:container 
      md:h-3/4
       sm:grid rounded-lg mx-5 h-1/2 md:w-4/5 lg:h-3/4 xl:w-3/5">
        <div className="login-image sm:col-span-2">
          <Image className="w-full sm:h-full sm:rounded-l-lg
          rounded-t-lg"
           src={logImage} alt="cloudcare"/>
        </div>
        <div className="mx-12 my-6 col-span-3">
          <div className="text-white text-[30px] leading-[36px] py-5 font-bold">Sign in to platform</div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div className="text-white">Your email</div>
                   <input value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                   type="email" 
                   className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                    hover:bg-[#3f4b61] hover:text-white hover:text-[16px]" 
                   placeholder="name@company.com"/>
                   {/*errors.email && <span style={{ color: 'red' }}>{errors.email}</span>*/}
                  
              </div>
              <div>
                <div className="text-white">Your password</div>
                <input value={password}
                onChange={e=>setPassword(e.target.value)}
                type="password" className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                hover:bg-[#3f4b61] hover:text-white hover:text-[16px]" 
                placeholder="••••••••••••••••"/>
                {/*errors.password && <span style={{ color: 'red' }}>{errors.password}</span>*/}
              </div>
            </div>
            <div className="grid justify-items-stretch ... ">
              <div className="flex flex-wrap">
              <input type="checkbox" className="mr-2 box-content h-4 w-4 "/>
              <div className="text-white leading-3 ">
                Remember me</div></div>
              <a href="/forgot-password-mail" className="text-[#16A34A] justify-self-start md:justify-self-end">
                Lost Password?</a>
            </div>
            <button type="submit"
            className="text-white bg-green-600 hover:bg-green-500 hover:text-black hover:text-[17px] 
            text-[16px] text-center leading-[26px] my-8 py-2 w-full border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...">
              Login to your account</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div></div>
  )
}
