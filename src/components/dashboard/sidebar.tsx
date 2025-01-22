"use client";

import { FC, useContext } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/drawer";

import { Button } from "@heroui/button";
import { SidebarContext } from "@/providers/sidebar-provider";
import { User } from "@heroui/user";
import { Accordion, AccordionItem } from "@heroui/accordion";

import Link from "next/link";

export const Sidebar: FC = () => {
  const { isOpen, onOpenChange } = useContext(SidebarContext);

  return (
    <Drawer isOpen={isOpen} radius="none" hideCloseButton placement="left" size="xs" onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <User
            className="justify-start"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />
        </DrawerHeader>
        <DrawerBody>
          <Accordion isCompact showDivider={false} defaultExpandedKeys={["general"]}>
            <AccordionItem key="general" aria-label="General" title="General">
              <Button as={Link} href="/dashboard/riwayat-transaksi" variant="ghost" className="w-full">
                Riwayat Transaksi
              </Button>
              <Button as={Link} href="/dashboard/akun-game" variant="ghost" className="w-full">
                Manage Akun Game
              </Button>
              <Button as={Link} href="/dashboard/profile" variant="ghost" className="w-full">
                Edit Profile
              </Button>
            </AccordionItem>
            <AccordionItem key="admin" aria-label="Admin" title="Admin">
              <Button as={Link} href="/dashboard/admin/manage-member" variant="ghost" className="w-full">
                Manage Member
              </Button>
              <Button as={Link} href="/dashboard/admin/manage-game" variant="ghost" className="w-full">
                Manage Game
              </Button>
            </AccordionItem>
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
