// this page is for home page

import Testclient from "./Testclient";
import { apiServer } from "@/utils/trpc/TrpcServer";
import "./_assets/css/styles.css";
import { getServerAuthSession } from "@/server/auth";

export const dynamic = "force-dynamic";

// This function is used to call the API server
const callapi = async () => {
  // Call the API server's hello function, passing in the text "From Server"
  const data = await apiServer.example.hello.query({
    text: "From server",
  });

  // Return the data that was returned from the server
  return data;
};

export default async function Home() {
  const data = await callapi();

  return (
    <div className="">
      <div className="pt-3 text-4xl font-extrabold text-center text-emerald-500">
        cloud care Home
      </div>
      <div className="w-full text-lg font-semibold text-center ">
        <div className="">{data.greeting}</div>
        <Testclient />
      </div>
    </div>
  );
}
