"use client"
import React,{useState} from 'react'

import Image from 'next/image'
import myImage from '../forgot-password-mail/assets/logo-inline-qRb.png'


export default function page() {

    function changePassword(){}

return (

    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">
    <div className="p-5">
      <Image className="mx-auto w-1/6 h-20 flex items-center my-5"
       src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-2/5 container mx-auto rounded-lg py-4 pb-1">
        <div className="mx-12 my-10 mt-15">
           <div>
              <div className="text-white text-[30px] leading-[36px] py-5 font-[700] ">
                Change Password</div>
            </div>
        <form>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-2">New Password</div>
                 <input type="text"
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4
                   rounded-md text-sm"
                    placeholder="••••••••••••••••••"/>
            </div>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-2">Confirm Password</div>
                 <input type="text"
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4
                   rounded-md text-sm"
                    placeholder="••••••••••••••••••"/>
            </div>
            <div className="flex flex-wrap">
               <input type="checkbox" className="mr-2 box-content h-4 w-4 hover:h-5 hover:w-5
              invalid:border-red-500 valid:border-green-600"/>
               <div className="text-[14px] leading-[20px] font-[500]">
                  <span className="text-white">I accept the </span>
                  <span><a href="" className="text-[#4ADE80]">Terms and Conditions</a></span>
               </div>
            </div>
            <button onClick={() => changePassword()}
             className="w-1/4 text-white bg-gradient-to-r from-green-800 from-5% via-green-600 via-50% to-green-400 to-95% ... 
             hover:from-blue-500 hover:via-green-600 hover:to-green-400 hover:text-black hover:text-[17px] hover:w-auto
             text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...">
              Reset password
              </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}