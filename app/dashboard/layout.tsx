import { FC, PropsWithChildren } from "react";

import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

import { SidebarProvider } from "@/providers/sidebar-provider";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <div>
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Page;
