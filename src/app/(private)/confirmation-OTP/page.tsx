import React from 'react'
import "./styles/confirmation-styles.css";
import Image from 'next/image'
import btnIcon from './assets/svg-margin.png'
import myImage from './assets/logo-inline.png'

export default function page() {
  return (
    <div className="login-h37">
  <div className="main-F4d">
    <div className="divyrrcjsrj5nopfm4duuc-p7j">
      <Image className="logo-inline-LLy" src={myImage} alt="Cloudcare"/>
      <div className="divt6gkcsf0bt4mlitxvdj-UCH">
        <div className="divt6gkcsf0bt4mlitxvdj-PKF">
          <div className="auto-group-9hz3-jtu">
            <div className="divyrrcjsrj5nopfm4duuc-V7P">
              <div className="bonnie-greenpng-15j">
              </div>
              <div className="heading-2-bonnie-green-VWh">Dr.Bonnie Green</div>
            </div>
            <div className="auto-group-pkuk-ywf">
              <div className="we-have-sent-2fa-otp-to-your-email-address-and-phone-please-enter-it-to-unlock-Vv1">
              We have sent 2FA OTP to your Email Address and phone, Please enter it
              <br/>
              to unlock    
              </div>
            </div>
          </div>
          <div className="form-zbs">
            <div className="divh2d-e1227081-Lfj">
              <div className="otp-G3b">OTP</div>
              <input type="text" className="input-BgM" placeholder="••••••••"/>
            </div>
            <button className="button-Qp1">
              <Image className="svg-margin-iph" src={btnIcon} alt="unlock"/>
              <div className="unlock-qPX">Unlock</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

