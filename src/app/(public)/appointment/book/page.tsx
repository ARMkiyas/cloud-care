import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import "./BookPageStyles.css";



export default function page() {
  return (
    <div className="containerFluid">
      <div className="containerMiddle">
        <div className="containerText1">
          Book an Appointment
        </div>
        <div className="containerText2dev">
          <div className="containerText1Inner">Home</div>
          <div className="text-blue-50 text-base leading-6 uppercase">/</div>
          <div className="text-white text-base leading-6 uppercase">Appointment</div>
          <div className="text-blue-50 text-base leading-6 uppercase">/</div>
          <div className="text-blue-600 text-base leading-6 uppercase">Book An appointment</div>
        </div>
      </div>
  </div>
  
  );
}
