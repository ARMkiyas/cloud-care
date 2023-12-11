"use client";

import React from "react";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import myImage from "./assets/logo-inline-vhw.png";
import logImage from "./assets/loginjpg.png";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Tpagepops = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function Page({ searchParams }: Tpagepops) {
  const session = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      // Validate the form data against the schema
      loginSchema.parse(formData);
      // If validation succeeds, you can perform further actions like API calls for authentication
      console.log("Form is valid:", formData);

      const login = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      if (!login.ok) {
        console.log("login failed");
        notifications.show({
          color: "red",
          title: "Login Failed",
          message:
            "Check your Username/Email or PassWord, if you entered correct, somthing may wrong please contact the administrator",
        });
      } else {
        searchParams.callbackUrl
          ? router.push(searchParams.callbackUrl)
          : router.push("/dashboard");
      }

      console.log(login);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setErrors(
          error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
          }, {}),
        );
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="bg-[#111827] h-screen w-screen pt:mt-0 mx-auto flex items-center justify-center
    lg:h-screen lg:w-screen m-auto "
      >
        <div>
          <div className="container mx-auto">
            <Image
              className="flex items-center w-1/2 h-10 mx-auto mb-8 xl:w-1/6 xl:h-20 xl:my-5 md:h-18 md:w-1/3 md:h-20 "
              src={myImage}
              alt="cloudcare"
            />
            <div
              className="bg-[#1F2937] mx-auto grid-cols-5 w-auto
      md:h-3/4 flex justify-center items-center
       sm:grid rounded-lg h-1/2 md:w-4/5 lg:h-3/4 xl:w-3/5"
            >
              <div className="h-full col-span-2">
                <Image
                  className="hidden w-full h-full rounded-t-lg sm:rounded-l-lg sm:block "
                  src={logImage}
                  alt="cloudcare"
                />
              </div>
              <div className="col-span-3 mx-8 my-3">
                <div className="text-white ms:text-[30px] ms:leading-[36px] py-5 font-bold text-[26px]">
                  Sign in to platform
                </div>
                <form onSubmit={handleSubmit} action="">
                  <div>
                    <div>
                      <div className="text-white">Your username/email</div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                    hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                        placeholder="john wick/name@company.com"
                      />
                      {/*errors.email && <span style={{ color: 'red' }}>{errors.email}</span>*/}
                    </div>
                    <div>
                      <div className="text-white">Your password</div>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="bg-[#374151] text-[#9CA3AF] p-3 my-5 w-full border-none rounded-md text-sm
                hover:bg-[#3f4b61] hover:text-white hover:text-[16px]"
                        placeholder="••••••••••••••••"
                      />
                      {/*errors.password && <span style={{ color: 'red' }}>{errors.password}</span>*/}
                    </div>
                  </div>
                  <div className="grid justify-items-stretch ... ">
                    <div className="flex flex-wrap">
                      <input
                        type="checkbox"
                        className="box-content w-4 h-4 mr-2 "
                      />
                      <div className="leading-3 text-white ">Remember me</div>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[#16A34A] justify-self-start md:justify-self-end"
                    >
                      Lost Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-green-600 hover:bg-green-500 hover:text-[17px] 
            text-[16px] text-center leading-[26px] my-8 py-2 w-full border border-slate-500 rounded-md text-sm   shadow-black/50 shadow-inner ..."
                  >
                    Login to your account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
