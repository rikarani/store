"use client";

import { FC, useContext } from "react";

import { Button } from "@nextui-org/button";
import { SidebarContext } from "@/providers/sidebar-provider";
import { Icon } from "@iconify-icon/react";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

export const Navbar: FC = () => {
  const { onOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  const path = pathname.split("/").filter((p) => p !== "");

  return (
    <div className="mx-auto flex h-16 max-w-screen-lg items-center gap-4 px-6">
      <Button isIconOnly variant="ghost" onPress={onOpen}>
        <Icon icon="lucide:sidebar" className="text-base" />
      </Button>
      <Breadcrumbs>
        {path.map((p) => (
          <BreadcrumbItem key={p} href={`/${p}`}>
            {p}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
