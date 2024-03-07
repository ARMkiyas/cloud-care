import React from "react";
import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import "../appointment/book/page";
import "./DoctorPageStyles.css";


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
            <div className="items-stretch flex justify-between gap-2 ">
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
      <div className="mainBodyContainer">
        <div className="max-w-[1320px] items-center flex flex-col px-3 max-md:max-w-full">
          <div className="max-w-full items-center flex w-[600px] flex-col px-20 max-md:px-5">
            <div className="text-neutral-400 text-center text-base leading-6 whitespace-nowrap justify-center items-stretch border px-6 py-1.5 rounded-[800px] border-solid border-blue-200 max-md:px-5">
              Doctors
            </div>
            <div className="text-blue-950 text-center text-4xl font-bold leading-10 self-stretch mt-4 max-md:max-w-full max-md:mr-2">
              Our Experience Doctors
            </div>
          </div>
          <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-1.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-2.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-3.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-4.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch mt-6 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-2.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-3.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-4.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                    loading="lazy"
                    srcSet="/img/doctorPageIMG/team-1.jpg.png"
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      Doctor Name
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3.5 mr-2.5 mt-9 self-end">
          <div className="text-white text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border border-[color:var(--Gray-Gray-3,#DEE2E6)] bg-blue-900 self-stretch aspect-[0.9230769230769231] px-1.5 py-0.5 border-solid">
            1
          </div>
          <div className="text-black text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border self-stretch aspect-[0.9230769230769231] px-1.5 py-0.5 border-solid border-zinc-200">
            2
          </div>
          <div className="text-black text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border border-[color:var(--Gray-Gray-3,#DEE2E6)] self-stretch aspect-[0.9230769230769231] px-1.5 py-0.5 border-solid">
            3
          </div>
          <div className="text-black text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border border-[color:var(--Gray-Gray-3,#DEE2E6)] self-stretch aspect-[0.9230769230769231] px-1.5 py-0.5 border-solid">
            4
          </div>
          <div className="text-black text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border border-[color:var(--Gray-Gray-3,#DEE2E6)] self-stretch aspect-[0.9230769230769231] px-1.5 py-0.5 border-solid">
            5
          </div>
          <div className="w-[30px] h-[26px] flex-col justify-center items-center inline-flex">
            <div className="justify-start items-start gap-1 inline-flex">
              <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
              <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
              <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
            </div>
          </div>
          <div className="text-black text-center text-sm leading-5 whitespace-nowrap justify-center items-stretch rounded border border-[color:var(--Gray-Gray-3,#DEE2E6)] self-stretch aspect-[1.1153846153846154] px-1.5 py-0.5 border-solid">
            10
          </div>
        </div>
      </div>
    </div>
  );
}
