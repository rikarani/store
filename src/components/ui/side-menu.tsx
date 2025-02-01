"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify-icon/react";

import { User } from "@heroui/user";
import { Button } from "@heroui/button";

import { Brand } from "@/icons";
import { ThemeSwitcher } from "./theme-switcher";

import Link from "next/link";

type Navigation = {
  href: string;
  label: string;
  icon: string;
};

const SideMenuBrand: FC = () => {
  return (
    <div className="flex w-full justify-between p-4">
      <div className="flex items-center gap-4">
        <Brand />
        <span>Erika Store</span>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

const SideMenuUser: FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <User
        avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
        description="email/username"
        name="fullname yg login"
      />
      <Button isIconOnly variant="ghost" size="sm">
        <Icon icon="lucide:log-out" className="text-sm" />
      </Button>
    </div>
  );
};

const SideMenuNav: FC = () => {
  const pathname = usePathname();

  const generalNavigation: Navigation[] = [
    {
      href: "/dashboard/akun-game",
      label: "Akun Game",
      icon: "lucide:gamepad-2",
    },
    {
      href: "/dashboard/riwayat-transaksi",
      label: "Riwayat Transaksi",
      icon: "lucide:receipt-text",
    },
    {
      href: "/dashboard/profile",
      label: "Pengaturan Akun",
      icon: "lucide:circle-user",
    },
  ];

  const adminNavigation: Navigation[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "lucide:layout-dashboard",
    },
    {
      href: "/dashboard/admin/manage-game",
      label: "Manage Game",
      icon: "lucide:gamepad-2",
    },
    {
      href: "/dashboard/admin/manage-member",
      label: "Manage Member",
      icon: "lucide:users",
    },
  ];

  return (
    <div className="space-y-2 px-4">
      <div>
        <span className="text-tiny text-foreground-500">General</span>
        <ul className="first-of-type:mt-1">
          {generalNavigation.map((nav) => (
            <li key={nav.label}>
              <Button
                as={Link}
                href={nav.href}
                variant="ghost"
                className={`w-full justify-start border-0 ${pathname === nav.href ? "bg-default" : undefined}`}
                startContent={<Icon icon={nav.icon} className="text-base" />}
              >
                {nav.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="text-tiny text-foreground-500">Khusus Admin</span>
        <ul className="first-of-type:mt-1">
          {adminNavigation.map((nav) => (
            <li key={nav.label}>
              <Button
                as={Link}
                href={nav.href}
                variant="ghost"
                className={`w-full justify-start border-0 ${pathname === nav.href ? "bg-default" : undefined}`}
                startContent={<Icon icon={nav.icon} className="text-base" />}
              >
                {nav.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { SideMenuBrand, SideMenuUser, SideMenuNav };
