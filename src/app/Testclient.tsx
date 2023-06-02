"use client";

import { apiclient } from "@/utils/Trpc";
import { useEffect } from "react";

//this is test client componet for testing data fetching

export default function Testclient() {
  const { data, isLoading, isFetching } = apiclient.example.hello.useQuery({
    text: "From Client",
  });  

  return <>{isFetching ? <div> loading... </div> : <div>{data?.greeting}</div>}</>;
}
