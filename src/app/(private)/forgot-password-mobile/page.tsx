"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import myImage from './assets/logo-inline-r33.png'
import {z} from 'zod'

const mobileNumberSchema = z.object({
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

const Page=()=>{
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleMobileVerification = (e) => {
    e.preventDefault();

    const formData = {
      mobileNumber,
    };

    try {
   
      mobileNumberSchema.parse(formData);

      if (!isChecked) {
        throw new Error('Please agree to the terms');
      }

      setOtpSent(true);
      alert('OTP has been sent to your mobile number!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setVerificationError(error.errors[0]?.message || 'Invalid mobile number');
      }
    }
  };

  const handleOTPVerification = (enteredOTP) => {

    const storedOTP = '123456'; // Replace this with the actual stored OTP

    return enteredOTP === storedOTP;
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    
    const enteredOTP = e.target.elements.otp.value; 
    const verificationResult = handleOTPVerification(enteredOTP);
    if (verificationResult) {
      // Redirect to OTP verification success page or any other page
      alert('OTP Verified Successfully!');
      // Replace the alert with navigation logic to another page
    } else {
      setVerificationError('Invalid OTP. Please try again.');
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
    <div className="mt-5">
      <Image className="mx-auto xl:w-1/6 xl:h-20 flex items-center xl:my-5 md:h-18 md:w-1/3
      w-1/2 h-10 mb-8 lg:h-20"
       src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-4/5 container mx-auto rounded-lg  flex justify-center items-center ">
        <div className="mx-8 my-3">
          <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px]">Forgot your password?</div>
          <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
            Don&#39;t fret! Just type in your phone number and we will send you a link/OTP to reset your password!</div>
          <form onSubmit={handleMobileVerification}>
            <div>
              <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 2xl:text-[23px]">Your phone number</div>
              <input type="text" 
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
                   className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                   rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]" placeholder="+94123456789"/>
                   {verificationError && <span>{verificationError}</span>}

              <a href="/forgot-password-mail" className="text-white text-[10px] font-[300] xl:leading-[20px] flex xl:flex-row-reverse mb-3">
                I don’t have phone access right now !, use Email instead </a>
            </div>
            <div className="flex flex-wrap">
              <input type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
               className="mr-2 box-content h-4 w-4 "/>
              <div className="text-[14px] leading-[20px] font-[500]">
                <span className="text-white">I accept the </span>
                <span><a href=""className="text-[#4ADE80]">Terms and Conditions</a></span>
              </div>
            </div>
            <button
              className="xl:w-auto text-white  bg-green-600 hover:bg-green-500  hover:text-[17px] hover:w-auto px-3
              text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...
              w-auto ">
                Reset password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Page;
