"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import myImage from './assets/logo-inline-qRb.png'


export default function page() {
  const [email, setEmail] = useState('');
  const [setPage, setOTP ] = useState('')
  //const navigate=useNavigate()
 

  function nagigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(this.state.OTP);

      /*axios
        .post("http://localhost:5000/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => setPage(""))
        .catch(console.log);*/
      return;
    }
    return alert("Please enter your email");
  }



  return (

    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">
    <div className="mt-10">
      <Image className="mx-auto w-1/6 h-20 flex items-center my-5"
       src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-2/5 container mx-auto rounded-lg py-4 pb-1">
        <div className="mx-12 my-10 mt-15">
           <div>
              <div className="text-white text-[30px] leading-[36px] py-5 font-[700]">Forgot your password?</div>
                <div className="text-[#9CA3AF] text-[16px] leading-[24px] font-[400]">
                  Don&#39;t fret! Just type in your email and we will send you a link to
                  <br/>
                   reset your password!
                </div>
            </div>
        <form>
            <div>
               <div className="text-white text-[14px] leading-[20px] font-[500] pt-8">Your email</div>
                 <input type="text" onChange={(e) => setEmail(e.target.value)}
                 className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                   rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4"
                    placeholder="name@company.com"/>
                 <a href="/forgot-password-mobile" className="text-white text-[10px] font-[300] leading-[20px] flex flex-row-reverse
                  hover:text-yellow-300 hover:text-[12px]">
                  I don’t have Email access right now !, use phone instead </a>
            </div>
            <div className="flex flex-wrap">
               <input type="checkbox" className="mr-2 box-content h-4 w-4 hover:h-5 hover:w-5
              invalid:border-red-500 valid:border-green-600"/>
               <div className="text-[14px] leading-[20px] font-[500]">
                  <span className="text-white">I accept the </span>
                  <span><a href="" className="text-[#4ADE80] ">Terms and Conditions</a></span>
               </div>
            </div>
            <button onClick={() => nagigateToOtp()}
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
