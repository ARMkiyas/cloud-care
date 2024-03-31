import * as React from "react";
import { IconMapPin,IconPhone,IconMail } from "@tabler/icons-react";

export default function MyComponent(props) {
  return (
    <div className="bg-white flex flex-col">
   
   
   <div className="flex-col items-center overflow-hidden self-stretch relative flex min-h-[309px] w-full justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
  <img
    loading="lazy"
    src="\img\publicPagesIMG\bgimg.jpg"
    className="absolute h-full w-full object-cover object-center inset-0"
    alt="Contact Us"
  />
  <div className="relative max-w-[1320px] flex w-full flex-col pl-3 pr-20 py-12 items-start max-md:max-w-full max-md:pr-5">
    <div className="text-white text-6xl font-black leading-[76.8px] whitespace-nowrap max-md:text-4xl">
      Contact Us
    </div>
    <div className="flex items-stretch gap-2 mt-4">
      <div className="text-white text-base leading-6 uppercase">Home</div>
      <div className="text-blue-50 text-base leading-6 uppercase">/</div>
      <div className="text-blue-600 text-base leading-6 uppercase">
        Contact
      </div>
    </div>
  </div>
</div>
<div className="self-center w-[1272px] max-w-full mt-24 px-5 max-md:mt-10">
  <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
    <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
      <div className="self-stretch bg-blue-50 grow w-full pl-12 pr-20 py-12 rounded-lg max-md:mt-6 max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
          <div className="text-blue-600 text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square w-full h-[55px] my-auto px-5 rounded-3xl max-md:mt-10 flex items-center" style={{marginTop: '10px'}}>
  <IconMapPin style={{ fontSize: '2rem' }}/>
</div>
          </div>
          <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch flex flex-col my-auto max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6">
                Address
              </div>
              <div className="text-blue-950 text-xl font-bold leading-6 mt-2">
                123 Street, ABC,
                <br />
                Sri Lanka
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
      <div className="self-stretch bg-blue-50 grow w-full pl-12 pr-20 py-12 rounded-lg max-md:mt-6 max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
            <div className="text-blue-600 text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square w-full h-[55px] my-auto px-5 rounded-3xl max-md:mt-10 flex items-center">
              <IconPhone style={{ fontSize: '2rem' }}/>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[71%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch flex flex-col my-auto max-md:mt-10">
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
    </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="self-stretch bg-blue-50 grow w-full pl-12 pr-20 py-12 rounded-lg max-md:mt-6 max-md:px-5">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
            <div className="text-blue-600 text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square w-full h-[55px] my-auto px-5 rounded-3xl max-md:mt-10 flex items-center">
              <IconMail style={{ fontSize: '2rem' }}/>
            </div>
          </div>
                <div className="flex flex-col items-stretch w-[77%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-stretch flex flex-col my-auto max-md:mt-10">
                    <div className="text-neutral-400 text-base leading-6">
                      Mail Us Now
                    </div>
                    <div className="text-blue-950 text-xl font-bold leading-6 whitespace-nowrap mt-2">
                      info@cloudcare.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center w-[1284px] max-w-full mt-6">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="self-stretch bg-blue-50 flex grow flex-col w-full p-12 rounded-lg max-md:max-w-full max-md:mt-9 max-md:px-5">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Contact Us
              </div>
              <div className="text-blue-950 text-4xl font-bold leading-10 self-stretch mt-4 max-md:max-w-full">
                Have Any Query? Please
                <br />
                Contact Us!
              </div>
              <div className="text-neutral-400 text-base leading-6 self-stretch mt-6 max-md:max-w-full">
              If you have any questions or need assistance, please don't hesitate to contact us. We're here to help!{" "}
              </div>{" "}
              <div className="self-stretch flex items-stretch justify-between gap-4 mt-6 max-md:max-w-full max-md:flex-wrap">
                <div className="items-stretch flex grow basis-[0%] flex-col justify-center p-px">
                  <div className="text-neutral-400 text-base leading-6 whitespace-nowrap border bg-white justify-center pl-3 pr-16 py-4 rounded-lg border-solid border-blue-200 items-start max-md:pr-5">
                    Your Name
                  </div>
                </div>{" "}
                <div className="items-stretch flex grow basis-[0%] flex-col justify-center p-px">
                  <div className="text-neutral-400 text-base leading-6 whitespace-nowrap border bg-white justify-center pl-3 pr-16 py-4 rounded-lg border-solid border-blue-200 items-start max-md:pr-5">
                    Your Email
                  </div>
                </div>
              </div>{" "}
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap self-stretch border bg-white justify-center mt-4 pl-3 pr-16 py-4 rounded-lg border-solid border-blue-200 items-start max-md:max-w-full max-md:pr-5">
                Subject
              </div>{" "}
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap self-stretch border bg-white mt-5 pl-3 pr-16 pt-4 pb-14 rounded-lg border-solid border-blue-200 items-start max-md:max-w-full max-md:pr-5">
                Message
              </div>{" "}
              <div className="text-white text-center text-base font-medium leading-6 whitespace-nowrap items-center self-stretch border bg-blue-600 justify-center mt-4 px-16 py-4 rounded-lg border-solid border-blue-600 max-md:max-w-full max-md:px-5">
                Send Message
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <img
              loading="lazy"
              srcSet="img/contact3.png"
              className="aspect-[0.91] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-9"
            />
          </div>
        </div>
      </div>
    
    </div>
  );
}


