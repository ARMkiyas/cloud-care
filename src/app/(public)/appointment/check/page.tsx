import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";




export default function page() {
  return (
    <div>
      <div className="flex-col items-center overflow-hidden self-stretch relative flex min-h-[309px] w-full justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <img
          loading="lazy"
          srcSet="..."
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative max-w-[1320px] flex w-full flex-col pl-3 pr-20 py-12 items-start max-md:max-w-full max-md:pr-5">
          <div className="max-w-[722px] text-white text-6xl font-black leading-[76.8px] max-md:max-w-full max-md:text-4xl">
            Check Your Appointment
          </div>
          <div className="flex items-stretch gap-0 mt-4">
            <div className="text-white text-base leading-6 uppercase">Home</div>
            <div className="items-stretch flex justify-between gap-2 pl-2">
              <div className="text-blue-50 text-base leading-6 uppercase">
                /
              </div>
              <div className="text-white text-base leading-6 uppercase">
                Appointment
              </div>
            </div>
            <div className="text-blue-50 text-base leading-6 uppercase">/</div>
            <div className="text-blue-600 text-base leading-6 uppercase">
              check appointment
            </div>
          </div>
        </div>
      </div>
      <div className="mainContainer">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Appointment
              </div>
              <div className="max-w-[593px] text-blue-950 text-4xl font-bold leading-10 self-stretch mr-5 mt-4 max-md:max-w-full max-md:mr-2.5">
                Check Your Appointment To Visit
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
            <div className="items-center self-stretch bg-blue-50 flex grow flex-col w-full px-10 py-12 rounded-lg max-md:max-w-full max-md:mt-10 max-md:px-5">
              <div className="text-gray-500 text-base whitespace-nowrap bg-white self-stretch justify-center mt-5 pl-3 pr-16 py-4 rounded-lg items-start max-md:max-w-full max-md:pr-5">
                Your Name{" "}
              </div>
              <div className="text-gray-500 text-base whitespace-nowrap bg-white self-stretch justify-center mt-6 pl-3 pr-16 py-4 rounded-lg items-start max-md:max-w-full max-md:pr-5">
                Your Mobile Number
              </div>
              <div className="justify-center text-black text-3xl font-bold leading-none self-center whitespace-nowrap mt-8">
                OR
              </div>
              <div className="text-gray-500 text-base whitespace-nowrap bg-white self-stretch justify-center mt-7 pl-3 pr-16 py-4 rounded-lg items-start max-md:max-w-full max-md:pr-5">
                Your Reference Number{" "}
              </div>
              <div className="text-white text-center text-base font-medium leading-6 whitespace-nowrap items-center border bg-blue-600 self-stretch justify-center mt-16 mb-14 px-16 py-4 rounded-lg border-solid border-blue-600 max-md:max-w-full max-md:my-10 max-md:px-5">
                Check Your Appointment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
