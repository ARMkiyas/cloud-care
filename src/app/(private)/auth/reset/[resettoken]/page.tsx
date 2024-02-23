"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import myImage from "../../forgot-password/assets/logo-inline-qRb.png";
import { z } from "zod";
import { Button, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

// Define the schema for password validation using Zod
const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

interface paramsT {
  params: { resettoken: string };
}

export default function page({ params }: paramsT) {
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validate: zodResolver(passwordSchema),
  });

  const resethandler = async (values: z.infer<typeof passwordSchema>) => {
    console.log({
      ...values,
      ResetToken: params.resettoken,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
        <div className="w-2/6 mt-5">
          <Image
            className="flex items-center w-1/2 h-12 mx-auto mb-8 xl:my-5 md:h-18 md:w-1/2 md:h-20 "
            src={myImage}
            alt="Cloudcare"
          />
          <div className="bg-[#1F2937]   container mx-auto rounded-lg  flex justify-center items-center  ">
            <div className="w-full px-5 py-7">
              <div>
                <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px] xl:pr-20 \">
                  Change Password
                </div>
              </div>
              <form
                className="w-full"
                onSubmit={form.onSubmit((values) => {
                  resethandler(values);
                })}
              >
                <PasswordInput
                  label="New password"
                  placeholder="New password"
                  mt="md"
                  size="md"
                  classNames={{
                    input:
                      "bg-slate-700 text-white p-3 py-2 w-full border-none b focus:border-solid rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                    label: "text-white",
                    root: "space-y-2",
                  }}
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  label="confirm password"
                  placeholder="confirm password"
                  mt="lg"
                  size="md"
                  classNames={{
                    input:
                      "bg-slate-700 text-white p-3 py-2 w-full border-none b focus:border-solid rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                    label: "text-white",
                    root: "space-y-2",
                  }}
                  {...form.getInputProps("confirmPassword")}
                />

                <div className="flex justify-end">
                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    type="submit"
                    color="green"
                    loaderProps={{ type: "dots" }}
                  >
                    Login to your account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
