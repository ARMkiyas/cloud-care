"use client"
import React,{useState} from 'react'

import Image from 'next/image'
import myImage from '../forgot-password-mail/assets/logo-inline-qRb.png'
import { z } from 'zod';

// Define the schema for password validation using Zod
const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: [' '],
});

export default function page() {

  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    const formData = {
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };
    try {
      // Validate the password and confirm password against the schema
      passwordSchema.parse(formData);

      if (!isChecked) {
        throw new Error('Please agree to the terms');
      }

      alert('Password has been reset successfully!');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setVerificationError(error.errors[0]?.message || 'Invalid password');
      }
    }
  };

  const handleCheckboxChange=(e)=>{
    setIsChecked(e.target.checked);
  }

return (

    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">
    <div className="mt-10">
      <Image className="mx-auto xl:w-1/6 xl:h-20 flex items-center xl:my-5 md:h-18 md:w-1/3
      w-1/2 h-10 mb-8 lg:h-20 lg:mt-10"
       src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-4/5 container mx-auto rounded-lg xl:py-4 xl:pb-1 xl:w-2/5
      pt-5 px-5 md:w-1/2">
        <div className="xl:mx-12 xl:my-5 xl:mt-5">
           <div>
              <div className="text-white
               xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700]
              text-[25px] ">
                Change Password</div>
            </div>
        <form onSubmit={handleResetPassword}>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-5 2xl:text-[21px]">New Password</div>
                 <input type="password"
                 value={passwordValue}
                 onChange={(e)=>setPasswordValue(e.target.value)}
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                 rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                    placeholder="••••••••••••••••••"/>
            </div>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 2xl:text-[21px]">Confirm Password</div>
                 <input type="password"
                 value={confirmPasswordValue}
                 onChange={(e)=>setConfirmPasswordValue(e.target.value)}
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                 rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                    placeholder="••••••••••••••••••"/>
                    {verificationError && <span>{verificationError}</span>}
            </div>
            <div className="flex flex-wrap">
               <input type="checkbox"
               checked={isChecked}
               onChange={handleCheckboxChange}
                className="mr-2 box-content h-4 w-4 "/>
               <div className="text-[14px] leading-[20px] font-[500]">
                  <span className="text-white">I accept the </span>
                  <span><a href="" className="text-[#4ADE80]">Terms and Conditions</a></span>
               </div>
            </div>
            <button
             className="xl:w-auto text-white  bg-green-600 hover:bg-green-500 hover:text-black hover:text-[17px] hover:w-auto
             text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...
             w-auto ">
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