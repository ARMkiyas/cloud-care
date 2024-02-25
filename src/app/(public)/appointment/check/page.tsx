import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import "../book/BookPageStyles.css";
import AppointmentContactCard from "../../components/AppointmentContactCard";
import PubPageTopContainer from "../../components/PubPageTopContainer";

export default function page() {
  return (
    <div>
      <PubPageTopContainer
        title="Check Your Appointment"
        path={["Home", "Appointment", "Check Your Appointment"]}
      />
      <div className="mainContainer">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex flex-col grow max-md:max-w-full max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Appointment
              </div>
              <div className="max-w-[593px] text-blue-950 text-4xl font-bold leading-10 self-stretch mr-5 mt-4 max-md:max-w-full max-md:mr-2.5">
                Check Your Appointment To Visit
                <br />
                Our Doctor
              </div>
              <div className="self-stretch mt-6 text-base leading-6 text-neutral-400 max-md:max-w-full">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam
                <br />
                et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit
                clita duo justo magna
                <br />
                dolore erat amet
              </div>
              <AppointmentContactCard />
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-center self-stretch w-full px-10 py-12 rounded-lg bg-blue-50 grow max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="items-start self-stretch justify-center py-4 pl-3 pr-16 mt-5 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap max-md:max-w-full max-md:pr-5">
                Your Name{" "}
              </div>
              <div className="items-start self-stretch justify-center py-4 pl-3 pr-16 mt-6 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap max-md:max-w-full max-md:pr-5">
                Your Mobile Number
              </div>
              <div className="self-center justify-center mt-8 text-3xl font-bold leading-none text-black whitespace-nowrap">
                OR
              </div>
              <div className="items-start self-stretch justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap mt-7 max-md:max-w-full max-md:pr-5">
                Your Reference Number{" "}
              </div>
              <div className="items-center self-stretch justify-center px-16 py-4 mt-16 text-base font-medium leading-6 text-center text-white bg-blue-600 border border-blue-600 border-solid rounded-lg whitespace-nowrap mb-14 max-md:max-w-full max-md:my-10 max-md:px-5">
                Check Your Appointment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
