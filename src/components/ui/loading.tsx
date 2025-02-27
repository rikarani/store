"use client";

import { FC } from "react";

import { Spinner } from "@heroui/spinner";

export const Loading: FC = () => {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <Spinner label="sabar ye" />
    </div>
  );
};
