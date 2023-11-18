import React from 'react'
import "./styles/forgot-password-mobile.css"
import Image from 'next/image'
import myImage from './assets/logo-inline-r33.png'

export default function page() {
  return (
    <div className="forgot-using-phone-xZw">
  <div className="main-Jth">
    <div className="divyrrcjsrj5nopfm4duuc-UoB">
      <Image className="logo-inline-PfF" src={myImage} alt="Cloudcare"/>
      <div className="divt6gkcsf0bt4mlitxvdj-8Mw">
        <div className="divivhclggvmltygow0uba-ebB">
          <div className="forgot-your-password-zuw">Forgot your password?</div>
          <div className="dont-fret-just-type-in-your-phone-number-and-we-will-send-you-a-link-otp-to-reset-your-password-JQq">Don&#39;t fret! Just type in your phone number and we will send you a link/OTP to reset your password!</div>
          <div className="form-yms">
            <div className="divh2d-97c640a4-izM">
              <div className="your-phone-number-3mj">Your phone number</div>
              <input type="text"className="input-aWm" placeholder="+94123456789"/>
              <a href="" className="i-dont-have-phone-access-right-now-use-email-instead-Qkh">I don’t have phone access right now !, use Email instead </a>
            </div>
            <div className="divyrrcjsrj5nopfm4duuc-gy7">
              <input type="checkbox" className="input-cbs"/>
              <div className="i-accept-the-terms-and-conditions-ieu">
                <span className="i-accept-the-terms-and-conditions-ieu-sub-0">I accept the </span>
                <span><a href=""className="i-accept-the-terms-and-conditions-ieu-sub-1">Terms and Conditions</a></span>
              </div>
            </div>
            <button className="button-rHF">Reset password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

