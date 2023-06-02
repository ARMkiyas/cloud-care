import Image from "next/image";
import Testclient from "./Testclient";
import { apiServer } from "@/utils/TrpcServer";
import { setTimeout } from "timers/promises";

// server side data fetch for testing
const dataf = async () => {
  const res = await setTimeout(1000, async () => {
    const data = await apiServer.example.hello({ text: "From Server" });
    return data;
  });

  return res;
};

export default async function Home() {
  const data = await dataf();
  const dat = (await data()).greeting;

  return (
    <div className="h-screen">
      <div className="text-center pt-3 text-4xl text-emerald-500 font-extrabold">cloud care</div>
      <div className="absolute top-1/2 bottom-1/2 w-full text-center  text-lg font-semibold ">
        <div>{dat}</div>
        <Testclient />
      </div>
    </div>
  );
}
