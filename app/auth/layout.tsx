import { FC, PropsWithChildren } from "react";

import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import { Spinner } from "@heroui/spinner";

import Image from "next/image";
import sparkle from "~/images/sparkle.webp";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-dvh flex-col lg:flex-row">
      <ClerkLoading>
        <div className="grid size-full place-items-center">
          <Spinner size="lg" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div className="h-36 w-full lg:h-full lg:w-2/5">
          <Image src={sparkle} priority alt="Login Image" className="size-full object-cover object-center" />
        </div>
        <div className="flex-1">
          <div className="size-full">
            <div className="h-full lg:grid lg:place-items-center">{children}</div>
          </div>
        </div>
      </ClerkLoaded>
    </div>
  );
};

export default Page;
