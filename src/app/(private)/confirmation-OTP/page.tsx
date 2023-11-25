"use client"
import React,{useState} from 'react'

import Image from 'next/image'
import btnIcon from './assets/svg-margin.png'
import myImage from './assets/logo-inline.png'
import userImage from './assets/bonnie-greenpng.png'

export default function page() {

 // const { email, otp, setPage } = useState('');
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
   /* if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);*/
  }

  function verfiyOTP() {
   /* if (parseInt(OTPinput.join("")) === otp) {
      setPage("");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;*/
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);
  
  return (
    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">
    <div className="p-10">
      <Image className="mx-auto w-1/6 h-20 flex items-center my-5" 
      src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] w-2/5 container mx-auto rounded-lg py-4 pb-1">
        <div className="mx-10 my-10 mt-15">
          <div className="auto-group-9hz3-jtu">
            <div className="flex">
              <div className="flex-none h-auto w-auto">
                <Image className="rounded-full h-[42px] w-[41px]" src={userImage} alt="user"/>
              </div>
              <div className="text-white text-[30px] leading-[36px] px-4 pb-4 font-[700]">Dr.Bonnie Green</div>
            </div>
            <div className="auto-group-pkuk-ywf">
              <div className="text-[#9CA3AF] text-[16px] leading-[24px] font-[400]">
              We have sent 2FA OTP to your Email Address and phone, Please enter it
              <br/>
              to unlock    
              </div>
            </div>
          </div>
          <div className="form-zbs">
            <div className="divh2d-e1227081-Lfj">
              <div className="text-white text-[14px] leading-[20px] font-[500] pt-3">OTP</div>
              <input type="text" 
              onChange={(e) =>
                setOTPinput(
                  OTPinput[e.target.value]
                )}
               className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
                   rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px] leading-4" placeholder="••••••••"/>
            </div>
            <div className="text-[#9CA3AF] text-[16px] leading-[24px] font-[400] mx-1">Didn't receive code?
                 <a href="" className="text-white hover:text-yellow-300 hover:text-[17px]" onClick={() => resendOTP()}> 
                 {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                 </a>
            </div>

            <button className="w-1/4 text-white bg-gradient-to-r from-green-800 from-5% via-green-600 via-50% to-green-400 to-95% ... 
             hover:from-blue-500 hover:via-green-600 hover:to-green-400 hover:text-black hover:text-[17px] 
             text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...">
              <Image className="w-[16px] h-[16px] mx-2 ml-0" src={btnIcon} alt="unlock"/>
              Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

