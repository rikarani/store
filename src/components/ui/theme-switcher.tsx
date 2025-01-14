"use client";

import { FC, useState, useEffect } from "react";

import { useTheme } from "next-themes";
import { Icon } from "@iconify-icon/react";

import { Switch } from "@nextui-org/switch";
import { Skeleton } from "@nextui-org/skeleton";

export const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Switch
      size="sm"
      color="default"
      thumbIcon={theme === "light" ? <Icon icon="lucide:sun" /> : <Icon icon="solar:moon-bold" />}
      isSelected={theme === "dark"}
      onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  ) : (
    <Skeleton className="rounded-full">
      <div className="h-6 w-10 rounded-full" />
    </Skeleton>
  );
};
