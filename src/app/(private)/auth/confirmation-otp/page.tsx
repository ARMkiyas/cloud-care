"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import btnIcon from "./assets/svg-margin.png";
import myImage from "./assets/logo-inline.png";
import userImage from "./assets/bonnie-greenpng.png";
import { z } from "zod";
import { signIn, signOut, useSession } from "next-auth/react";
import PageLoader from "@/components/PageLoader";
import { useRouter } from "next/navigation";
import { Anchor, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useApiClient } from "@/utils/trpc/Trpc";

// Define the schema for OTP validation using Zod
const OTPSchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .min(6, "OTP must be at least 6 characters"),
});

const Page = () => {
  const session = useSession();
  const router = useRouter();

  console.log(session);

  const [otpValue, setOTPValue] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const requst_2fa = useApiClient.request2faotp.request.useMutation({
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });
  const handleOTPVerification = async (e) => {
    e.preventDefault();

    // Validate the OTP
    const otpver = await signIn("2fa", { token: otpValue, redirect: false });
    console.log(otpver);

    if (otpver === undefined || !otpver.ok) {
      notifications.show({
        title: "Error",
        message: "Invalid OTP",
        color: "red",
      });
      return;
    }

    router.refresh();
  };

  if (session.status === "loading") return <PageLoader />;

  async function signouthandler(e) {
    e.preventDefault();

    await signOut({
      redirect: false,
    });
    router.push("/");
  }

  async function resendopt(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault();

    if (session.data?.user === undefined) return;

    const res = await requst_2fa.mutateAsync();

    if (!res.ok) {
      notifications.show({
        title: "Error",
        message: res.message,
        color: "red",
      });
    }

    notifications.show({
      title: "OTP sent",
      message: res.message,
      color: "green",
    });

    console.log(res);
  }

  return (
    <div className="flex flex-col">
      <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
        <div></div>
        <div className="mt-5">
          <Image
            className="flex items-center w-1/2 h-12 mx-auto mb-8 xl:w-1/3 xl:h-20 xl:my-5 md:h-18 md:w-1/3 md:h-20 "
            src={myImage}
            alt="Cloudcare"
          />
          <div className="bg-[#1F2937] w-4/5  container mx-auto rounded-lg  flex justify-center items-center">
            <div className="mx-8 my-3">
              <div>
                <div className="flex items-center justify-start">
                  <div className="flex-none w-auto h-auto">
                    <Image
                      className="rounded-full h-[42px] w-[41px] mr-2"
                      src={userImage}
                      alt="user"
                    />
                  </div>
                  <div className="text-white xl:text-[30px] xl:leading-[36px] font-[700] text-[22px]">
                    {session?.data?.user?.name}
                  </div>
                </div>
                <div>
                  <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
                    We have sent 2FA OTP to your Email Address and phone, Please
                    enter it to unlock
                  </div>
                </div>
              </div>
              <form onSubmit={handleOTPVerification}>
                <div>
                  <div className="text-white text-[14px] leading-[20px] font-[500] pt-4 2xl:text-[23px]">
                    OTP
                  </div>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOTPValue(e.target.value)}
                    className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none
               rounded-md text-sm hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                    placeholder="••••••••"
                  />
                  {verificationError && <span>{verificationError}</span>}
                </div>
                <div className="text-[#9CA3AF] text-[16px] leading-[24px] font-[400] mx-1 ">
                  Didn&apos;t receive code?
                  <Anchor
                    href="#"
                    className="ml-1 text-white"
                    onClick={resendopt}
                  >
                    Resend OTP
                  </Anchor>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Anchor
                    href="/"
                    underline="hover"
                    component={Link}
                    onClick={signouthandler}
                  >
                    signout
                  </Anchor>
                  <button
                    className="flex xl:w-auto text-white  bg-green-600 hover:bg-green-500  hover:text-[17px] hover:w-auto px-4
              text-[16px] text-center leading-[26px] my-8 py-2 border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ...
              w-auto "
                  >
                    <Image
                      className="w-[16px] h-[16px] hover:w-[18px] hover:h-[18px] my-1 mr-1"
                      src={btnIcon}
                      alt="unlock"
                    />
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
