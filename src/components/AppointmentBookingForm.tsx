import React from "react";

export default function AppointmentBookingForm() {
  return (
    <>
      <form action="">
        <div className="flex items-stretch justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
          <div className="items-start justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow max-md:pr-5">
            Your Name
          </div>
          <div className="items-start justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow max-md:pr-5">
            Your Email
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 mt-4 max-md:max-w-full max-md:flex-wrap">
          <div className="items-start justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow max-md:pr-5">
            Your Mobile
          </div>
          <div className="items-stretch justify-center py-4 pl-3 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow pr-9 max-md:pr-5">
            Your National ID / passport
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-3.5 mt-4 max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch justify-between gap-3 py-4 pl-3 pr-1 bg-white rounded-lg">
            <div className="text-base leading-6 text-neutral-400 grow whitespace-nowrap">
              Choose Specialist{" "}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/39683df6a65910ba003b82c653c98f12072fec98414f730b0a9e758e1e5ea15b?"
              className="aspect-[5] object-contain object-center w-[90px] overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
          <div className="flex items-stretch justify-between gap-3 px-3 py-4 bg-white rounded-lg">
            <div className="text-base leading-6 text-neutral-400 grow whitespace-nowrap">
              Choose Doctor
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2600201aa796a52778a07a56eecfd1a58e86da163389b2efb70c90e15f397e5e?"
              className="aspect-[8.58] object-contain object-center w-[103px] overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-4 mt-5 max-md:max-w-full max-md:flex-wrap">
          <div className="items-start justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow max-md:pr-5">
            Choose Date
          </div>
          <div className="items-start justify-center py-4 pl-3 pr-16 text-base text-gray-500 bg-white rounded-lg whitespace-nowrap grow max-md:pr-5">
            Choose Date
          </div>
        </div>
        <div className="text-gray-500 text-base leading-6 whitespace-nowrap bg-white mt-4 pl-3 pr-16 pt-1.5 pb-20 rounded-lg items-start max-md:max-w-full max-md:pr-5">
          Describe your problem
        </div>
        <div className="items-center justify-center px-16 py-5 mt-8 text-base font-medium leading-6 text-center text-white bg-blue-600 border border-blue-600 border-solid rounded-lg whitespace-nowrap max-md:max-w-full max-md:px-5">
          Book Appointment
        </div>
      </form>
    </>
  );
}
