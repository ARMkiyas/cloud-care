// this page is for home page
"use client";

import Testclient from "./Testclient";

import "./_assets/css/styles.css";

import { Button } from "@mantine/core";
import { Pagination } from "@mantine/core";

import AppointmentBookingForm from "@/components/Appointment/AppointmentBookingForm";
import PubPageTopContainer from "./components/PubPageTopContainer";
import AppointmentContactCard from "./components/AppointmentContactCard";
import { useApiClient } from "@/utils/trpc/Trpc";
import Link from "next/link";

// This function is used to call the API server

export default async function Home() {
  const { data, isLoading, error } =
    useApiClient.manageStaff.GetPubDoctors.useQuery({
      limit: 3,
    });

  return (
    <div className="all">
      <div className="flex flex-col items-stretch justify-center w-full bg-blue-600 max-md:max-w-full">
        <div className="flex-wrap content-center w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <div className="max-w-[1920px] items-stretch flex flex-col my-auto px-9 py-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
                <div className="text-white text-6xl font-black leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                  Good Health Is The Root Of All
                  <br />
                  Heppiness
                </div>
                <div className="flex flex-wrap items-stretch content-start justify-between gap-5 px-3 pt-6 mt-6 max-md:max-w-full">
                  <div className="justify-center flex grow basis-[0%] flex-col pl-10 pr-50 items-start max-md:px-5 hbox">
                    <div className="text-3xl font-bold leading-10 text-white">
                      123
                    </div>
                    <div className="mt-1 text-base leading-6 text-blue-50 whitespace-nowrap">
                      Expert Doctors
                    </div>
                  </div>
                  <div className="justify-center flex grow basis-[0%] flex-col pl-6 pr-20 items-start max-md:px-5 hbox hb">
                    <div className="text-3xl font-bold leading-10 text-white whitespace-nowrap">
                      1234
                    </div>
                    <div className="mt-1 text-base leading-6 text-blue-50 whitespace-nowrap">
                      Medical Stuff
                    </div>
                  </div>
                  <div className="justify-center flex grow basis-[0%] flex-col pl-6 pr-20 items-start max-md:px-5 hbox">
                    <div className="text-3xl font-bold leading-10 text-white whitespace-nowrap">
                      12345
                    </div>
                    <div className="mt-1 text-base leading-6 text-blue-50 whitespace-nowrap">
                      Total Patients
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col items-stretch self-stretch justify-center max-md:max-w-full">
                <div className="flex-col overflow-hidden relative flex min-h-[960px] w-full items-center pt-12 pb-8 px-16 max-md:max-w-full max-md:px-5">
                  <img
                    loading="lazy"
                    srcSet="/img/home_page/doc1.jpg"
                    className="absolute inset-0 object-cover object-center w-full h-full"
                  />
                  <div className="relative flex w-[392px] max-w-full flex-col items-stretch mt-96 max-md:mt-10">
                    <div className="text-white text-7xl font-black leading-[96px] max-md:text-4xl">
                      CloudCare
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="self-center max-w-full pt-12 mt-20 max-md:mt-10 max-md:pl-5">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <div className="flex flex-col items-end max-md:max-w-full max-md:mt-10">
                <div className="doc3">
                  <img
                    loading="lazy"
                    srcSet="/img/home_page/doc3.jpg"
                    className="aspect-square object-contain object-center w-[459px] overflow-hidden max-w-full"
                  />
                </div>

                <div className="doc2">
                  <img
                    loading="lazy"
                    srcSet="/img/home_page/doc2.jpg"
                    className="aspect-square object-contain object-center w-[306px] overflow-hidden max-w-full self-start"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div
                className="flex flex-col max-md:max-w-full max-md:mt-10"
                id="aboutpage"
              >
                <div className="text-neutral-400 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                  About Us
                </div>
                <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-blue-950 max-md:max-w-full">
                  Why You Should Trust Us? Get
                  <br />
                  Know About Us!
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
                <div className="self-stretch mt-4 text-base leading-6 text-neutral-400 max-md:max-w-full">
                  Stet no et lorem dolor et diam, amet duo ut dolore vero eos.
                  No stet est diam
                  <br />
                  rebum amet diam ipsum. Clita clita labore, dolor duo nonumy
                  clita sit at, sed sit
                  <br />
                  sanctus dolor eos.
                </div>
                <div className="flex items-center self-stretch justify-between gap-4 pr-20 mt-6 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="my-auto text-base leading-4 text-blue-600 whitespace-nowrap">
                    <img loading="lazy" srcSet="/img/home_page/sym/rig.jpg" />
                  </div>
                  <div className="self-stretch text-base leading-6 text-neutral-400 grow whitespace-nowrap">
                    Quality health care
                  </div>
                </div>
                <div className="flex items-center self-stretch justify-between gap-4 pr-20 mt-4 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="my-auto text-base leading-4 text-blue-600 whitespace-nowrap">
                    <img loading="lazy" srcSet="/img/home_page/sym/rig.jpg" />
                  </div>
                  <div className="self-stretch text-base leading-6 text-neutral-400 grow whitespace-nowrap">
                    Only Qualified Doctors
                  </div>
                </div>
                <div className="flex items-center self-stretch justify-between gap-4 pr-20 mt-4 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="my-auto text-base leading-4 text-blue-600 whitespace-nowrap">
                    <img loading="lazy" srcSet="/img/home_page/sym/rig.jpg" />
                  </div>
                  <div className="self-stretch text-base leading-6 text-neutral-400 grow whitespace-nowrap">
                    Medical Research Professionals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full service">
        <div className="max-w-full items-center self-center flex w-[1296px] flex-col mt-20 px-3 max-md:mt-10">
          <div className="max-w-full items-center flex w-[600px] flex-col justify-center px-16 max-md:px-5">
            <div className="flex w-[392px] max-w-full flex-col items-center">
              <div className="text-neutral-400 text-center text-base leading-6 whitespace-nowrap justify-center items-stretch border px-6 py-1.5 rounded-[800px] border-solid border-blue-200 max-md:px-5">
                Services
              </div>
              <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-center text-blue-950 whitespace-nowrap">
                Health Care Solutions
              </div>
            </div>
          </div>
          <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
            <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-5 rounded-[32.5px] max-md:pr-5">
                    <div className="heart">
                      <div className="items-center justify-center ">
                        <img
                          loading="lazy"
                          srcSet="/img/home_page/sym/heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Cardiology
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>
                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <div className="items-center justify-center ">
                        <img
                          loading="lazy"
                          srcSet="/img/home_page/sym/plus.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-5 rounded-[32.5px]">
                    <div className="pu">
                      <div className="items-center justify-center">
                        <img
                          loading="lazy"
                          srcSet="/img/home_page/sym/pu.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Pulmonary
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>
                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <div className="items-center justify-center">
                        <img
                          loading="lazy"
                          srcSet="/img/home_page/sym/plus.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-5 rounded-[32.5px]">
                    <div className="brai">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/brai.svg"
                      />
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Neurology
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>

                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/plus.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-5 rounded-[32.5px] max-md:pr-5">
                    <div className="weel">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/weel.svg"
                      />
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Orthopedics
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>
                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/plus.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-6 rounded-[32.5px] max-md:px-5">
                    <div className="tee">
                      <img loading="lazy" srcSet="/img/home_page/sym/tee.svg" />
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Dental Surgery
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>
                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/plus.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-start self-stretch w-full py-12 pl-12 pr-16 rounded-lg bg-blue-50 grow max-md:mt-6 max-md:px-5">
                  <div className="text-blue-600 text-2xl font-black leading-6 whitespace-nowrap justify-center items-center bg-white aspect-square h-[65px] px-5 rounded-[32.5px]">
                    <div className="lab">
                      <img loading="lazy" srcSet="/img/home_page/sym/lab.svg" />
                    </div>
                  </div>
                  <div className="self-stretch mt-6 text-2xl font-bold leading-7 text-blue-950">
                    Laboratory
                  </div>
                  <div className="self-stretch mt-4 text-base leading-6 text-neutral-400">
                    Erat ipsum justo amet duo et elitr dolor,
                    <br />
                    est duo duo eos lorem sed diam stet
                    <br />
                    diam sed stet.
                  </div>
                  <div className="text-blue-600 text-center text-base font-black leading-4 whitespace-nowrap justify-center items-center bg-white aspect-square h-10 mt-6 px-3.5 rounded-[40px]">
                    <div className="plus">
                      <img
                        loading="lazy"
                        srcSet="/img/home_page/sym/plus.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="flex flex-col items-stretch justify-center w-full mt-24 bg-blue-600 max-md:max-w-full max-md:mt-10">
          <div className="ff">
            <div className="flex-wrap w-full max-md:max-w-full max-md:pl-5">
              <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[58%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
                    <div className="text-blue-50 text-base leading-6 whitespace-nowrap items-stretch border justify-center px-6 py-1.5 rounded-[800px] border-solid border-blue-200 self-start max-md:px-5">
                      Features
                    </div>
                    <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-white max-md:max-w-full">
                      Why Choose Us
                    </div>
                    <div className="self-stretch mt-6 text-base leading-6 text-white max-md:max-w-full">
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                      sit. Aliqu diam amet
                      <br />
                      diam et eos. Clita erat ipsum et lorem et sit, sed stet
                      lorem sit clita duo justo erat
                      <br />
                      amet
                    </div>
                    <div className="flex items-stretch self-stretch justify-between gap-5 mt-8 max-md:max-w-full max-md:flex-wrap">
                      <div className="flex items-start justify-between gap-5">
                        <div className="items-stretch justify-center px-5 py-5 text-base font-black leading-4 text-blue-600 bg-blue-50 grow rounded-3xl max-md:pl-5">
                          <img
                            loading="lazy"
                            srcSet="/img/home_page/sym/dd.svg"
                          />
                        </div>
                        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                          <div className="text-base leading-6 text-white">
                            Experience
                          </div>
                          <div className="mt-2 text-xl font-bold leading-6 text-white">
                            Doctors
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-5">
                        <div className="items-stretch justify-center p-5 text-base font-black leading-4 text-blue-600 bg-blue-50 grow rounded-3xl">
                          <img
                            loading="lazy"
                            srcSet="/img/home_page/sym/qq.svg"
                          />
                        </div>
                        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                          <div className="text-base leading-6 text-white">
                            Quality
                          </div>
                          <div className="mt-2 text-xl font-bold leading-6 text-white">
                            Services
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-stretch self-stretch justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap">
                      <div className="flex items-start justify-between gap-5">
                        <div className="items-stretch justify-center p-5 text-base font-black leading-4 text-blue-600 bg-blue-50 rounded-3xl">
                          <img
                            loading="lazy"
                            srcSet="/img/home_page/sym/pp.svg"
                          />
                        </div>
                        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                          <div className="text-base leading-6 text-white">
                            Positive
                          </div>
                          <div className="mt-2 text-xl font-bold leading-6 text-white">
                            Consultation
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-5">
                        <div className="items-stretch justify-center p-5 text-base font-black leading-4 text-blue-600 bg-blue-50 grow rounded-3xl">
                          <img
                            loading="lazy"
                            srcSet="/img/home_page/sym/24.svg"
                          />
                        </div>
                        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                          <div className="text-base leading-6 text-white">
                            24 Hours
                          </div>
                          <div className="mt-2 text-xl font-bold leading-6 text-white">
                            Support
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-stretch w-[62%] ml-5 max-md:w-full max-md:ml-0">
                  <img
                    loading="lazy"
                    srcSet="/img/home_page/doc10.jpg"
                    className="aspect-[1.73] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="mainBodyContainer">
          <div className="max-w-[1320px] items-center flex flex-col px-3 max-md:max-w-full">
            <div className="max-w-full items-center flex w-[600px] flex-col px-20 max-md:px-5">
              <div className="text-neutral-400 text-center text-base leading-6 whitespace-nowrap justify-center items-stretch border px-6 py-1.5 rounded-[800px] border-solid border-blue-200 max-md:px-5">
                Doctors
              </div>
              <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-center text-blue-950 max-md:max-w-full max-md:mr-2">
                Our Experience Doctors
              </div>
            </div>
            <div className="self-stretch mt-12 max-md:max-w-full max-md:mt-10">
              <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
                {data?.data.map((doctor, index) => (
                  <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
                    <div className="flex flex-col items-stretch self-stretch rounded-lg grow max-md:mt-6">
                      <img
                        loading="lazy"
                        src={doctor.image}
                        height={200}
                        className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                      />
                      <div className="flex flex-col items-center px-20 py-6 bg-blue-50 max-md:px-5">
                        <div className="text-xl font-bold leading-6 text-center text-blue-950 whitespace-nowrap">
                          {doctor.name}
                        </div>
                        <div className="mt-2 text-base leading-6 text-center text-blue-600 whitespace-nowrap">
                          {doctor.departments}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button
            size="md"
            variant="filled"
            radius="xl"
            component={Link}
            href={"/doctors"}
          >
            See More
          </Button>
        </div>
      </div>

      <div className="appointment">
        <div className="gap-5 mainContainer">
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
    </div>
  );
}
