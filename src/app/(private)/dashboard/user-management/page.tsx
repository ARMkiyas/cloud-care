"use client";
import React from 'react'
import TableSort from '@/utils/lib/TableSort/TableSort';
import { useApiClient } from '@/utils/trpc/Trpc';

export default function page() {
  const {
    data:userdata,
    isError,
    isLoading,
  }=useApiClient.manageUsers.getUsers.useQuery({});
  console.log(userdata);
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  


  return (
    <div><TableSort userdata={userdata}/></div>
  )
}

