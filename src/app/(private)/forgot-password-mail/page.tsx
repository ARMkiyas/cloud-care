"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import myImage from './assets/logo-inline-qRb.png'
import { z } from 'zod';

// Define the schema for form validation using Zod
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});


const Page=({setOtpSent,setEmail}) =>{
  const [emailValue, setEmailValue] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email:emailValue,
    };

    try {
      // Validate the form data against the schema
      forgotPasswordSchema.parse(formData);

      if (!isChecked) {
        throw new Error('Please agree to the terms');
      }
      
      const response = await sendOTPToEmail(formData.email);

      // If email sending is successful, proceed to OTP verification page
      if (response.status === 'success') {
        setOtpSent(true);
        setEmail(emailValue);
    
      } else {
        // Handle error if email sending fails
        setErrors({ email: 'Failed to send OTP. Please try again.' });
      }
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

  // Simulated function to send OTP to the provided email (replace with actual implementation)
  const sendOTPToEmail = async (email) => {

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data; // Return status or response data
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { status: 'error' }; // Return an error status
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
      <div className="bg-[#1F2937] w-4/5 container mx-auto rounded-lg  flex justify-center items-center">
        <div className="mx-8 my-3">
           <div>
              <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px]">
                Forgot your password?</div>
                <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
                  Don&#39;t fret! Just type in your email and we will send you a link to
                   reset your password!
                </div>
            </div>
        <form onSubmit={handleSubmit}>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 2xl:text-[23px]">
                Your email</div>
                 <input type="email" 
                 value={emailValue}
                 onChange={(e) => setEmailValue(e.target.value)}
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                   rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                    placeholder="name@company.com"/>
                    {/*errors.email && <span style={{ color: 'red' }}>{errors.email}</span>*/}

                 <a href="/forgot-password-mobile" className="text-white text-[10px] font-[300] xl:leading-[20px] flex xl:flex-row-reverse mb-3">
                  I don’t have Email access right now !, use phone instead </a>
            </div>
            <div className="flex flex-wrap">
               <input type="checkbox"
               checked={isChecked}
               onChange={handleCheckboxChange}
                className="mr-2 box-content h-4 w-4 "/>
               <div className="text-[14px] leading-[20px] font-[500]">
                  <span className="text-white">I accept the </span>
                  <span><a href="" className="text-[#4ADE80] ">Terms and Conditions</a></span>
               </div>
            </div>
            <button
             className="xl:w-auto text-white  bg-green-600 hover:bg-green-500  hover:text-[17px] hover:w-auto px-3
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

export default Page;