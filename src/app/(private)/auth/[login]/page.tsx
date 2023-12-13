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
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Username/Email field is required",
    })
    .min(1, "Username/Email field is required"),
  password: z
    .string({
      required_error: "Password field is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

type Tpagepops = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function Page({ searchParams }: Tpagepops) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);
    const formData = {
      email,
      password,
    };

    try {
      // Validate the form data against the schema

      const isvalid = loginSchema.safeParse(formData);
      // If validation succeeds, you can perform further actions like API calls for authentication

      if (isvalid.success === false) {
        const errormessage = isvalid.error.errors.map((err) => err.message);

        notifications.show({
          color: "red",
          title: "Login Failed",
          message: errormessage,
        });
        setloading(false);
        return;
      }

      const login = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      console.log("dsg");

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
      setloading(false);
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Login Failed",
        message: "Somthen went wrong, please contact the administrator",
      });
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
                              sm:grid rounded-lg h-1/4 md:w-4/5 lg:h-3/4 xl:w-8/12"
            >
              <div className="h-full col-span-2">
                <Image
                  className="hidden w-full h-full rounded-t-lg sm:rounded-l-lg sm:block "
                  src={logImage}
                  alt="cloudcare"
                />
              </div>
              <div className="col-span-3 mx-8 my-11 ">
                <div className="text-white ms:text-[30px] ms:leading-[36px] mb-5 font-bold text-[26px]">
                  Sign in to platform
                </div>
                <form onSubmit={handleSubmit} action="">
                  <div>
                    <div>
                      <TextInput
                        value={email}
                        label="Your username/email"
                        placeholder="example@gmail.com"
                        size="md"
                        classNames={{
                          input:
                            "bg-slate-700 text-white p-3 py-2 w-full border-none   rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                          label: "text-white",
                          root: "mb-5 space-y-2",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {/*errors.email && <span style={{ color: 'red' }}>{errors.email}</span>*/}
                    </div>
                    <div>
                      <PasswordInput
                        label="Your password"
                        placeholder="Your password"
                        mt="md"
                        size="md"
                        classNames={{
                          input:
                            "bg-slate-700 text-white p-3 py-2 w-full border-none b focus:border-solid rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                          label: "text-white",
                          root: "space-y-2",
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {/*errors.password && <span style={{ color: 'red' }}>{errors.password}</span>*/}
                    </div>
                  </div>
                  <div className="grid justify-items-stretch ">
                    <Checkbox
                      label="Remember me"
                      mt="xl"
                      size="md"
                      classNames={{
                        input:
                          "bg-slate-700 text-white p-3 py-2 w-full border-none  focus:border-gray-400 rounded-md  hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                        label: "text-white text-sm",
                      }}
                      checked={true}
                    />
                    <Link
                      href="/auth/forgot-password"
                      className="text-[#16A34A] justify-self-start md:justify-self-end "
                    >
                      Lost Password?
                    </Link>
                  </div>
                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    type="submit"
                    color="green"
                    loading={loading}
                    loaderProps={{ type: "dots" }}
                  >
                    Login to your account
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
