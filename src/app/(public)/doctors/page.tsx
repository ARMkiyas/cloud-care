import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import BookPageStyles from "../../appoinment/book/BookPageStyles";

export default function page() {
  return (
    <div>
      <div className="mainContainer1">
        <div className="containerMiddle">
          <div className="containerText1">
            Doctors
          </div>
          <div className="containerText2dev">
            <div className="text-white text-base leading-6 uppercase">Home</div>
            <div className="items-stretch flex justify-between gap-2 pl-2">
              <div className="text-blue-50 text-base leading-6 uppercase">
                /
              </div>
            </div>
            <div className="text-blue-600 text-base leading-6 uppercase">
              Doctors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
