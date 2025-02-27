"use client";

import { FC } from "react";

import { Spinner } from "@heroui/spinner";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export const Redirector: FC = () => {
  return (
    <div className="grid size-full place-items-center">
      <Spinner size="lg" />
      <AuthenticateWithRedirectCallback />
    </div>
  );
};
