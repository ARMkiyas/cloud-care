import "server-only";
import { getServerAuthSession } from "@server/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  console.log(session);

  if (session) {
    return redirect("/dashboard");
  }

  return <div>{children}</div>;
};

export default layout;
