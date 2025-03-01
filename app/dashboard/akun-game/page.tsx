import type { Metadata } from "next";
import { FC } from "react";

import { DashboardLayout } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Akun Game - Erika Store",
  description: "Manage games in your store",
};

const Page: FC = () => {
  return (
    <DashboardLayout name="Akun Game">
      <h1>wip</h1>
    </DashboardLayout>
  );
};

export default Page;
