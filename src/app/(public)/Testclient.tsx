// make this as client component
"use client";

import { apiclient } from "@/utils/trpc/Trpc";

//this is test client componet for testing data fetching

export default function Testclient() {
  // Call the API server's hello function, passing in the text "From Client"
  const { data, isFetching } = apiclient.example.hello.useQuery({
    text: "From Client",
  });

  return (
    <>
      <div className="">
        {isFetching ? <div> loading... </div> : <div>{data?.greeting}</div>}
      </div>
    </>
  );
}
