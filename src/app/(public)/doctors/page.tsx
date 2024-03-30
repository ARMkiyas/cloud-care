"use client";
import React,{useState} from "react";
import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import "../appointment/book/page";
import "./DoctorPageStyles.css";
import { Pagination,TextInput,Card, Image, Text, Badge, Button, Group} from '@mantine/core';
import { IconSearch } from "@tabler/icons-react";
import { useApiClient } from "@/utils/trpc/Trpc";


export default function page() {
  const{data:userdata,isLoading,error}=useApiClient.manageStaff.GetPubDoctors.useQuery({});
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const renderDoctors = filteredDoctors.concat(userdata.data.filter(doctor => !filteredDoctors.includes(doctor)));

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
            />
          </div>
          <div className="flex space-x-10 flex-wrap justify-center place-items-center " >
          {renderDoctors.map((doctor,index)=>(
            <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0 justify-center mt-5" key={index}>
                <div className="items-stretch self-stretch flex grow flex-col rounded-lg max-md:mt-6">
                  <img
                      src={doctor.image}
                      height={160}
                     alt={doctor.name}
                    className="aspect-[0.83] object-contain object-center w-full overflow-hidden"
                  />
                  <div className="items-center bg-blue-50 flex flex-col px-20 py-6 max-md:px-5">
                    <div className="text-blue-950 text-center text-xl font-bold leading-6 whitespace-nowrap">
                      {doctor.name}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Department: {doctor.departments}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Specialization: {doctor.specialization}
                    </div>
                    <div className="text-blue-600 text-center text-base leading-6 whitespace-nowrap mt-2">
                      Total Schedule: {doctor.totalSchedules}
                    </div>
                  </div>
                </div>
              </div>
           
          ))}
          </div>
        </div>
        <div className="flex items-start gap-3.5 mr-2.5 mt-9 self-end">
          <Pagination
            total={10} // Total number of pages
            size="sm" // Size of pagination component (optional)
            color="#1b2c51" // Color of pagination component (optional)
          />
        </div>
      </div>
    </div>
  );
}
