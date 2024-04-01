"use client";
import React,{useState} from "react";
import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import "../appointment/book/page";
import "./DoctorPageStyles.css";
import { Pagination,TextInput,Menu,NavLink} from '@mantine/core';
import { IconSearch,IconFilter, IconGauge, IconFingerprint } from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";


export default function page() {
  const{data:userdata,isLoading,error}=useApiClient.manageStaff.GetPubDoctors.useQuery({});
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  

  if (!userdata) return null;
  // Filter doctors based on search query
  const filteredDoctors = userdata?.data.filter(doctor => {
    const { specialization, departments, name } = doctor;
    return (
      specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      departments.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  console.log("userdata",userdata);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const doctorsPerPage = filteredDoctors.slice(startIndex, endIndex);

  const renderDoctors = filteredDoctors.concat(userdata.data.filter(doctor => !filteredDoctors.includes(doctor)));
  const handleNavLinkClick = (label) => {
    // Update search query with the selected label value
    setSearchQuery(label);
  };

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
        <div className="max-w-[1320px] min-w-[1320px] items-center flex flex-col px-3 max-md:max-w-full">
          <div className="max-w-full items-center flex w-[600px] flex-col px-20 max-md:px-5">
            <div className="text-blue-950 text-center text-4xl font-bold leading-10 self-stretch mt-4 max-md:max-w-full max-md:mr-2">
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
                <IconFilter size={23} style={{ strokeWidth: '2' }}/>
              </Menu.Target>
              <Menu.Dropdown>
                <NavLink label="Departments"
                 childrenOffset={28}>
                  <NavLink label="OPD" onClick={() => handleNavLinkClick("Outpatient")}/>
                  <NavLink label="Dermatology" onClick={() => handleNavLinkClick("Dermatology")}/>
                  <NavLink label="Radiology" onClick={() => handleNavLinkClick("Radiology")}/>
                  <NavLink label="Internal Medicine" onClick={() => handleNavLinkClick("Internal Medicine")}/>
                </NavLink>
                <NavLink label="Specialization"
                childrenOffset={28}>
                  <NavLink label="General Practitioner" onClick={() => handleNavLinkClick("General Practitioner")}/>
                  <NavLink label="Cardiologist" onClick={() => handleNavLinkClick("Cardiologist")}/>
                  <NavLink label="Neurologist" onClick={() => handleNavLinkClick("Neurologist")}/>
                  <NavLink label="Orthopedic Surgen" onClick={() => handleNavLinkClick("Orthopedic Surgeon")}/>
                  <NavLink label="Surgeon" onClick={() => handleNavLinkClick("Surgeon")}/>
                </NavLink>
              </Menu.Dropdown>
            </Menu>}
            />
          </div>
          <div className="flex space-x-5 flex-wrap justify-center place-items-center w-full" >
          {filteredDoctors.length > 0 ? (
              doctorsPerPage.map((doctor, index) => (
            <div className="flex flex-col w-1/5 justify-center mt-5" key={index}>
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                      src={doctor.image}
                      height={200}
                     alt={doctor.name}
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center max-w-fit bg-blue-50 flex flex-col px-20 py-4 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      {doctor.name}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      {doctor.departments}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-1">
                      {doctor.specialization}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-1">
                      {doctor.totalSchedules} Schedules
                    </div>
                  </div>
                </div>
              </div>
           
          ))
          ):(
            <div className="text-red-500 text-lg">
                No doctors found matching the search query.
              </div>
          )
        }
          </div>
        </div>
        <div className="flex items-start gap-3.5 mr-2.5 mt-9 self-end">
          
          <Pagination
            total={Math.ceil(filteredDoctors.length / 8)} // Total number of pages
            size="sm" // Size of pagination component (optional)
            color="#1b2c51" // Color of pagination component (optional)
          />
        </div>
      </div>
    </div>
  );
}
