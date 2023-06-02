// make this as client component
"use client";

import { apiclient } from "@/utils/Trpc";

//this is test client componet for testing data fetching

export default function Testclient() {
  // Call the API server's hello function, passing in the text "From Client"
  const { data, isLoading ,isFetching } = apiclient.example.hello.useQuery({
    text: "From Client",
  });

  return (
    <>

    {isFetching ? <div> loading... </div> : <div>{data?.greeting}</div>}
    
    </>
  );
}
