import { Button, Divider, Overlay, Text } from "@mantine/core";
import React from "react";
import AnimatedCheck from "../icon/animatedCheck/AnimatedCheck";
import { IconCalendarClock, IconListSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";

type SuccessFullBookprops = {
  BookedDate: Date;
  BookedTime: Date;
  referenceId: string;
  reset?: () => void;
};

export default function SuccessFullBook({
  BookedDate,
  BookedTime,
  referenceId,
  reset,
}) {
  return (
    <Overlay
      backgroundOpacity={0}
      blur={7}
      classNames={{
        root: "z-50 p-0 m-0 h-full w-full overflow-auto flex flex-col items-center justify-center",
      }}
    >
      <AnimatedCheck />

      <Text
        size="lg"
        className="font-bold leading-10 text-blue-950 animate-fade animate-ease-in"
      >
        Your appointment has been booked successfully
      </Text>
      <Text
        size="sm"
        className="text-center animate-fade animate-ease-in animate-delay-[100ms] text-gray-700"
      >
        You will receive a confirmation email and SMS shortly with the
        appointment details
      </Text>
      <div className="flex w-full p-3 mt-2 justify-evenly animate-fade animate-ease-in animate-delay-[200ms]">
        <div className="flex space-x-3">
          <IconCalendarClock className="h-full text-emerald-600" size={32} />
          <div className="">
            <Text size="sm" className="text-slate-600">
              Date & Time
            </Text>
            <Text size="xs">
              {dayjs(BookedDate).format("YYYY-MM-DD")} |{" "}
              {dayjs(BookedTime).format("hh:mm A")}
            </Text>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="flex space-x-3">
          <IconListSearch className="h-full text-emerald-600" size={32} />
          <div>
            <Text size="sm" className="text-slate-600">
              Reference Id
            </Text>
            <Text size="xs">{referenceId}</Text>
          </div>
        </div>
      </div>

      <div className="mt-6 space-x-3">
        <Button
          variant="filled"
          color="teal"
          onClick={() => {
            reset();
          }}
        >
          Book Another Appointment
        </Button>
        <Button variant="outline" color="teal" component={Link} href="/">
          Back to Home
        </Button>
      </div>
    </Overlay>
  );
}
