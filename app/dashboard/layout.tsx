import { FC, PropsWithChildren } from "react";

import { Divider } from "@heroui/divider";

import { Sidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/providers/sidebar-provider";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-auto">
        <div className="hidden w-1/5 lg:block">
          <Sidebar />
        </div>
        <Divider orientation="vertical" />
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Page;
