"use client";

import { FC, useContext } from "react";

import { Icon } from "@iconify-icon/react";
import { SidebarContext } from "@/providers/sidebar-provider";

import { Button } from "@heroui/button";

type Props = {
  header: string;
};

export const Navbar: FC<Props> = ({ header }) => {
  const { onOpen } = useContext(SidebarContext);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-white/60 px-4 backdrop-blur dark:bg-black/60">
      <div className="block lg:hidden">
        <Button isIconOnly variant="ghost" onPress={onOpen}>
          <Icon icon="lucide:sidebar" className="text-base" />
        </Button>
      </div>
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="text-xl font-semibold">{header}</span>
        </div>
      </div>
    </header>
  );
};
