import Image from "next/image";


export function Logo(props: React.ComponentPropsWithoutRef<typeof Image>) {
    return (
      <Image {...props}  src="http://localhost:3000/logo.png" alt="Mantine logo"  />
    );
  }