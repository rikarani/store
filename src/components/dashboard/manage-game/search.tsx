"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify-icon/react";
import { Button } from "@heroui/button";
import { Input, InputProps } from "@heroui/input";

import Link from "next/link";

type Props = Pick<InputProps, "value" | "onValueChange" | "onClear">;

export const Search: FC<Props> = ({ value, onValueChange, onClear }) => {
  const pathname = usePathname();

  return (
    <div className="w-full items-center justify-between gap-3 space-y-4 lg:flex lg:space-y-0">
      <Input
        isClearable
        startContent={<Icon icon="lucide:search" className="text-base" />}
        placeholder="cari game..."
        value={value}
        onValueChange={onValueChange}
        onClear={onClear}
      />
      {pathname === "/dashboard/admin/manage-game" && (
        <Button
          as={Link}
          className="w-full lg:w-auto"
          href="/dashboard/admin/manage-game/tambah-game"
          startContent={<Icon icon="lucide:plus" className="text-base" />}
          color="primary"
        >
          Tambah Game
        </Button>
      )}
    </div>
  );
};
