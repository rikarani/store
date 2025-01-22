"use client";

import { FC, useContext } from "react";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify-icon/react";
import { SidebarContext } from "@/providers/sidebar-provider";

import { Button } from "@nextui-org/button";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

function normalizePathname(pathname: string) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return pathname
    .split("-")
    .map((path) => capitalize(path))
    .join(" ");
}

export const Navbar: FC = () => {
  const { onOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  const path = pathname.split("/").filter((path) => path !== "");

  return (
    <div className="mx-auto flex h-16 max-w-screen-lg items-center gap-4 px-6">
      <Button isIconOnly variant="ghost" onPress={onOpen}>
        <Icon icon="lucide:sidebar" className="text-base" />
      </Button>
      <Breadcrumbs maxItems={1} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
        {path.map((item) => (
          <BreadcrumbItem key={item}>{normalizePathname(item)}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
