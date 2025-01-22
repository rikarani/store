"use client";

import { FC, PropsWithChildren, createContext } from "react";
import { useDisclosure } from "@heroui/react";

type Context = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export const SidebarContext = createContext<Context>({
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
});

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return <SidebarContext.Provider value={{ isOpen, onOpen, onOpenChange }}>{children}</SidebarContext.Provider>;
};
