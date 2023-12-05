"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import myImage from "./assets/logo-inline-qRb.png";
import { z } from "zod";

// Define the schema for form validation using Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

const Page = () => {
  const [emailValue, setEmailValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const [verificationError, setVerificationError] = useState("");

  const handleClick = () => {
    setShowEmail((prevShowEmail) => !prevShowEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailValue,
      mobile: mobileNumber,
    };
    try {
      const validationResult = forgotPasswordSchema.parse(formData);
      if (!isChecked) {
        throw new Error("Please agree to the terms");
      }
      console.log("Validation successful:", validationResult);
      // Simulate verification logic
    } catch (error) {
      console.error("Validation failed:", error.errors);
      // Handle validation errors here
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
        <div className="mt-5">
          <Image
            className="flex items-center w-1/2 h-12 mx-auto mb-8 xl:w-1/3 xl:h-20 xl:my-5 md:h-18 md:w-1/3 md:h-20 "
            src={myImage}
            alt="Cloudcare"
          />
          <div className="bg-[#1F2937] w-4/5 container mx-auto rounded-lg flex justify-center items-center">
            <div className="mx-8 my-3">
              <div>
                <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px]">
                  Forgot your password?
                </div>
                <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
                  Don&#39;t fret! Just type in your email and we will send you a
                  link to reset your password!
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  {showEmail ? (
                    <div>
                      <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 xl:text-[22px] 2xl:text-[23px]">
                        Your email
                      </div>
                      <input
                        type="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                   rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                        placeholder="name@company.com"
                      />
                      {verificationError && <span>{verificationError}</span>}
                    </div>
                  ) : (
                    <div>
                      <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 xl:text-[22px] 2xl:text-[23px]">
                        Your phone number
                      </div>
                      <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                         rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                        placeholder="+94123456789"
                      />
                      {verificationError && <span>{verificationError}</span>}
                    </div>
                  )}

                  <Link
                    href="/auth/forgot-password"
                    onClick={handleClick}
                    className="text-white text-[10px] font-[300] xl:leading-[20px] flex xl:flex-row-reverse mb-3"
                  >
                    I don’t have Email access right now !, use{" "}
                    {showEmail ? "phone" : "Email"} instead{" "}
                  </Link>
                </div>
                <div className="flex flex-wrap">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="box-content w-4 h-4 mr-2 "
                  />
                  <div className="text-[14px] leading-[20px] font-[500]">
                    <span className="text-white">I accept the </span>
                    <span>
                      <Link href="" className="text-[#4ADE80] ">
                        Terms and Conditions
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="xl:w-auto  text-white  bg-green-600 hover:bg-green-500  hover:text-[17px] hover:w-auto px-3
             text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...
             w-auto"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
