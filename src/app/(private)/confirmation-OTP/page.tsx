"use client"
import React,{useState} from 'react'

import Image from 'next/image'
import btnIcon from './assets/svg-margin.png'
import myImage from './assets/logo-inline.png'
import userImage from './assets/bonnie-greenpng.png'
import { z } from 'zod';

// Define the schema for OTP validation using Zod
const OTPSchema = z.object({
  otp: z.string().nonempty('OTP is required').min(6, 'OTP must be at least 6 characters'),
});

const Page = ({ email }) => {
  const [otpValue, setOTPValue] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  

  const handleOTPVerification = (e) => {
    e.preventDefault();

    const formData = {
      otp: otpValue,
    };

    try {
      // Validate the OTP against the schema
      OTPSchema.parse(formData);

      
      const verificationResult = verifyOTP(formData.otp, email);

      if (verificationResult) {
       
        alert('OTP Verified Successfully!');
        
      } else {
        // Handle error if OTP verification fails
        setVerificationError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setVerificationError(error.errors[0]?.message || 'Invalid OTP format');
      }
    }
  };

  // Simulated function to verify OTP (replace with actual implementation)
  const verifyOTP = (enteredOTP, userEmail) => {
    
    const storedOTP = '123456'; 

    return enteredOTP === storedOTP;
  };

  const handleResendOTP = () => {
    setOtpSent(true);
    alert('New OTP has been sent to your email!');
  };


  
  return (
    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
    <div className="mt-5">
      <Image className="mx-auto xl:h-20 flex items-center xl:my-5 md:h-18 md:w-1/3
      w-1/2 h-10 mb-8 lg:h-20" 
      src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-4/5  container mx-auto rounded-lg  flex justify-center items-center">
        <div className="mx-8 my-3">
          <div>
            <div className="flex">
              <div className="flex-none h-auto w-auto">
                <Image className="rounded-full h-[42px] w-[41px]" src={userImage} alt="user"/>
              </div>
              <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px] xl:pr-20">Dr.Bonnie Green</div>
            </div>
            <div>
              <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
              We have sent 2FA OTP to your Email Address and phone, Please enter it to unlock    
              </div>
            </div>
          </div>
          <form onSubmit={handleOTPVerification}>
            <div>
              <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 2xl:text-[23px]">OTP</div>
              <input type="text" 
              value={otpValue}
              onChange={(e) =>
                setOTPValue(e.target.value)}
               className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
               rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]" 
                   placeholder="••••••••"/>
               {verificationError && <span>{verificationError}</span>}    
            </div>
            <div className="text-[#9CA3AF] text-[16px] leading-[24px] font-[400] mx-1">Didn't receive code?
                 <a href="" className="text-white "onClick={handleResendOTP}> 
                 Resend OTP
                 </a>
            </div>

            <button className="flex xl:w-auto text-white  bg-green-600 hover:bg-green-500  hover:text-[17px] hover:w-auto px-3
              text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...
              w-auto ">
              <Image className="w-[16px] h-[16px] mx-2 ml-0 hover:w-[18px] hover:h-[18px]" src={btnIcon} alt="unlock"/>
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Page;
