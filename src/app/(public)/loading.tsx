import PageLoader from "@/components/PageLoader";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen">
      <PageLoader />
    </div>
  );
}
