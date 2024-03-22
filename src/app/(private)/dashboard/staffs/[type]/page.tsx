import { notFound } from "next/navigation";
import React from "react";

const stafftypes = ["all-staff", "doctors", "nurses", "admins"] as const;

type propsType = {
  params: {
    type: (typeof stafftypes)[number];
  };
};

export default function Page({ params }: propsType) {
  if (!stafftypes.includes(params.type)) {
    notFound();
  }

  return <div>{params.type} staff page</div>;
}
