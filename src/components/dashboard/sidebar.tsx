"use client";

import { FC, useContext } from "react";

import { useResponsive } from "@/hooks/useResponsive";
import { SidebarContext } from "@/providers/sidebar-provider";

import { Divider } from "@heroui/divider";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/drawer";

import { SideMenuBrand, SideMenuUser, SideMenuNav } from "@/components/ui/side-menu";

export const Sidebar: FC = () => {
  const large = useResponsive("(min-width: 1024px)");
  const { isOpen, onOpenChange } = useContext(SidebarContext);

  return large ? (
    <aside>
      <SideMenuBrand />
      <Divider />
      <SideMenuUser />
      <SideMenuNav />
    </aside>
  ) : (
    <Drawer isOpen={isOpen} radius="none" hideCloseButton placement="left" size="xs" onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="p-0">
          <SideMenuBrand />
        </DrawerHeader>
        <Divider />
        <DrawerBody className="gap-0 p-0">
          <SideMenuUser />
          <SideMenuNav />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
