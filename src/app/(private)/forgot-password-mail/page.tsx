import React from 'react'
import "./styles/forgot-using-mail.css";
import Image from 'next/image'
import myImage from './assets/logo-inline-qRb.png'

export default function page() {
  return (

    <div className="forgot-using-mail-zEM">
  <div className="main-wfP">
    <div className="divyrrcjsrj5nopfm4duuc-ucD">
      <Image className="logo-inline-2Rw" src={myImage} alt="Cloudcare"/>
      <div className="divt6gkcsf0bt4mlitxvdj-Zgm">
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
