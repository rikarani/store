import { FC } from "react";
import type { Metadata } from "next";

import { Spinner } from "@heroui/spinner";
import { Register } from "@/components/auth/register";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import Image from "next/image";
import kanata from "~/images/kanata.webp";

export const metadata: Metadata = {
  title: "Daftar Akun Baru - Erika Store",
  description: "Daftar Akun Baru",
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
          <Image src={kanata} priority alt="Login Image" className="size-full object-cover object-center" />
        </div>
        <div className="flex-1">
          <div className="size-full">
            <Register />
          </div>
        </div>
      </ClerkLoaded>
    </div>
  );
};

export default Page;
