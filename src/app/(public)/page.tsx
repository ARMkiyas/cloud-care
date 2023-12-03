// this page is for home page

import Testclient from "./Testclient";
import { apiServer } from "@/utils/TrpcServer";
import "./_assets/css/styles.css";


// This function is used to call the API server
const callapi = async () => {
  // Call the API server's hello function, passing in the text "From Server"
  const data = await apiServer.example.hello({ text: "From Server" });
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
      <div className="absolute w-full text-lg font-semibold text-center top-1/2 bottom-1/2 ">
        <div className="">{data.greeting}</div>
        <Testclient />
        
      </div>
    </div>
  );
}
