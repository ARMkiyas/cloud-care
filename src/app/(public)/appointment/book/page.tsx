import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import "./BookPageStyles.css";




export default function page() {
  return (
    
      <><div className="containerFluid">
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
    </div><div className="mainContainer">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Appointment
              </div>
              <div className="text-blue-950 text-4xl font-bold leading-10 self-stretch mt-4 max-md:max-w-full">
                Make An Appointment To Visit
                <br />
                Our Doctor
              </div>
              <div className="text-neutral-400 text-base leading-6 self-stretch mt-6 max-md:max-w-full">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam
                <br />
                et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit
                clita duo justo magna
                <br />
                dolore erat amet
              </div>
              <div className="bg-blue-50 self-stretch mt-6 pl-12 pr-20 py-12 rounded-lg max-md:max-w-full max-md:px-5">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
                    <div className="text-blue-600 text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square w-full h-[55px] px-5 rounded-3xl max-md:mt-10">
                       
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex grow flex-col max-md:mt-10">
                      <div className="text-neutral-400 text-base leading-6">
                        Call Us Now
                      </div>
                      <div className="text-blue-950 text-xl font-bold leading-6 whitespace-nowrap mt-2">
                        +942 345 6789
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 self-stretch mt-6 pl-12 pr-20 py-12 rounded-lg max-md:max-w-full max-md:px-5">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[24%] max-md:w-full max-md:ml-0">
                    <div className="text-blue-600 text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square w-full h-[55px] px-5 rounded-3xl max-md:mt-10">
                      
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[76%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex grow flex-col max-md:mt-10">
                      <div className="text-neutral-400 text-base leading-6">
                        Mail Us Now
                      </div>
                      <div className="text-blue-950 text-xl font-bold leading-6 whitespace-nowrap mt-2">
                        info@example.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch self-stretch bg-blue-50 flex grow flex-col w-full px-12 py-10 rounded-lg max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="mainContainer2">
                <div className="flex items-stretch justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-gray-500 text-base whitespace-nowrap bg-white grow justify-center pl-3 pr-16 py-4 rounded-lg items-start max-md:pr-5">
                    Your Name
                  </div>
                  <div className="text-gray-500 text-base whitespace-nowrap bg-white grow justify-center pl-3 pr-16 py-4 rounded-lg items-start max-md:pr-5">
                    Your Email
                  </div>
                </div>
                <div className="flex justify-between gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                  <div className="text-gray-500 text-base whitespace-nowrap bg-white grow justify-center pl-3 pr-16 py-4 rounded-lg items-start max-md:pr-5">
                    Your Mobile
                  </div>
                  <div className="text-gray-500 text-base whitespace-nowrap items-stretch bg-white grow justify-center pl-3 pr-9 py-4 rounded-lg max-md:pr-5">
                    Your National ID / passport
                  </div>
                </div>
                <div className="flex items-stretch justify-between gap-3.5 mt-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="items-stretch bg-white flex justify-between gap-3 pl-3 pr-1 py-4 rounded-lg">
                    <div className="text-neutral-400 text-base leading-6 grow whitespace-nowrap">
                      Choose Specialist{" "}
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/39683df6a65910ba003b82c653c98f12072fec98414f730b0a9e758e1e5ea15b?"
                      className="aspect-[5] object-contain object-center w-[90px] overflow-hidden self-center shrink-0 max-w-full my-auto" />
                  </div>
                  <div className="items-stretch bg-white flex justify-between gap-3 px-3 py-4 rounded-lg">
                    <div className="text-neutral-400 text-base leading-6 grow whitespace-nowrap">
                      Choose Doctor
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2600201aa796a52778a07a56eecfd1a58e86da163389b2efb70c90e15f397e5e?"
                      className="aspect-[8.58] object-contain object-center w-[103px] overflow-hidden self-center shrink-0 max-w-full my-auto" />
                  </div>
                </div>
                <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-gray-500 text-base whitespace-nowrap bg-white grow justify-center pl-3 pr-16 py-4 rounded-lg items-start max-md:pr-5">
                    Choose Date
                  </div>
                  <div className="text-gray-500 text-base whitespace-nowrap bg-white grow justify-center pl-3 pr-16 py-4 rounded-lg items-start max-md:pr-5">
                    Choose Date
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-base leading-6 whitespace-nowrap bg-white mt-4 pl-3 pr-16 pt-1.5 pb-20 rounded-lg items-start max-md:max-w-full max-md:pr-5">
                Describe your problem
              </div>
              <div className="text-white text-center text-base font-medium leading-6 whitespace-nowrap items-center border bg-blue-600 justify-center mt-8 px-16 py-5 rounded-lg border-solid border-blue-600 max-md:max-w-full max-md:px-5">
                Book Appointment
              </div>
            </div>
          </div>
        </div>
      </div></>
  );
}
