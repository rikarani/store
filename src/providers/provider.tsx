"use client";

import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ToastProvider toastProps={{ timeout: 4000, shouldShowTimeoutProgess: true }} />
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
};
