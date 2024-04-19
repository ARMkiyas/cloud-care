import * as React from "react";
import { IconMapPinFilled, IconPhoneFilled, IconMailOpenedFilled } from "@tabler/icons-react";
import { TextInput, Button, Textarea } from "@mantine/core";

export default function MyComponent(props) {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex-col items-center overflow-hidden self-stretch relative flex min-h-[309px] w-full justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <img
          loading="lazy"
          src="/img/publicPagesIMG/bgimg.jpg"
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

      <div className="self-center w-[1284px] max-w-full mt-24 px-3 max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-row justify-between w-full">
            {[
              { icon: <IconMapPinFilled />, label: "Address", detail: "123 Street, ABC\nSri Lanka" },
              { icon: <IconPhoneFilled />, label: "Call Us Now", detail: "+942 345 6789" },
              { icon: <IconMailOpenedFilled />, label: "Mail Us Now", detail: "info@cloudcare.com" }
            ].map((info, index) => (
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full" style={index === 0 ? { marginLeft: '-10px' } : index === 2 ? { marginRight: '-10px' } : {}}>
                <div className="self-stretch bg-blue-50 grow w-full pl-12 pr-20 py-8 rounded-lg">
                  <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                    <div className="flex flex-col items-stretch w-[29%] max-md:w-full max-md:ml-0">
                      <div className="text-blue-600 justify-center items-center bg-white aspect-square w-[50px] h-[50px] my-auto rounded-full flex items-center" style={{ fontSize: '2.5rem' }}>
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch w-[71%] ml-2 max-md:w-full max-md:ml-0">
                      <div className="items-stretch flex flex-col my-auto max-md:mt-10">
                        <div className="text-neutral-400 text-base leading-6">
                          {info.label}
                        </div>
                        <div className="text-blue-950 text-xl font-bold leading-6 mt-2">
                          {info.detail.split('\n').map((line, idx) => (
                            <span key={idx}>
                              {line}<br />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="self-center w-[1284px] max-w-full mt-4">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="self-stretch bg-blue-50 flex grow flex-col w-full p-12 rounded-lg max-md:max-w-full max-md:mt-9 max-md:px-5">
            <div 
  className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 border-solid border-blue-200 self-start max-md:px-5"
  style={{ borderRadius: '15px' }}
>
  Contact Us
</div>
              <div className="text-blue-950 text-4xl font-bold leading-10 self-stretch mt-4 max-md:max-w-full">
                Have Any Query? Please
                <br />
                Contact Us!
              </div>
              <div className="text-neutral-400 text-base leading-6 self-stretch mt-6 max-md:max-w-full">
                If you have any questions or need assistance, please don't hesitate to contact us. We're here to help!
              </div>
              <div className="self-stretch flex items-stretch justify-between gap-4 mt-6 max-md:max-w-full max-md:flex-wrap">
                <div className="items-stretch flex grow basis-[0%] flex-col justify-center p-px">
                  <TextInput
                    placeholder="Your Name"
                    style={{ width: "100%", height: '50px', fontSize: '3rem', borderRadius: '12px' }}
                  />
                </div>
                <div className="items-stretch flex grow basis-[0%] flex-col justify-center p-px">
                  <TextInput
                    type="email"
                    placeholder="Your Email"
                    style={{ width: "100%", height: '50px', fontSize: '3rem', borderRadius: '12px' }}
                  />
                </div>
              </div>
              <Textarea
                placeholder="Subject"
                style={{ width: "100%", height: '50px', fontSize: '1.2rem', borderRadius: '12px' }}
              />
              <Textarea
                placeholder="Message"
                rows={6}
                style={{ width: "100%", marginTop: "1rem", fontSize: '1.2rem', borderRadius: '12px' }}
              />
              <Button
  variant="gradient"
  fullWidth
  styles={{
    root: { // Targeting the root element of the button
      fontSize: '17px',
      padding: '7px 11px',
      borderRadius: '8px',
      marginTop: "1rem",
      background: '#3182ce', // Blue color, matching the icons
      borderColor: '#3182ce', // Ensure border color matches if there's a border
      height:'70px'
    }
  }}
>
  Send Message
</Button>

            </div>
          </div>
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
