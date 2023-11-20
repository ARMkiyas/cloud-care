import React from 'react'

import Image from 'next/image'
import myImage from './assets/logo-inline-qRb.png'

export default function page() {
  return (

    <div className="flex flex-col">
  <div className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto items-center justify-center">
    <div className="divyrrcjsrj5nopfm4duuc-ucD">
      <Image className="mx-auto w-1/4 h-20 flex items-center my-10"
       src={myImage} alt="Cloudcare"/>
      <div className="bg-[#1F2937] grid grid-cols-5 w-1/2 container mx-auto rounded-lg">
        <div className="divivhclggvmltygow0uba-5v1">
           <div className="auto-group-jocw-p6u">
              <div className="forgot-your-password-AAm">Forgot your password?</div>
                <div className="dont-fret-just-type-in-your-email-and-we-will-send-you-a-link-to-reset-your-password-5Hj">
                  Don&#39;t fret! Just type in your email and we will send you a link to
                  <br/>
                   reset your password!
                </div>
            </div>
        <div className="form-y8D">
            <div className="divh2d-97c640a4-j7P">
               <div className="your-email-TJH">Your email</div>
                 <input type="text" className="input-NRF" placeholder="name@company.com"/>
                 <a href="" className="i-dont-have-email-access-right-now-use-phone-instead-Yyw">I don’t have Email access right now !, use phone instead </a>
            </div>
            <div className="divyrrcjsrj5nopfm4duuc-F7f">
               <input type="checkbox" className="input-mLu"/>
               <div className="i-accept-the-terms-and-conditions-fx5">
                  <span className="i-accept-the-terms-and-conditions-fx5-sub-0">I accept the </span>
                  <span><a href="" className="i-accept-the-terms-and-conditions-fx5-sub-1">Terms and Conditions</a></span>
               </div>
            </div>
            <button className="button-PFo">Reset password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
