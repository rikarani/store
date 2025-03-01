import { FC, PropsWithChildren } from "react";

import { Navbar } from "@/components/dashboard/navbar";

import { Divider } from "@heroui/divider";

type Props = {
  name: string;
};

export const DashboardLayout: FC<PropsWithChildren<Props>> = ({ name, children }) => {
  return (
    <>
      <Navbar header={name} />
      <Divider />
      <main className="px-4 py-4">{children}</main>
    </>
  );
};
