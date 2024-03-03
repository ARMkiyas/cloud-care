import { IconMailOpenedFilled, IconPhoneFilled } from "@tabler/icons-react";

export default function AppointmentContactCard() {
  return (
    <>
      <div className="self-stretch py-12 pl-12 pr-20 mt-6 rounded-lg bg-blue-50 max-md:max-w-full max-md:px-5">
        <div className="flex gap-3 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
            <div className="flex items-center justify-center p-4 text-base font-black leading-4 text-blue-600 bg-white rounded-full whitespace-nowrap aspect-square w-fit max-md:mt-10">
              <IconPhoneFilled size={24} strokeWidth={2} />
            </div>
          </div>
          <div className="flex flex-col items-stretch ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch grow max-md:mt-10">
              <div className="text-base leading-6 text-neutral-400">
                Call Us Now
              </div>
              <div className="mt-2 text-xl font-bold leading-6 text-blue-950 whitespace-nowrap">
                +942 345 6789
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch py-12 pl-12 pr-20 mt-6 rounded-lg bg-blue-50 max-md:max-w-full max-md:px-5">
        <div className="flex gap-3 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
            <div className="flex items-center justify-center p-4 text-base font-black leading-4 text-blue-600 bg-white rounded-full whitespace-nowrap aspect-square w-fit max-md:mt-10">
              <IconMailOpenedFilled size={24} />
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[76%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch grow max-md:mt-10">
              <div className="text-base leading-6 text-neutral-400">
                Mail Us Now
              </div>
              <div className="mt-2 text-xl font-bold leading-6 text-blue-950 whitespace-nowrap">
                info@example.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
