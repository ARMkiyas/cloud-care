"use client";

import React from "react";
import { useEffect,useState } from "react"

import Image from "next/image"
import myImage from "./assets/logo-inline-vhw.png"
import logImage from "./assets/loginjpg.png"



export default function page() {

  const [usermail, usermailupdate] = useState('');
  const [password, passwordupdate] = useState('');

  //const usenavigate=useNavigate();
   
        const ProceedLogin = (e) => {
          
            e.preventDefault();
            if (validate()) {
                ///implentation
                 console.log("proceed");
                 fetch(""+usermail).then((res)=>{
                  return res.json();
                 }).then((resp)=>{
                  console.log(resp)
                  if (Object.keys(resp).length === 0) {
                    // toast.error('Please Enter valid usermail');
                } else {
                  if (resp.password=== password){
                    // toast.success('Success');
                    //usenavigate('/')
                  }else{
                    // toast.error('Please Enter valid credentials');
                  }
                }
                 }).catch((err)=>{
                  // toast.error("Login Failed due to: "+err.message)
                 })
                 
               
        }}
        const validate = () => {
            let result = true;
            if (usermail === '' || usermail === null) {
                result = false;
                // toast.error('Please Enter Usermail');
            }
            if (password === '' || password === null) {
                result = false;
                // toast.error('Please Enter Password');
            }
            return result;
        }

  return (
    <div className="flex flex-col">
    
    <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">

  <div>
    <div className="container mx-auto md:container md:mx-auto">
      <Image 
      className="mx-auto w-1/4 h-20 flex items-center my-10" 
      src={myImage} alt="cloudcare"/>
      <div className="bg-[#1F2937] grid grid-cols-5 w-3/5 container mx-auto rounded-lg">
        <div className="login-image col-span-2">
          <Image className="w-full h-full rounded-l-lg" src={logImage} alt="cloudcare"/>
        </div>
        <div className="mx-12 my-6 col-span-3">
          <div className="text-white text-[30px] leading-[36px] py-5 font-bold">Sign in to platform</div>
          <form onSubmit={ProceedLogin}>
            <div>
              <div>
                <div className="text-white">Your email</div>
                   <input value={usermail}
                    onChange={e=>usermailupdate(e.target.value)}
                   type="text" 
                   className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                   hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4" 
                   placeholder="name@company.com"/>
                  
              </div>
              <div>
                <div className="text-white">Your password</div>
                <input value={password}
                onChange={e=>passwordupdate(e.target.value)}
                type="password" className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4" 
                placeholder="••••••••••••••••"/>
              </div>
            </div>
            <div className="grid justify-items-stretch ... ">
              <div className="flex flex-wrap">
              <input type="checkbox" className="mr-2 box-content h-4 w-4 hover:h-5 hover:w-5
              invalid:border-red-500 valid:border-green-600"/>
              <div className="text-white leading-3 ">
                Remember me</div></div>
              <a href="/forgot-password-mail" className="text-[#16A34A] justify-self-start md:justify-self-end hover:text-yellow-300 hover:text-[17px]">
                Lost Password?</a>
            </div>
            <button type="submit"
            className="text-white bg-gradient-to-r from-green-800 from-5% via-green-600 via-50% to-green-400 to-95% ... 
            hover:from-blue-500 hover:via-green-600 hover:to-green-400 hover:text-black hover:text-[17px]
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
