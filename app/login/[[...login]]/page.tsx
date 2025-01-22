import { FC } from "react";
import type { Metadata } from "next";

import { Spinner } from "@heroui/spinner";
import { Login } from "@/components/auth/login";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import Image from "next/image";
import mika from "~/images/mika.webp";

export const metadata: Metadata = {
  title: "Login - Erika Store",
  description: "Login to your account to continue shopping",
};

const Page: FC = () => {
  return (
    <div className="flex h-dvh flex-col lg:flex-row">
      <ClerkLoading>
        <div className="grid size-full place-items-center">
          <Spinner size="lg" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div className="h-36 w-full lg:h-full lg:w-2/5">
          <Image src={mika} priority alt="Login Image" className="size-full object-cover object-right" />
        </div>
        <div className="flex-1">
          <div className="size-full">
            <Login />
          </div>
        </div>
      </ClerkLoaded>
    </div>
  );
};

export default Page;
