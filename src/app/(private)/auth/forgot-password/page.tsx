"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import myImage from "./assets/logo-inline-qRb.png";
import { date, z } from "zod";
import { Button, Input, SegmentedControl } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { phoneRegex } from "@/utils/ValidationSchemas/commonSc";
import { useForm, zodResolver } from "@mantine/form";
import { useApiClient } from "@/utils/trpc/Trpc";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

//

// Define the schema for form validation using Zod
const forgotPasswordPhoneSchema = z.object({
  phone: z
    .string()
    .min(12, "Please Provide valid Phone Number")
    .max(14, "Please Provide valid Phone Number")
    .regex(phoneRegex, "Invalid phone Number"),
});

const forgotPasswordEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const Page = () => {
  const [showEmail, setShowEmail] = useState(true);

  const router = useRouter();

  const { mutateAsync, isLoading, error, isError, isSuccess } =
    useApiClient.pwdreset.requestPWDReset.useMutation();

  const handleChange = () => {
    setShowEmail((prevShowEmail) => !prevShowEmail);
  };

  const form = useForm({
    initialValues: {
      email: "",
      phone: "",
    },
    validate: zodResolver(
      showEmail ? forgotPasswordEmailSchema : forgotPasswordPhoneSchema,
    ),
  });

  type formsubmithandlerT = {
    requsetmode: "email" | "phone";
    email?: string;
    phone?: string;
  };

  /// Define the form submit handler
  const formsubmithandler = async (
    values: formsubmithandlerT,
  ): Promise<void> => {
    try {
      const data = await mutateAsync({
        ...values,
      });

      if (isSuccess || data) {
        console.log(data);
        notifications.show({
          autoClose: 5000,
          onClose: () => {
            router.push("/auth/login");
          },
          title: "password reset Instructions Sent",
          message: `if your account avilable, you will receive an Instructions, Please check your ${
            showEmail ? "Email" : "phone"
          } for the password reset Instructions`,
          color: "green",
        });
      }
    } catch (e) {}
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#111827] h-screen w-screen  mx-auto flex items-center justify-center">
        <div className="mt-5">
          <Image
            className="flex items-center w-1/2 h-12 mx-auto mb-8 xl:w-1/3 xl:h-20 xl:my-5 md:h-18 md:w-1/3 md:h-20 "
            src={myImage}
            alt="Cloudcare"
          />{" "}
          <div className="bg-[#1F2937] w-5/6 container mx-auto rounded-lg flex justify-center items-center py-3">
            <div className="mx-8 my-3">
              <SegmentedControl
                color="dark"
                data={["Email", "Phone"]}
                classNames={{
                  root: "bg-slate-700 text-white  ",
                  label: "text-gray-400 data-[active]:text-white",
                  control: "text-white",
                }}
                className="flex "
                defaultValue="Email"
                onChange={handleChange}
              />
              <div>
                <div className="text-white xl:text-[30px] xl:leading-[36px] xl:py-2 font-[700] text-[22px]">
                  Forgot your password?
                </div>
                <div className="text-[#9CA3AF] text-[14px] lg:text-[16px] leading-[24px] font-[400]">
                  Don&#39;t fret! Just type in your email and we will send you a
                  link to reset your password!
                </div>
              </div>
              <form
                onSubmit={form.onSubmit(
                  (values: { email: string; phone: string }) => {
                    return formsubmithandler({
                      requsetmode: showEmail ? "email" : "phone",
                      ...(showEmail
                        ? { email: values.email }
                        : { phone: values.phone }),
                    });
                  },
                )}
              >
                <div>
                  {showEmail ? (
                    <div>
                      <Input.Wrapper
                        label="Your Email"
                        description="Please provide your valid email"
                        classNames={{
                          label: "text-white text-xl",
                        }}
                        className="mt-2"
                        {...form.getInputProps("email")}
                      >
                        <Input
                          placeholder="abc@example.com"
                          mt="md"
                          size="md"
                          classNames={{
                            input:
                              "bg-slate-700 text-white p-3 py-2 w-full border-none b focus:border-solid rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                          }}
                          {...form.getInputProps("email")}
                        />
                      </Input.Wrapper>
                    </div>
                  ) : (
                    <div>
                      <Input.Wrapper
                        label="Your Phone"
                        description="Please provide your valid PhoneNumber"
                        classNames={{
                          label: "text-white text-xl",
                        }}
                        className="mt-2"
                        {...form.getInputProps("phone")}
                      >
                        <Input
                          {...form.getInputProps("phone")}
                          placeholder="+94123456789"
                          mt="md"
                          size="md"
                          classNames={{
                            input:
                              "bg-slate-700 text-white p-3 py-2 w-full border-none b focus:border-solid rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700  hover:text-white ",
                          }}
                        />
                      </Input.Wrapper>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    type="submit"
                    color="green"
                    loading={isLoading}
                    loaderProps={{ type: "dots" }}
                  >
                    Request Password Reset
                  </Button>
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
