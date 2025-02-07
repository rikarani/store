"use client";

import { FC, PropsWithChildren, createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const SidebarContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
});

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const onOpen = () => setIsOpen(true);
  const onOpenChange = () => setIsOpen((prev) => !prev);

  return <SidebarContext.Provider value={{ isOpen, onOpen, onOpenChange }}>{children}</SidebarContext.Provider>;
};
