"use client";

/* 

  this layout for the dashboard pages (pages that require authentication) 
  place here the navbar, appshell, footer, etc. that are common to all dashboard pages

*/

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
