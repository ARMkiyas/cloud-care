"use client";
import React, { useState } from "react";

import "../appointment/book/page";
import "./DoctorPageStyles.css";
import { Pagination, TextInput, Menu, NavLink } from "@mantine/core";
import {
  IconSearch,
  IconFilter,
  IconGauge,
  IconFingerprint,
} from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";

export const dynamic = "force-dynamic";

export default function page() {
  const {
    "0": userdata,
    "1": { isLoading, error },
  } = useApiClient.manageStaff.GetPubDoctors.useSuspenseQuery({});
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (!userdata) return null;
  // Filter doctors based on search query
  const filteredDoctors = userdata?.data.filter((doctor) => {
    const { specialization, departments, name } = doctor;
    return (
      specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      departments.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  console.log("userdata", userdata);

  const doctorsPerPage = 8;
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = Math.min(
    startIndex + doctorsPerPage,
    filteredDoctors.length,
  );

  const renderDoctors = filteredDoctors.concat(
    userdata.data.filter((doctor) => !filteredDoctors.includes(doctor)),
  );
  const handleNavLinkClick = (label) => {
    // Update search query with the selected label value
    setSearchQuery(label);
  };

  return (
    <div>
      <div className="mainContainer1">
        <div className="containerMiddle">
          <div className="containerText1">Doctors</div>
          <div className="containerText2dev">
            <div className="text-base leading-6 text-white uppercase">Home</div>
            <div className="flex items-stretch justify-between gap-2 ">
              <div className="text-base leading-6 uppercase text-blue-50">
                /
              </div>
            </div>
            <div className="text-base leading-6 text-blue-600 uppercase">
              Doctors
            </div>
          </div>
        </div>
      </div>
      <div className="mainBodyContainer">
        <div className="max-w-[1320px] min-w-[1320px] items-center flex flex-col px-3 max-md:max-w-full">
          <div className="max-w-full items-center flex w-[600px] flex-col px-20 max-md:px-5">
            <div className="self-stretch mt-4 text-4xl font-bold leading-10 text-center text-blue-950 max-md:max-w-full max-md:mr-2">
              Our Experience Doctors
            </div>
            <TextInput
              radius="xl"
              className="w-full pt-8"
              placeholder="Search by any field"
              mb="md"
              leftSection={<IconSearch />}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              rightSection={
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <IconFilter size={23} style={{ strokeWidth: "2" }} />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <NavLink label="Departments" childrenOffset={28}>
                      <NavLink
                        label="OPD"
                        onClick={() => handleNavLinkClick("Outpatient")}
                      />
                      <NavLink
                        label="Dermatology"
                        onClick={() => handleNavLinkClick("Dermatology")}
                      />
                      <NavLink
                        label="Radiology"
                        onClick={() => handleNavLinkClick("Radiology")}
                      />
                      <NavLink
                        label="Internal Medicine"
                        onClick={() => handleNavLinkClick("Internal Medicine")}
                      />
                    </NavLink>
                    <NavLink label="Specialization" childrenOffset={28}>
                      <NavLink
                        label="General Practitioner"
                        onClick={() =>
                          handleNavLinkClick("General Practitioner")
                        }
                      />
                      <NavLink
                        label="Cardiologist"
                        onClick={() => handleNavLinkClick("Cardiologist")}
                      />
                      <NavLink
                        label="Neurologist"
                        onClick={() => handleNavLinkClick("Neurologist")}
                      />
                      <NavLink
                        label="Orthopedic Surgen"
                        onClick={() => handleNavLinkClick("Orthopedic Surgeon")}
                      />
                      <NavLink
                        label="Surgeon"
                        onClick={() => handleNavLinkClick("Surgeon")}
                      />
                    </NavLink>
                  </Menu.Dropdown>
                </Menu>
              }
            />
          </div>
          <div className="flex flex-wrap justify-center w-full space-x-5 place-items-center">
            {filteredDoctors.length > 0 ? (
              filteredDoctors
                .slice(startIndex, endIndex)
                .map((doctor, index) => (
                  <div
                    className="flex flex-col justify-center w-1/5 mt-5"
                    key={index}
                  >
                    <div className="flex flex-col items-stretch self-stretch rounded-lg grow max-md:mt-6">
                      <img
                        src={doctor.image}
                        height={200}
                        alt={doctor.name}
                        className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                      />
                      <div className="flex flex-col items-center px-20 py-4 max-w-fit bg-blue-50 max-md:px-5">
                        <div className="text-xl font-bold leading-6 text-center text-blue-950 whitespace-nowrap">
                          {doctor.name}
                        </div>
                        <div className="mt-2 text-base leading-6 text-center text-blue-600 whitespace-nowrap">
                          {doctor.departments}
                        </div>
                        <div className="mt-1 text-base leading-6 text-center text-blue-600 whitespace-nowrap">
                          {doctor.specialization}
                        </div>
                        <div className="mt-1 text-base leading-6 text-center text-blue-600 whitespace-nowrap">
                          {doctor.totalSchedules} Schedules
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-lg text-red-500">
                No doctors found matching the search query.
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start gap-3.5 mr-2.5 mt-9 self-end">
          <Pagination
            total={Math.ceil(filteredDoctors.length / doctorsPerPage)}
            size="sm"
            color="#1b2c51"
            onChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}
