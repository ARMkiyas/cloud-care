import Testclient from "./Testclient";
import { apiServer } from "@/utils/TrpcServer";


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
    <div className="h-screen">
  
      <div className="text-center pt-3 text-4xl text-emerald-500 font-extrabold">cloud care</div>
      <div className="absolute top-1/2 bottom-1/2 w-full text-center  text-lg font-semibold ">
        <div>{ data.greeting}</div>
        <Testclient />
      </div>
    </div>
  );
}
