import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<typeof Image>) {
  return <Image {...props} src="/logo.png" alt="Mantine logo" />;
}
