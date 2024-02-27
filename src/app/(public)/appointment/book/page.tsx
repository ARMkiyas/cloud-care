import React from "react";
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import { IconPhoneFilled, IconMailOpenedFilled } from "@tabler/icons-react";
import "./BookPageStyles.css";
import AppointmentContactCard from "../../components/AppointmentContactCard";
import PubPageTopContainer from "../../components/PubPageTopContainer";
import AppointmentBookingForm from "@/components/Appointment/AppointmentBookingForm";

export default function page() {
  return (
    <div>
      <PubPageTopContainer
        title="Book an Appointment"
        path={["Home", "Appointment", "Book An appointment"]}
      />
      <div className="mainContainer">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex flex-col grow max-md:max-w-full max-md:mt-10">
              <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                Appointment
              </div>
              <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-blue-950 max-md:max-w-full">
                Make An Appointment To Visit
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
          <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0 mr-7">
            <div className="flex flex-col items-stretch self-stretch w-full px-6 rounded-lg py-7 bg-blue-50 grow max-md:max-w-full max-md:mt-10 max-md:px-5">
              <AppointmentBookingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
